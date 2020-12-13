import { DefaultTheme } from 'styled-components';
import dark from './Dark';
import light from './Light';

// Interface responsavel por todas variaveis de tema disponivel.
export interface ThemeInterface {
  bgColor: string;
  primaryColor: string;
  primaryDarkColor: string;
  secondaryColor: string;
  secondaryDarkColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  name: string;
}

export type ThemeType = 'dark' | 'light';

interface ThemeGeneralInterface {
  dark: DefaultTheme;
  light?: DefaultTheme;
  default: ThemeType;
}

const Theme: ThemeGeneralInterface = {
  dark,
  light,
  default: 'dark',
};

export default Theme;
