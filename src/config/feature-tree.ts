import { Blockchain } from '@dfx.swiss/react';
import { WalletType } from '../contexts/wallet.context';
import { Page } from '../hooks/feature-tree.hook';

export const FeatureTree: Page[] = [
  // --- DEFAULT CONFIG --- //
  {
    id: 'home',
    dfxStyle: true,
    tiles: [
      {
        id: 'buy',
        img: 'kaufen',
        next: {
          page: 'buy',
        },
      },
      {
        id: 'sell',
        img: 'verkaufen',
        next: {
          page: 'sell',
        },
      },
      {
        id: 'convert',
        img: 'tauschen',
        disabled: true,
      },
      {
        id: 'send',
        img: 'senden',
        disabled: true,
      },
    ],
  },
  {
    id: 'buy',
    dfxStyle: true,
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning',
        next: {
          page: 'wallets',
          tiles: ['dfx-wallet', 'hw-wallet', 'alby', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BITCOIN, assetOut: 'BTC' },
          },
        },
      },
      {
        id: 'taproot',
        img: 'taproot',
        disabled: true,
      },
      {
        id: 'erc20',
        img: 'ethereumarbitrumoptimismpolygon',
        next: {
          page: 'buy-erc20',
        },
      },
      {
        id: 'bsc',
        img: 'binancesmartchain',
        next: {
          page: 'buy-bsc',
        },
      },
    ],
  },
  {
    id: 'buy-erc20',
    dfxStyle: true,
    tiles: [
      {
        id: 'ethereum',
        img: 'ethereum',
        next: {
          page: 'buy-ethereum',
        },
      },
      {
        id: 'arbitrum',
        img: 'arbitrum',
        next: {
          page: 'buy-arbitrum',
        },
      },
      {
        id: 'optimism',
        img: 'optimism',
        next: {
          page: 'buy-optimism',
        },
      },
      {
        id: 'polygon',
        img: 'polygon',
        disabled: true,
      },
    ],
  },
  {
    id: 'buy-ethereum',
    dfxStyle: true,
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'buy-ethereum-stable',
        },
      },
      {
        id: 'other',
        img: 'othersethereum',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'buy-ethereum-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersethereum',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'buy-arbitrum',
    dfxStyle: true,
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'buy-arbitrum-stable',
        },
      },
      {
        id: 'other',
        img: 'othersarbitrum',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'buy-arbitrum-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersarbitrum',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'buy-optimism',
    dfxStyle: true,
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'buy-optimism-stable',
        },
      },
      {
        id: 'other',
        img: 'othersoptimism',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'buy-optimism-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'xchf',
        img: 'xchf',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'XCHF' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersoptimism',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'buy-bsc',
    dfxStyle: true,
    tiles: [
      {
        id: 'bnb',
        img: 'bnb',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetOut: 'BNB' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'buy-bsc-stable',
        },
      },
      {
        id: 'other',
        img: 'othersbinancesmartchain',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'buy-bsc-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetOut: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersbinancesmartchain',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell',
    dfxStyle: true,
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning',
        next: {
          page: 'wallets',
          tiles: ['dfx-wallet', 'alby'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BITCOIN, assetIn: 'BTC' },
          },
        },
      },
      {
        id: 'taproot',
        img: 'taproot',
        disabled: true,
      },
      {
        id: 'erc20',
        img: 'ethereumarbitrumoptimismpolygon',
        next: {
          page: 'sell-erc20',
        },
      },
      {
        id: 'bsc',
        img: 'binancesmartchain',
        next: {
          page: 'sell-bsc',
        },
      },
    ],
  },
  {
    id: 'sell-erc20',
    dfxStyle: true,
    tiles: [
      {
        id: 'ethereum',
        img: 'ethereum',
        next: {
          page: 'sell-ethereum',
        },
      },
      {
        id: 'arbitrum',
        img: 'arbitrum',
        next: {
          page: 'sell-arbitrum',
        },
      },
      {
        id: 'optimism',
        img: 'optimism',
        next: {
          page: 'sell-optimism',
        },
      },
      {
        id: 'polygon',
        img: 'polygon',
        disabled: true,
      },
    ],
  },
  {
    id: 'sell-ethereum',
    dfxStyle: true,
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ETHEREUM, assetIn: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ETHEREUM, assetIn: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'sell-ethereum-stable',
        },
      },
      {
        id: 'other',
        img: 'othersethereum',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ETHEREUM, assetIn: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell-ethereum-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ETHEREUM, assetIn: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ETHEREUM, assetIn: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ETHEREUM, assetIn: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersethereum',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ETHEREUM, assetIn: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell-arbitrum',
    dfxStyle: true,
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ARBITRUM, assetIn: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ARBITRUM, assetIn: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'sell-arbitrum-stable',
        },
      },
      {
        id: 'other',
        img: 'othersarbitrum',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ARBITRUM, assetIn: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell-arbitrum-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ARBITRUM, assetIn: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ARBITRUM, assetIn: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ARBITRUM, assetIn: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersarbitrum',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.ARBITRUM, assetIn: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell-optimism',
    dfxStyle: true,
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.OPTIMISM, assetIn: 'ETH' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'sell-optimism-stable',
        },
      },
      {
        id: 'other',
        img: 'othersoptimism',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.OPTIMISM, assetIn: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell-optimism-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.OPTIMISM, assetIn: 'USDT' },
          },
        },
      },
      {
        id: 'xchf',
        img: 'xchf',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.OPTIMISM, assetIn: 'XCHF' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersoptimism',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.OPTIMISM, assetIn: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell-bsc',
    dfxStyle: true,
    tiles: [
      {
        id: 'bnb',
        img: 'bnb',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetIn: 'BNB' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetIn: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'sell-bsc-stable',
        },
      },
      {
        id: 'other',
        img: 'othersbinancesmartchain',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetIn: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'sell-bsc-stable',
    dfxStyle: true,
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetIn: 'USDT' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetIn: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersbinancesmartchain',
        next: {
          page: 'wallets',
          tiles: ['metamask', 'walletconnect'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BINANCE_SMART_CHAIN, assetIn: undefined },
          },
        },
      },
    ],
  },

  // --- BITCOIN ONLY --- //
  {
    id: 'bitcoinonly',
    tiles: [
      {
        id: 'bitcoinonly-buy',
        img: 'kaufen',
        next: {
          page: 'bitcoinonly-buy',
        },
      },
      {
        id: 'bitcoinonly-sell',
        img: 'verkaufen',
        next: {
          page: 'bitcoinonly-sell',
        },
      },
    ],
  },
  {
    id: 'bitcoinonly-buy',
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning',
        next: {
          page: 'wallets',
          tiles: ['dfx-wallet', 'hw-wallet', 'alby'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BITCOIN, assetOut: 'BTC' },
          },
        },
      },
    ],
  },
  {
    id: 'bitcoinonly-sell',
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning',
        next: {
          page: 'wallets',
          tiles: ['dfx-wallet', 'alby'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BITCOIN, assetIn: 'BTC' },
          },
        },
      },
    ],
  },

  // --- ALBY ONLY --- //
  {
    id: 'albyonly',
    header: 'Buy and sell with Alby',
    description: 'Buy and sell Bitcoin directly on your Alby Account!',
    bottomImage:
      'https://getalby.com/assets/alby-logo-head-da6c4355b69a3baac3fc306d47741c9394a825e54905ef67c5dd029146b89edf.svg',
    tiles: [
      {
        id: 'albyonly-buy',
        img: 'kaufen_simple',
        next: {
          page: 'wallets',
          tiles: ['alby'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.LIGHTNING, assetOut: 'BTC' },
          },
        },
      },
      {
        id: 'albyonly-sell',
        img: 'verkaufen_simple',
        next: {
          page: 'wallets',
          tiles: ['alby'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.LIGHTNING, assetOut: 'BTC' },
          },
        },
      },
    ],
  },

  // --- BitBox ONLY Buy --- //
  {
    id: 'bitboxonly-buy',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BITCOIN, assetOut: 'BTC' },
          },
        },
      },
      {
        id: 'erc20',
        img: 'ethereumarbitrumoptimismpolygon',
        next: {
          page: 'bitboxonly-buy-erc20',
        },
      },
    ],
  },
  {
    id: 'bitboxonly-buy-erc20',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'ethereum',
        img: 'ethereum',
        next: {
          page: 'bitboxonly-buy-ethereum',
        },
      },
      {
        id: 'arbitrum',
        img: 'arbitrum',
        next: {
          page: 'bitboxonly-buy-arbitrum',
        },
      },
      {
        id: 'optimism',
        img: 'optimism',
        next: {
          page: 'bitboxonly-buy-optimism',
        },
      },
    ],
  },
  {
    id: 'bitboxonly-buy-ethereum',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'bitboxonly-buy-ethereum-stable',
        },
      },
      {
        id: 'other',
        img: 'othersethereum',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'bitboxonly-buy-ethereum-stable',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersethereum',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'bitboxonly-buy-arbitrum',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'bitboxonly-buy-arbitrum-stable',
        },
      },
      {
        id: 'other',
        img: 'othersarbitrum',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'bitboxonly-buy-arbitrum-stable',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'DAI' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersarbitrum',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'bitboxonly-buy-optimism',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'bitboxonly-buy-optimism-stable',
        },
      },
      {
        id: 'other',
        img: 'othersoptimism',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: undefined },
          },
        },
      },
    ],
  },
  {
    id: 'bitboxonly-buy-optimism-stable',
    header: 'Buy Crypto',
    description: 'Buy Bitcoin and crypto directly on your BitBox!',
    bottomImage: 'https://bitbox.shop/media/__sized__/products/email-image-thumbnail-540x540-70.jpg',
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'xchf',
        img: 'xchf',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'XCHF' },
          },
        },
      },
      {
        id: 'other',
        img: 'othersoptimism',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: undefined },
          },
        },
      },
    ],
  },

  // --- MARC STEINER --- //
  {
    id: 'marcsteiner',
    header: 'marcsteiner-consulting.ch',
    description: 'Buy and sell Bitcoin and Crypto directly on your Wallet!',
    bottomImage: 'https://marcsteiner-consulting.ch/wp-content/uploads/2022/05/MS_Logo.svg',
    tiles: [
      {
        id: 'marcsteiner-buy',
        img: 'kaufen_simple',
        next: {
          page: 'marcsteiner-buy',
        },
      },
      {
        id: 'marcsteiner-sell',
        img: 'verkaufen_simple',
        next: {
          page: 'marcsteiner-sell',
        },
      },
    ],
  },
  {
    id: 'marcsteiner-buy',
    header: 'marcsteiner-consulting.ch',
    description: 'Buy and sell Bitcoin and Crypto directly on your Wallet!',
    bottomImage: 'https://marcsteiner-consulting.ch/wp-content/uploads/2022/05/MS_Logo.svg',
    tiles: [
      {
        id: 'marcsteiner-buy-bitcoin',
        img: 'bitcoinlightning_simple',
        next: {
          page: 'hw-wallets',
          tiles: ['bitbox', 'ledger'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BITCOIN, assetOut: 'BTC' },
          },
        },
      },
      {
        id: 'marcsteiner-buy-erc20',
        img: 'ethereumarbitrumoptimismpolygon_simple',
        next: {
          page: 'marcsteiner-buy-erc20',
        },
      },
    ],
  },
  {
    id: 'marcsteiner-buy-erc20',
    header: 'marcsteiner-consulting.ch',
    description: 'Buy and sell Bitcoin and Crypto directly on your Wallet!',
    bottomImage: 'https://marcsteiner-consulting.ch/wp-content/uploads/2022/05/MS_Logo.svg',
    tiles: [
      {
        id: 'ethereum',
        img: 'ethereum',
        next: {
          page: 'marcsteiner-buy-ethereum',
        },
      },
      {
        id: 'arbitrum',
        img: 'arbitrum',
        next: {
          page: 'marcsteiner-buy-arbitrum',
        },
      },
      {
        id: 'optimism',
        img: 'optimism',
        next: {
          page: 'marcsteiner-buy-optimism',
        },
      },
    ],
  },
  {
    id: 'marcsteiner-buy-ethereum',
    header: 'marcsteiner-consulting.ch',
    description: 'Buy and sell Bitcoin and Crypto directly on your Wallet!',
    bottomImage: 'https://marcsteiner-consulting.ch/wp-content/uploads/2022/05/MS_Logo.svg',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDC' },
          },
        },
      },
    ],
  },
  {
    id: 'marcsteiner-buy-arbitrum',
    header: 'marcsteiner-consulting.ch',
    description: 'Buy and sell Bitcoin and Crypto directly on your Wallet!',
    bottomImage: 'https://marcsteiner-consulting.ch/wp-content/uploads/2022/05/MS_Logo.svg',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDC' },
          },
        },
      },
    ],
  },
  {
    id: 'marcsteiner-buy-optimism',
    header: 'marcsteiner-consulting.ch',
    description: 'Buy and sell Bitcoin and Crypto directly on your Wallet!',
    bottomImage: 'https://marcsteiner-consulting.ch/wp-content/uploads/2022/05/MS_Logo.svg',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'USDC' },
          },
        },
      },
    ],
  },
  {
    id: 'marcsteiner-sell',
    header: 'marcsteiner-consulting.ch',
    description: 'Buy and sell Bitcoin and Crypto directly on your Wallet!',
    bottomImage: 'https://marcsteiner-consulting.ch/wp-content/uploads/2022/05/MS_Logo.svg',
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning_simple',
        next: {
          page: 'wallets',
          tiles: ['dfx-wallet', 'alby'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BITCOIN, assetIn: 'BTC' },
          },
        },
      },
      {
        id: 'erc20',
        img: 'ethereumarbitrumoptimismpolygon_simple',
        next: {
          page: 'sell-erc20',
        },
      },
    ],
  },

  // --- KEVIN SOELL --- //
  {
    id: 'kevinsoell',
    tiles: [
      {
        id: 'buy',
        img: 'kaufen',
        next: {
          page: 'kevinsoell-buy',
        },
      },
      {
        id: 'sell',
        img: 'verkaufen',
        next: {
          page: 'kevinsoell-sell',
        },
      },
      {
        id: 'convert',
        img: 'tauschen',
        disabled: true,
      },
    ],
  },
  {
    id: 'kevinsoell-buy',
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.BITCOIN, assetOut: 'BTC' },
          },
        },
      },
      {
        id: 'kevinsoell-buy-erc20',
        img: 'ethereumarbitrumoptimismpolygon',
        next: {
          page: 'kevinsoell-buy-erc20',
        },
      },
    ],
  },
  {
    id: 'kevinsoell-buy-erc20',
    tiles: [
      {
        id: 'ethereum',
        img: 'ethereum',
        next: {
          page: 'kevinsoell-buy-ethereum',
        },
      },
      {
        id: 'arbitrum',
        img: 'arbitrum',
        next: {
          page: 'kevinsoell-buy-arbitrum',
        },
      },
      {
        id: 'optimism',
        img: 'optimism',
        next: {
          page: 'kevinsoell-buy-optimism',
        },
      },
    ],
  },
  {
    id: 'kevinsoell-buy-ethereum',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'kevinsoell-buy-ethereum-stable',
        },
      },
    ],
  },
  {
    id: 'kevinsoell-buy-ethereum-stable',
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ETHEREUM, assetOut: 'DAI' },
          },
        },
      },
    ],
  },
  {
    id: 'kevinsoell-buy-arbitrum',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'kevinsoell-buy-arbitrum-stable',
        },
      },
    ],
  },
  {
    id: 'kevinsoell-buy-arbitrum-stable',
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.ARBITRUM, assetOut: 'DAI' },
          },
        },
      },
    ],
  },
  {
    id: 'kevinsoell-buy-optimism',
    tiles: [
      {
        id: 'eth',
        img: 'eth',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'ETH' },
          },
        },
      },
      {
        id: 'wbtc',
        img: 'wbtc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'WBTC' },
          },
        },
      },
      {
        id: 'stable',
        img: 'stablecoin',
        next: {
          page: 'kevinsoell-buy-optimism-stable',
        },
      },
    ],
  },
  {
    id: 'kevinsoell-buy-optimism-stable',
    tiles: [
      {
        id: 'usdt',
        img: 'usdt',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'USDT' },
          },
        },
      },
      {
        id: 'usdc',
        img: 'usdc',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'USDC' },
          },
        },
      },
      {
        id: 'dai',
        img: 'dai',
        next: {
          page: 'wallets',
          tiles: ['hw-wallet', 'metamask', 'walletconnect', 'cli'],
          options: {
            service: 'buy',
            query: { blockchain: Blockchain.OPTIMISM, assetOut: 'DAI' },
          },
        },
      },
    ],
  },
  {
    id: 'kevinsoell-sell',
    tiles: [
      {
        id: 'bitcoin',
        img: 'bitcoinlightning',
        next: {
          page: 'wallets',
          tiles: ['dfx-wallet', 'alby'],
          options: {
            service: 'sell',
            query: { blockchain: Blockchain.BITCOIN, assetIn: 'BTC' },
          },
        },
      },
      {
        id: 'erc20',
        img: 'ethereumarbitrumoptimismpolygon',
        next: {
          page: 'sell-erc20',
        },
      },
    ],
  },

  // --- WALLETS --- //
  {
    id: 'wallets',
    tiles: [
      {
        id: 'dfx-wallet',
        img: 'bitcoinapp',
        disabled: true,
      },
      {
        id: 'metamask',
        img: 'metamaskrabby',
        wallet: { type: WalletType.META_MASK },
      },
      {
        id: 'hw-wallet',
        img: 'hardwarewallets',
        next: {
          page: 'hw-wallets',
        },
      },
      {
        id: 'alby',
        img: 'alby',
        wallet: { type: WalletType.ALBY, blockchain: Blockchain.LIGHTNING },
      },
      {
        id: 'walletconnect',
        img: 'walletconnect',
       // wallet: { type: WalletType.WALLET_CONNECT }, //
        disabled: true,
      },
      {
        id: 'cli',
        img: 'command',
        wallet: (params) => ({
          type: params.blockchain === Blockchain.BITCOIN ? WalletType.CLI_BTC : WalletType.CLI_ETH,
        }),
      },
    ],
  },
  {
    id: 'hw-wallets',
    tiles: [
      {
        id: 'bitbox',
        img: 'bitbox',
        wallet: (params) => ({
          type: params.blockchain === Blockchain.BITCOIN ? WalletType.BITBOX_BTC : WalletType.BITBOX_ETH,
        }),
      },
      {
        id: 'ledger',
        img: 'ledger',
        wallet: (params) => ({
          type: params.blockchain === Blockchain.BITCOIN ? WalletType.LEDGER_BTC : WalletType.LEDGER_ETH,
        }),
      },
      {
        id: 'trezor',
        img: 'trezor',
        wallet: (params) => ({
          type: params.blockchain === Blockchain.BITCOIN ? WalletType.TREZOR_BTC : WalletType.TREZOR_ETH,
        }),
      },
    ],
  },
];
