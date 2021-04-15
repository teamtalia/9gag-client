import { createContext } from 'react';
import { UseThemeResponse } from '../hooks/useTheme';

interface AppContextInterface extends Omit<UseThemeResponse, 'theme'> {
  foo?: string;
  ThemeSelector: CallableFunction;
  title: string;
  setTitle: any;
  feedOrder: any;
  setFeedOrder: any;
  feedRevalidate: any;
  setFeedRevalidate: any;
}

const AppContext = createContext<AppContextInterface>(
  ({} as unknown) as AppContextInterface,
);

export default AppContext;
