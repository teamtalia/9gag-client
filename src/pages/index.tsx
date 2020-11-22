import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import useTheme, { UseThemeResponse } from '../hooks/useTheme';
import { GlobalStyle } from '../themes/GlobalStyle';
import Button from '../components/button';
// import Login from '../components/login';
import Upload from '../components/upload';


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
        <Upload />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default Home;
