import React, { createContext, useEffect, useRef, useState } from 'react';
import { DARK_MODE_LOCAL_STORAGE_KEY } from '.';

export interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}
export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

export interface DarkModeProviderProps {
  startState?: boolean;
}
const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  startState,
  children,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementsByTagName('html')[0] as HTMLElement);
  }, []);

  const [darkMode, setDarkMode] = useState(startState ?? false);

  useEffect(() => {
    // This has been set by our script in _document.tsx
    setDarkMode(localStorage.getItem(DARK_MODE_LOCAL_STORAGE_KEY) === 'true');
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (!container) return;

    if (darkMode) container.classList.add('dark');
    else container.classList.remove('dark');
  }, [darkMode, container]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
export default DarkModeProvider;
