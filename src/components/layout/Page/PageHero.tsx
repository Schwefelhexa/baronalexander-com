import ReactDOM from 'react-dom';
import { createContext, useContext, useEffect, useState } from 'react';

export interface PageContextType {
  heroContainer: Element | null;
  setPadding: (padding: boolean) => void;
}
export const PageContext = createContext<PageContextType>({
  heroContainer: null,
  setPadding: () => {},
});

type RenderProp = (padding: boolean) => React.ReactNode;
interface PageContextProviderProps {
  heroContainer: Element | null;
  children: React.ReactNode | RenderProp;
}
export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  heroContainer,
  children,
}) => {
  const [padding, setPadding] = useState(true);

  return (
    <PageContext.Provider
      value={{
        heroContainer,
        setPadding,
      }}
    >
      {typeof children === 'function'
        ? (children as RenderProp)(padding)
        : children}
    </PageContext.Provider>
  );
};

interface PageHeroProps {
  padding?: boolean;
  children: React.ReactNode;
}
export const PageHero: React.FC<PageHeroProps> = ({
  children,
  padding = true,
}) => {
  const { heroContainer, setPadding } = useContext(PageContext);

  console.log({ padding });

  useEffect(() => {
    setPadding(padding);

    // Explicit cleanup
    if (!padding) return () => setPadding(true);
  }, [padding, setPadding]);

  if (!heroContainer && process.browser)
    console.error('No hero container provided!');
  if (!heroContainer) return null;
  return ReactDOM.createPortal(children, heroContainer);
};
