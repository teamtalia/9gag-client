/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// import '../assets/styles/globals.css';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppContext from '../context/AppContext';
import useTheme from '../hooks/useTheme';
import { GlobalStyle } from '../themes/GlobalStyle';
import 'antd/dist/antd.css';

const MyApp = ({ Component, pageProps }) => {
  const { theme, setTheme } = useTheme();
  const ThemeSelector = (dark, light) => (theme.name === 'dark' ? dark : light);

  return (
    <AppContext.Provider
      value={{
        setTheme,
        ThemeSelector,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default MyApp;
