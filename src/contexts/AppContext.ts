import { createContext } from 'react';
import { UseThemeResponse } from '../hooks/useTheme';

interface AppContextInterface extends Omit<UseThemeResponse, 'theme'> {
  foo?: string;
  ThemeSelector: CallableFunction;
  title: string;
  setTitle: any;
}

const AppContext = createContext<AppContextInterface>({
  setTheme: null,
  ThemeSelector: null,
  title: null,
  setTitle: null,
});

export default AppContext;
