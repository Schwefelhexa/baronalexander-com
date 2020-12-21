import { useContext } from 'react';
import { DarkModeContext } from './DarkModeProvider';

export const useDarkMode = (): [boolean, (darkMode: boolean) => void] => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return [darkMode, setDarkMode];
};
