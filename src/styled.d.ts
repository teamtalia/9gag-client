/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { ThemeInterface } from './themes';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface { }
}
