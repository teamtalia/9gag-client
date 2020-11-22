import { DefaultTheme } from 'styled-components';
import Dark from './Dark';
import Light from './Light';

// Interface responsavel por todas variaveis de tema disponivel.
export interface ThemeInterface {
  bgColor: string;
  primaryColor: string;
  primaryDarkColor: string;
  secondaryColor: string;
  secondaryDarkColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
}

export type ThemeType = 'Dark' | 'Light';

interface ThemeGeneralInterface {
  Dark: DefaultTheme;
  Light?: DefaultTheme;
  default: ThemeType;
}

const Theme: ThemeGeneralInterface = {
  Dark,
  Light,
  default: 'Dark',
};

export default Theme;
