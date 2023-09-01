import { PropsWithChildren, Ref } from 'react';
import { Navigation } from './navigation';

interface LayoutProps extends PropsWithChildren {
  title?: string;
  backButton?: boolean;
  onBack?: () => void;
  textStart?: boolean;
  rootRef?: Ref<HTMLDivElement>;
  scrollRef?: Ref<HTMLDivElement>;
}

export function Layout({
  title,
  backButton,
  onBack,
  textStart,
  children,
  rootRef,
  scrollRef,
}: LayoutProps): JSX.Element {
  return (
    <div id="app-root" className="h-full flex flex-col" ref={rootRef}>
      <Navigation title={title} backButton={backButton} onBack={onBack} />

      <div className="flex flex-col flex-grow overflow-auto" ref={scrollRef}>
        <div className="flex flex-grow justify-center">
          <div
            className={`relative max-w-screen-md flex flex-grow flex-col items-center ${
              textStart ? 'text-start' : 'text-center'
            } px-5 py-2 mt-4 gap-2`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
