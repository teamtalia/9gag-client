import React from 'react';
import { GlobalStyle } from '../themes/GlobalStyle';
import Login from '../components/login';
// import Head from 'next/head';
// import styles from '../assets/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Login />
    </>
  );
}
