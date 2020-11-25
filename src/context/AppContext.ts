import { createContext } from 'react';
import { UseThemeResponse } from '../hooks/useTheme';

interface AppContextInterface extends Omit<UseThemeResponse, 'theme'> {
  foo?: string;
  ThemeSelector: CallableFunction;
}

const AppContext = createContext<AppContextInterface>({
  setTheme: null,
  ThemeSelector: null,
});

export default AppContext;
