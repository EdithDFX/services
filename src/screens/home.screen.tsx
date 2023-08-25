import { Blockchain, useSessionContext, useUserContext } from '@dfx.swiss/react';
import {
  DfxIcon,
  IconVariant,
  SpinnerSize,
  StyledButton,
  StyledButtonColor,
  StyledButtonWidth,
  StyledCheckboxRow,
  StyledLink,
  StyledLoadingSpinner,
  StyledVerticalStack,
} from '@dfx.swiss/react-components';
import { useState } from 'react';
import { Trans } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/layout';
import { useAppHandlingContext } from '../contexts/app-handling.context';
import { useParamContext } from '../contexts/param.context';
import { useSettingsContext } from '../contexts/settings.context';
import { WalletType, useWalletContext } from '../contexts/wallet.context';
import { useDeferredPromise } from '../hooks/deferred-promise.hook';
import { Tile, useFeatureTree } from '../hooks/feature-tree.hook';
import { useNavigation } from '../hooks/navigation.hook';
import { useStore } from '../hooks/store.hook';
import { AbortError } from '../util/abort-error';
import { Stack } from '../util/stack';

export function HomeScreen(): JSX.Element {
  const { translate } = useSettingsContext();
  const { isProcessing, logout } = useSessionContext();
  const { isUserLoading } = useUserContext();
  const { isEmbedded } = useAppHandlingContext();
  const { getInstalledWallets, login, switchBlockchain, activeWallet } = useWalletContext();
  const { defer, deferRef } = useDeferredPromise<void>();
  const { showsSignatureInfo } = useStore();
  const { navigate } = useNavigation();
  const { search } = useLocation();
  const { getTiles, setOptions } = useFeatureTree();
  const { blockchain: paramBlockchain } = useParamContext();

  const [isConnectingTo, setIsConnectingTo] = useState<WalletType>();
  const [connectError, setConnectError] = useState<string>();
  const [showInstallHint, setShowInstallHint] = useState<WalletType>();
  const [showSignHint, setShowSignHint] = useState(false);
  const [pages, setPages] = useState(new Stack<{ page: string; allowedTiles: string[] | undefined }>());

  const redirectPath = new URLSearchParams(search).get('redirect-path');
  const currentPage = pages.current?.page;
  const allowedTiles = pages.current?.allowedTiles;
  const tiles = getTiles(currentPage);

  // signature hint
  async function confirmSignHint(): Promise<void> {
    if (!showsSignatureInfo.get()) return;

    setShowSignHint(true);
    return defer().promise;
  }

  function signHintConfirmed(hide: boolean) {
    showsSignatureInfo.set(!hide);
    setShowSignHint(false);
    deferRef?.resolve();
  }

  function signHintRejected() {
    setShowSignHint(false);
    deferRef?.reject(new AbortError('User cancelled'));
  }

  function onHintConfirmed() {
    setShowInstallHint(undefined);
  }

  // tile handling
  function handleNext(tile: Tile) {
    if (tile.wallet) {
      connect(tile.wallet.type, tile.wallet.blockchain)
        .then(() => setPages(new Stack()))
        .catch(console.error);
    } else if (tile.next) {
      if (tile.next.options) setOptions(tile.next.options);
      const page = { page: tile.next.page, allowedTiles: tile.next.tiles };
      setPages((p) => p.push(page));
    }
  }

  function handleBack() {
    if (showSignHint) {
      signHintRejected();
    } else if (isConnectingTo) {
      setConnectError(undefined);
      setIsConnectingTo(undefined);
    } else {
      setPages((p) => p.pop());
    }
  }

  // connect
  async function connect(wallet: WalletType, blockchain?: Blockchain, address?: string) {
    const installedWallets = await getInstalledWallets();
    if (installedWallets.some((w) => w === wallet)) {
      setIsConnectingTo(wallet);
      setConnectError(undefined);

      return doLogin(wallet, blockchain, address)
        .then(() => {
          if (redirectPath) {
            // wait for the user to reload
            setTimeout(() => navigate({ pathname: redirectPath }, { clearParams: ['redirect-path'] }), 10);
          }
        })
        .catch((e) => {
          if (e instanceof AbortError) {
            setIsConnectingTo(undefined);
          } else {
            setConnectError(e.message);
          }

          throw e;
        });
    } else {
      setShowInstallHint(wallet);
      throw new Error('Wallet not installed');
    }
  }

  async function doLogin(wallet: WalletType, blockchain?: Blockchain, address?: string) {
    const selectedChain = blockchain ?? (paramBlockchain as Blockchain);

    return activeWallet === wallet
      ? selectedChain && switchBlockchain(selectedChain)
      : logout().then(() => login(wallet, confirmSignHint, selectedChain, address));
  }

  return (
    <Layout
      title={isEmbedded ? translate('screens/home', 'DFX services') : undefined}
      backButton={isEmbedded || currentPage != null}
      onBack={currentPage ? handleBack : undefined}
    >
      {isProcessing || isUserLoading || !tiles ? (
        <div className="mt-4">
          <StyledLoadingSpinner size={SpinnerSize.LG} />
        </div>
      ) : (
        <div className="z-1">
          {showInstallHint ? (
            <InstallHint type={showInstallHint} onConfirm={onHintConfirmed} />
          ) : showSignHint ? (
            <SignHint onConfirm={signHintConfirmed} />
          ) : isConnectingTo ? (
            connectError ? (
              <>
                <h2 className="text-dfxGray-700">{translate('screens/home', 'Connection failed!')}</h2>
                <p className="text-dfxRed-150">{translate('screens/home', connectError)}</p>

                <StyledButton
                  className="mt-4"
                  label={translate('general/actions', 'Back')}
                  onClick={handleBack}
                  color={StyledButtonColor.GRAY_OUTLINE}
                  width={StyledButtonWidth.MIN}
                />
              </>
            ) : (
              <>
                <div className="mb-4">
                  <StyledLoadingSpinner size={SpinnerSize.LG} />
                </div>
                <ConnectHint type={isConnectingTo} />
              </>
            )
          ) : (
            <>
              <div className="flex self-start mb-4 sm:mt-8 sm:mb-14">
                <div className="bg-dfxRed-100" style={{ width: '11px', marginRight: '12px' }}></div>
                <div className="text-xl text-dfxBlue-800 font-extrabold text-left">
                  <Trans i18nKey={'screens/home.title'}>
                    Access all <span className="text-dfxRed-100 uppercase">DFX Services</span>
                    <br />
                    with this easy <span className="text-dfxRed-100 uppercase">toolbox</span>
                  </Trans>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 w-full mb-3">
                {tiles
                  .filter((t) => !allowedTiles || allowedTiles.includes(t.id))
                  .map((t) => (
                    <div
                      key={t.id}
                      className="relative aspect-square"
                      style={{ borderRadius: '4%', boxShadow: '0px 0px 5px 3px rgba(0, 0, 0, 0.25)' }}
                    >
                      <img
                        src={t.img}
                        className={t.disabled ? 'opacity-60' : 'cursor-pointer'}
                        onClick={() => handleNext(t)}
                      />
                      {t.disabled && (
                        <div
                          className="absolute right-2 bottom-3 text-dfxBlue-800 font-extrabold rotate-180 uppercase"
                          style={{ writingMode: 'vertical-rl', fontSize: 'min(2vw, 1rem)' }}
                        >
                          {translate('screens/home', 'Coming Soon')}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="absolute bottom-0 w-full">
        <img src="https://content.dfx.swiss/img/v1/services/berge.png" className="w-full" />
      </div>
    </Layout>
  );
}

function SignHint({ onConfirm }: { onConfirm: (hide: boolean) => void }): JSX.Element {
  const { translate } = useSettingsContext();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <StyledVerticalStack gap={5} center>
      <StyledVerticalStack center>
        <DfxIcon icon={IconVariant.SIGNATURE_POPUP} />
        <h2 className="text-dfxGray-700">
          {translate(
            'screens/home',
            'Log in to your DFX account by verifying with your signature that you are the sole owner of the provided blockchain address.',
          )}
        </h2>
      </StyledVerticalStack>
      <StyledCheckboxRow isChecked={isChecked} onChange={setIsChecked} centered>
        {translate('screens/home', "Don't show this again.")}
      </StyledCheckboxRow>

      <StyledButton
        width={StyledButtonWidth.MD}
        color={StyledButtonColor.RED}
        label="OK"
        onClick={() => onConfirm(isChecked)}
      />
    </StyledVerticalStack>
  );
}

function InstallHint({ type, onConfirm }: { type: WalletType; onConfirm: () => void }): JSX.Element {
  switch (type) {
    case WalletType.META_MASK:
      return <MetaMaskHint onConfirm={onConfirm} />;
    case WalletType.ALBY:
      return <AlbyHint onConfirm={onConfirm} />;
    case WalletType.LEDGER:
      return <LedgerHint onConfirm={onConfirm} />;
  }
}

function MetaMaskHint({ onConfirm }: { onConfirm: () => void }): JSX.Element {
  const { translate } = useSettingsContext();

  return (
    <StyledVerticalStack gap={4}>
      <h1 className="text-dfxGray-700">{translate('screens/home', 'Please install MetaMask or Rabby!')}</h1>
      <p className="text-dfxGray-700">
        {translate(
          'screens/home',
          'You need to install the MetaMask or Rabby browser extension to be able to use this service.',
        )}{' '}
        <Trans i18nKey="screens/home.visit">
          Visit <MetaMaskLink /> for more details.
        </Trans>
      </p>

      <div className="mx-auto">
        <StyledButton width={StyledButtonWidth.SM} onClick={onConfirm} label={translate('general/actions', 'OK')} />
      </div>
    </StyledVerticalStack>
  );
}

function MetaMaskLink(): JSX.Element {
  return (
    <>
      <StyledLink label="metamask.io" url="https://metamask.io" dark /> /{' '}
      <StyledLink label="rabby.io" url="https://rabby.io/" dark />
    </>
  );
}

function AlbyHint({ onConfirm }: { onConfirm: () => void }): JSX.Element {
  const { translate } = useSettingsContext();

  return (
    <StyledVerticalStack gap={4}>
      <h1 className="text-dfxGray-700">{translate('screens/home', 'Please install Alby!')}</h1>
      <p className="text-dfxGray-700">
        {translate('screens/home', 'You need to install the Alby browser extension to be able to use this service.')}{' '}
        <Trans i18nKey="screens/home.visit">
          Visit <StyledLink label="getalby.com" url="https://getalby.com/" dark /> for more details.
        </Trans>
      </p>

      <div className="mx-auto">
        <StyledButton width={StyledButtonWidth.SM} onClick={onConfirm} label={translate('general/actions', 'OK')} />
      </div>
    </StyledVerticalStack>
  );
}

function LedgerHint({ onConfirm }: { onConfirm: () => void }): JSX.Element {
  const { translate } = useSettingsContext();

  return (
    <StyledVerticalStack gap={4}>
      <h1 className="text-dfxGray-700">{translate('screens/home', 'Browser not supported!')}</h1>
      <p className="text-dfxGray-700">
        {translate('screens/home', 'Please use a compatible browser (e.g. Chrome) to be able to use this service.')}{' '}
        <Trans i18nKey="screens/home.visit">
          Visit <StyledLink label="caniuse.com" url="https://caniuse.com/webhid" dark /> for more details.
        </Trans>
      </p>

      <div className="mx-auto">
        <StyledButton width={StyledButtonWidth.SM} onClick={onConfirm} label={translate('general/actions', 'OK')} />
      </div>
    </StyledVerticalStack>
  );
}

function ConnectHint({ type }: { type: WalletType }): JSX.Element {
  const { translate } = useSettingsContext();
  switch (type) {
    case WalletType.META_MASK:
      return (
        <p className="text-dfxGray-700">
          {translate('screens/home', 'Please confirm the connection in your MetaMask.')}
        </p>
      );
    case WalletType.ALBY:
      return (
        <p className="text-dfxGray-700">
          {translate('screens/home', 'Please confirm the connection in the Alby browser extension.')}
        </p>
      );
    case WalletType.LEDGER:
      return (
        <p className="text-dfxGray-700">
          {translate('screens/home', 'Please confirm the connection with your Ledger.')}
        </p>
      );
  }
}
