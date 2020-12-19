import { createContext, useContext, useEffect, useState } from 'react';

type Hero = React.ReactNode | null;
export interface PageContextType {
  setHero: (identifier: string, hero: Hero, padding: boolean) => void;
}
export const PageContext = createContext<PageContextType>({
  setHero: () => {},
});

type RenderProp = (hero: Hero, padding: boolean) => React.ReactNode;
interface PageContextProviderProps {
  children: React.ReactNode | RenderProp;
}
export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  children,
}) => {
  const [hero, setHero] = useState<Hero>(null);
  const [identifier, setIdentifier] = useState<string | null>(null);
  const [padding, setPadding] = useState(true);

  return (
    <PageContext.Provider
      value={{
        setHero: (newIdentifier, hero, padding) => {
          if (identifier && identifier !== newIdentifier) {
            console.warn(
              `Tried to set hero from multiple places! Ignoring identifier '${newIdentifier}'`
            );
            return;
          }
          setHero(hero);
          setPadding(padding);
          if (identifier !== newIdentifier) setIdentifier(newIdentifier);
        },
      }}
    >
      {typeof children === 'function'
        ? (children as RenderProp)(hero, padding)
        : children}
    </PageContext.Provider>
  );
};

interface PageHeroProps {
  identifier: string;
  padding?: boolean;
  children: React.ReactNode;
}
export const PageHero: React.FC<PageHeroProps> = ({
  identifier,
  children,
  padding = true,
}) => {
  const context = useContext(PageContext);
  useEffect(() => {
    context.setHero(identifier, children, padding);
  }, [identifier, children, padding]);

  return null;
};
