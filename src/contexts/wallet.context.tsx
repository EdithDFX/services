import { Asset, Blockchain, Sell, Utils, useApiSession, useAuth, useSessionContext } from '@dfx.swiss/react';
import BigNumber from 'bignumber.js';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GetInfoResponse } from 'webln';
import { useStore } from '../hooks/store.hook';
import { useAlby } from '../hooks/wallets/alby.hook';
import { useBitbox } from '../hooks/wallets/bitbox.hook';
import { useLedger } from '../hooks/wallets/ledger.hook';
import { useMetaMask } from '../hooks/wallets/metamask.hook';
import { useTrezor } from '../hooks/wallets/trezor.hook';
import { AbortError } from '../util/abort-error';
import { delay, url } from '../util/utils';
import { useAppHandlingContext } from './app-handling.context';
import { AssetBalance, useBalanceContext } from './balance.context';

export enum WalletType {
  META_MASK = 'MetaMask',
  ALBY = 'Alby',
  LEDGER_BTC = 'LedgerBtc',
  LEDGER_ETH = 'LedgerEth',
  BITBOX_BTC = 'BitBoxBtc',
  BITBOX_ETH = 'BitBoxEth',
  TREZOR_BTC = 'TrezorBtc',
  TREZOR_ETH = 'TrezorEth',
}

interface WalletInterface {
  isInitialized: boolean;
  blockchain?: Blockchain;
  getInstalledWallets: () => Promise<WalletType[]>;
  login: (
    wallet: WalletType,
    onSignHint?: () => Promise<void>,
    onPairing?: (code: string) => Promise<void>,
    blockchain?: Blockchain,
    address?: string,
  ) => Promise<string | undefined>;
  switchBlockchain: (to: Blockchain) => Promise<void>;
  activeWallet: WalletType | undefined;
  getBalances: (assets: Asset[]) => Promise<AssetBalance[] | undefined>;
  sendTransaction: (sell: Sell) => Promise<string>;
}

const WalletContext = createContext<WalletInterface>(undefined as any);

export function useWalletContext(): WalletInterface {
  return useContext(WalletContext);
}

