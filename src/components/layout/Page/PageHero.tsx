import { createContext, useContext, useEffect, useState } from 'react';

type Hero = React.ReactNode | null;
export interface PageContextType {
  setHero: (identifier: string, hero: Hero) => void;
}
export const PageContext = createContext<PageContextType>({
  setHero: () => {},
});

type RenderProp = (hero: Hero) => React.ReactNode;
interface PageContextProviderProps {
  children: React.ReactNode | RenderProp;
}
export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  children,
}) => {
  const [hero, setHero] = useState<Hero>(null);
  const [identifier, setIdentifier] = useState<string | null>(null);

  return (
    <PageContext.Provider
      value={{
        setHero: (newIdentifier, hero) => {
          if (identifier && identifier !== newIdentifier) {
            console.warn(
              `Tried to set hero from multiple places! Ignoring identifier '${newIdentifier}'`
            );
            return;
          }
          setHero(hero);
          if (identifier !== newIdentifier) setIdentifier(newIdentifier);
        },
      }}
    >
      {typeof children === 'function'
        ? (children as RenderProp)(hero)
        : children}
    </PageContext.Provider>
  );
};

interface PageHeroProps {
  identifier: string;
  children: React.ReactNode;
}
export const PageHero: React.FC<PageHeroProps> = ({ identifier, children }) => {
  const context = useContext(PageContext);
  useEffect(() => {
    context.setHero(identifier, children);
  }, [identifier, children]);

  return null;
};
