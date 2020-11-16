import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import useTheme, { UseThemeResponse } from '../hooks/useTheme';
import { GlobalStyle } from '../themes/GlobalStyle';
import Button from '../components/button';

interface AppContextInterface extends Omit<UseThemeResponse, 'theme'> {
  foo?: string;
}

export const AppContext = createContext<AppContextInterface>({
  setTheme: null,
});

const Home: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <AppContext.Provider
      value={{
        setTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <div>Ola mundo</div>
        <GlobalStyle />
        <Button onClick={() => setTheme('Dark')}>Dark Mode</Button>
        <Button onClick={() => setTheme('Light')}>Light Mode</Button>
      </ThemeProvider>
      {/* <Login /> */}
    </AppContext.Provider>
  );
};

export default Home;