export function WalletContextProvider(props: PropsWithChildren): JSX.Element {
  const { isInitialized: isSessionInitialized, isLoggedIn, logout } = useSessionContext();
  const { updateSession } = useApiSession();
  const { session } = useApiSession();
  const metaMask = useMetaMask();
  const alby = useAlby();
  const ledger = useLedger();
  const bitBox = useBitbox();
  const trezor = useTrezor();
  const api = useSessionContext();
  const { isInitialized: isParamsInitialized, params: appParams } = useAppHandlingContext();
  const { getSignMessage } = useAuth();
  const { hasBalance, getBalances: getParamBalances } = useBalanceContext();
  const { activeWallet: activeWalletStore } = useStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [activeWallet, setActiveWallet] = useState<WalletType | undefined>(activeWalletStore.get());

  const [mmAddress, setMmAddress] = useState<string>();
  const [mmBlockchain, setMmBlockchain] = useState<Blockchain>();

  const [ledgerBlockchain, setLedgerBlockchain] = useState<Blockchain>();
  const [bitboxBlockchain, setBitboxBlockchain] = useState<Blockchain>();
  const [trezorBlockchain, setTrezorBlockchain] = useState<Blockchain>();

  // listen to MM account switches
  useEffect(() => {
    metaMask.register(setMmAddress, setMmBlockchain);
  }, []);

  useEffect(() => {
    // logout on MetaMask account switch
    if (activeWallet === WalletType.META_MASK && session?.address && mmAddress && session.address !== mmAddress) {
      api.logout();
    }
  }, [session?.address, mmAddress, activeWallet]);

  // initialize
  useEffect(() => {
    if (isSessionInitialized && !isLoggedIn) {
      setWallet();
    }
  }, [isSessionInitialized, isLoggedIn]);

  useEffect(() => {
    if (isParamsInitialized)
      handleParamSession().then((hasSession) => {
        hasSession && setWallet(appParams.type as WalletType);
        setIsInitialized(true);
      });
  }, [isParamsInitialized]);

  async function handleParamSession(): Promise<boolean> {
    try {
      if (appParams.address && appParams.signature) {
        await createSession(appParams.address, appParams.signature);
        return true;
      } else if (appParams.session && Utils.isJwt(appParams.session)) {
        updateSession(appParams.session);
        return true;
      }
    } catch (e) {
      logout();
    }

    return false;
  }

  function setWallet(walletType?: WalletType) {
    setActiveWallet(walletType);
    walletType ? activeWalletStore.set(walletType) : activeWalletStore.remove();
  }

  // public API
  async function login(
    wallet: WalletType,
    onSignHint?: () => Promise<void>,
    onPairing?: (code: string) => Promise<void>,
    blockchain?: Blockchain,
    usedAddress?: string,
  ): Promise<string> {
    const address = await connect(wallet, onPairing, blockchain, usedAddress);

    try {
      // show signature hint
      await onSignHint?.();

      // create session
      const message = await getSignMessage(address);
      const signature = await signMessage(wallet, message, address);
      await createSession(address, signature);
    } catch (e) {
      api.logout();
      setWallet();

      throw e;
    }

    blockchain && (await switchBlockchain(blockchain, wallet));

    return address;
  }

  async function connect(
    wallet: WalletType,
    onPairing?: (code: string) => Promise<void>,
    usedBlockchain?: Blockchain,
    usedAddress?: string,
  ): Promise<string> {
    const [address, blockchain] = await readData(wallet, onPairing, usedBlockchain, usedAddress);

    setWallet(wallet);

    switch (wallet) {
      case WalletType.META_MASK:
        setMmAddress(address);
        setMmBlockchain(blockchain);
        break;

      case WalletType.ALBY:
        break;

      case WalletType.LEDGER_BTC:
      case WalletType.LEDGER_ETH:
        setLedgerBlockchain(blockchain);
        break;

      case WalletType.BITBOX_BTC:
      case WalletType.BITBOX_ETH:
        setBitboxBlockchain(blockchain);
        break;

      case WalletType.TREZOR_BTC:
      case WalletType.TREZOR_ETH:
        setTrezorBlockchain(blockchain);
        break;
    }

    return address;
  }

  async function readData(
    wallet: WalletType,
    onPairing?: (code: string) => Promise<void>,
    blockchain?: Blockchain,
    address?: string,
  ): Promise<[string, Blockchain | undefined]> {
    switch (wallet) {
      case WalletType.META_MASK:
        address ??= await metaMask.requestAccount();
        if (!address) throw new Error('Permission denied or account not verified');

        blockchain = await metaMask.requestBlockchain();

        return [address, blockchain];

      case WalletType.ALBY:
        const account = await alby.enable();

        address ??= await getAlbyAddress(account);

        return [address, Blockchain.LIGHTNING];

      case WalletType.LEDGER_BTC:
      case WalletType.LEDGER_ETH:
        address ??= await ledger.connect(wallet);
        return [address, blockchain];

      case WalletType.BITBOX_BTC:
      case WalletType.BITBOX_ETH:
        if (!onPairing) throw new Error('Pairing callback not set');

        address ??= await bitBox.connect(wallet, onPairing);
        return [address, blockchain];

      case WalletType.TREZOR_BTC:
      case WalletType.TREZOR_ETH:
        address ??= await trezor.connect(wallet);
        return [address, blockchain];
    }
  }

  async function getAlbyAddress(account: GetInfoResponse): Promise<string> {
    if (account?.node?.pubkey) {
      // log in with pub key
      return `LNNID${account.node.pubkey.toUpperCase()}`;
    } else if (account?.node?.alias?.includes('getalby.com')) {
      // log in with Alby
      const win: Window = window;
      const redirectUrl = new URL(win.location.href);
      redirectUrl.searchParams.set('type', WalletType.ALBY);

      const params = new URLSearchParams({ redirectUri: redirectUrl.toString() });
      appParams.wallet && params.set('wallet', appParams.wallet);
      appParams.refcode && params.set('usedRef', appParams.refcode);

      win.location = url(`${process.env.REACT_APP_API_URL}/auth/alby`, params);

      await delay(5);
      throw new AbortError('Forwarded to Alby page');
    }

    throw new Error('No login method found');
  }

  async function signMessage(wallet: WalletType, message: string, address: string): Promise<string> {
    switch (wallet) {
      case WalletType.META_MASK:
        return metaMask.sign(address, message);

      case WalletType.ALBY:
        return alby.signMessage(message);

      case WalletType.LEDGER_BTC:
      case WalletType.LEDGER_ETH:
        return await ledger.signMessage(message, wallet);

      case WalletType.BITBOX_BTC:
      case WalletType.BITBOX_ETH:
        return await bitBox.signMessage(message, wallet);

      case WalletType.TREZOR_BTC:
      case WalletType.TREZOR_ETH:
        return await trezor.signMessage(message, wallet);

      default:
        throw new Error('No wallet active');
    }
  }

  async function getInstalledWallets(): Promise<WalletType[]> {
    const wallets: WalletType[] = [];

    if (metaMask.isInstalled()) wallets.push(WalletType.META_MASK);
    if (alby.isInstalled()) wallets.push(WalletType.ALBY);
    if (await ledger.isSupported()) wallets.push(WalletType.LEDGER_BTC, WalletType.LEDGER_ETH);
    if (await bitBox.isSupported()) wallets.push(WalletType.BITBOX_BTC, WalletType.BITBOX_ETH);
    if (trezor.isSupported()) wallets.push(WalletType.TREZOR_BTC, WalletType.TREZOR_ETH);

    return wallets;
  }

  async function createSession(address: string, signature: string): Promise<string> {
    const session =
      (await api.login(address, signature)) ??
      (await api.signUp(address, signature, appParams.wallet, appParams.refcode));
    if (!session) throw new Error('Failed to create session');

    return session;
  }

  async function getBalances(assets: Asset[]): Promise<AssetBalance[] | undefined> {
    switch (activeWallet) {
      case WalletType.META_MASK:
        return (await Promise.all(assets.map((asset: Asset) => metaMask.readBalance(asset, mmAddress)))).filter(
          (b) => b.amount > 0,
        );

      case WalletType.ALBY:
        // no balance available
        return undefined;

      case WalletType.LEDGER_BTC:
      case WalletType.LEDGER_ETH:
      case WalletType.BITBOX_BTC:
      case WalletType.BITBOX_ETH:
        // no balance available
        return undefined;

      case WalletType.TREZOR_BTC:
      case WalletType.TREZOR_ETH:
        // no balance available
        return undefined;

      default:
        return getParamBalances(assets);
    }
  }

  function getBlockchain(wallet?: WalletType): Blockchain | undefined {
    switch (wallet ?? activeWallet) {
      case WalletType.META_MASK:
        return mmBlockchain;

      case WalletType.ALBY:
        return Blockchain.LIGHTNING;

      case WalletType.LEDGER_BTC:
      case WalletType.LEDGER_ETH:
        return ledgerBlockchain;

      case WalletType.BITBOX_BTC:
      case WalletType.BITBOX_ETH:
        return bitboxBlockchain;

      case WalletType.TREZOR_BTC:
      case WalletType.TREZOR_ETH:
        return trezorBlockchain;

      default:
        return undefined;
    }
  }

  async function switchBlockchain(to: Blockchain, wallet?: WalletType): Promise<void> {
    switch (wallet ?? activeWallet) {
      case WalletType.META_MASK:
        return metaMask.requestChangeToBlockchain(to);

      case WalletType.LEDGER_BTC:
      case WalletType.LEDGER_ETH:
        setLedgerBlockchain(to);
        break;

      case WalletType.BITBOX_BTC:
      case WalletType.BITBOX_ETH:
        setBitboxBlockchain(to);
        break;

      case WalletType.TREZOR_BTC:
      case WalletType.TREZOR_ETH:
        setTrezorBlockchain(to);
        break;
    }
  }

  async function sendTransaction(sell: Sell): Promise<string> {
    switch (activeWallet) {
      case WalletType.META_MASK:
        if (!mmAddress) throw new Error('Address is not defined');

        return metaMask.createTransaction(new BigNumber(sell.amount), sell.asset, mmAddress, sell.depositAddress);

      case WalletType.ALBY:
        if (!sell.paymentRequest) throw new Error('Payment request not defined');

        return alby.sendPayment(sell.paymentRequest).then((p) => p.preimage);

      case WalletType.LEDGER_BTC:
      case WalletType.LEDGER_ETH:
      case WalletType.BITBOX_BTC:
      case WalletType.BITBOX_ETH:
      case WalletType.TREZOR_BTC:
      case WalletType.TREZOR_ETH:
        throw new Error('Not supported yet');

      default:
        throw new Error('No wallet connected');
    }
  }

  const context: WalletInterface = useMemo(
    () => ({
      isInitialized: isInitialized && isSessionInitialized && isParamsInitialized,
      blockchain: getBlockchain(),
      getInstalledWallets,
      login,
      switchBlockchain,
      activeWallet,
      getBalances,
      sendTransaction,
    }),
    [
      isInitialized,
      isSessionInitialized,
      isParamsInitialized,
      activeWallet,
      mmAddress,
      mmBlockchain,
      metaMask,
      alby,
      ledger,
      trezor,
      api,
      hasBalance,
      getParamBalances,
      appParams,
    ],
  );

  return <WalletContext.Provider value={context}>{props.children}</WalletContext.Provider>;
}
