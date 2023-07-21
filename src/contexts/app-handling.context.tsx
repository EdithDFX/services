import { Buy, Sell } from '@dfx.swiss/react';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useIframe } from '../hooks/iframe.hook';
import { useStore } from '../hooks/store.hook';

export enum CloseType {
  BUY = 'buy',
  SELL = 'sell',
  CANCEL = 'cancel',
}

export interface IframeMessageData {
  type: CloseType;
  buy?: Buy;
  sell?: Sell;
}

export interface ICloseServicesParams {
  type: CloseType;
  buy?: {
    paymentInfo: Buy;
    amount: number;
  };
  sell?: {
    paymentInfo: Sell;
    amount: number;
  };
}

export interface CancelServicesParams extends ICloseServicesParams {
  type: CloseType.CANCEL;
}

export interface BuyServicesParams extends ICloseServicesParams {
  type: CloseType.BUY;
  buy: {
    paymentInfo: Buy;
    amount: number;
  };
}

export interface SellServicesParams extends ICloseServicesParams {
  type: CloseType.SELL;
  sell: {
    paymentInfo: Sell;
    amount: number;
  };
}

export type CloseServicesParams = CancelServicesParams | BuyServicesParams | SellServicesParams;

interface AppHandlingContextInterface {
  setRedirectUri: (redirectUri: string) => void;
  closeServices: (params: CloseServicesParams) => void;
}

const AppHandlingContext = createContext<AppHandlingContextInterface>(undefined as any);

export function useAppHandlingContext(): AppHandlingContextInterface {
  return useContext(AppHandlingContext);
}

export function AppHandlingContextProvider(props: PropsWithChildren): JSX.Element {
  const { redirectUri: storeRedirectUri } = useStore();
  const [redirectUri, setRedirectUri] = useState<string>();
  const { isUsedByIframe, sendMessage } = useIframe();

  useEffect(() => {
    if (!redirectUri) setRedirectUri(storeRedirectUri.get());
  }, []);

  function closeServices(params: CloseServicesParams) {
    if (isUsedByIframe) {
      sendMessage(createIframeMessageData(params));
    } else {
      const win: Window = window;
      win.location = getRedirectUri(params);
    }
  }

  function getRedirectUri(params: CloseServicesParams): string {
    switch (params.type) {
      case CloseType.BUY:
        return `${redirectUri}${params.type}`;

      case CloseType.SELL:
        const urlParams = new URLSearchParams({
          routeId: '' + (params.sell?.paymentInfo?.routeId ?? 0),
          amount: params.sell?.amount ? params.sell.amount.toString() : '0',
        });
        return `${redirectUri}${params.type}?${urlParams}`;

      default:
        return `${redirectUri}`;
    }
  }

  function createIframeMessageData(params: CloseServicesParams): IframeMessageData {
    switch (params.type) {
      case CloseType.BUY:
        return {
          type: CloseType.BUY,
          buy: params.buy.paymentInfo,
        };

      case CloseType.SELL:
        return {
          type: CloseType.SELL,
          sell: params.sell.paymentInfo,
        };

      default:
        return { type: CloseType.CANCEL };
    }
  }

  const context = useMemo(
    () => ({
      setRedirectUri: (redirectUri: string) => {
        setRedirectUri(redirectUri);
        storeRedirectUri.set(redirectUri);
      },
      closeServices,
    }),
    [redirectUri],
  );

  return <AppHandlingContext.Provider value={context}>{props.children}</AppHandlingContext.Provider>;
}
