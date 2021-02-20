/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// import '../assets/styles/globals.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { Html } from 'next/document';
import AppContext from '../contexts/AppContext';
import useTheme from '../hooks/useTheme';
import { GlobalStyle, PreGlobalStyle } from '../themes/GlobalStyle';
import 'antd/dist/antd.css';
import { AuthContextProvider } from '../contexts/AuthContext';

const MyApp = ({ Component, pageProps }) => {
  const { theme, setTheme } = useTheme();
  const ThemeSelector = (dark, light) => (theme.name === 'dark' ? dark : light);
  const [title, setTitle] = useState<string>('Θαλία - Go Fun The World');

  return (
    <>
      <PreGlobalStyle />
      <AuthContextProvider>
        <AppContext.Provider
          value={{
            setTheme,
            ThemeSelector,
            title,
            setTitle,
          }}
        >
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Head>
              <title>{title}</title>
              <script type="text/javascript" src="/static/fb.js" />
              <script
                async
                defer
                crossOrigin="anonymous"
                src="https://connect.facebook.net/en_US/sdk.js"
              />
            </Head>
            <Component {...pageProps} />
          </ThemeProvider>
        </AppContext.Provider>
      </AuthContextProvider>
    </>
  );
};

export default MyApp;
