import { Dispatch, SetStateAction, useState } from 'react';
import { DefaultTheme } from 'styled-components';
import Themes, { ThemeType } from '../themes';

export interface UseThemeResponse {
  setTheme: Dispatch<SetStateAction<ThemeType>>;
  theme: DefaultTheme;
}

const useTheme = (): UseThemeResponse => {
  const [theme, setTheme] = useState<ThemeType>(Themes.default);
  return {
    theme: Themes[theme],
    setTheme,
  };
};

export default useTheme;
