import React from 'react';
import { GlobalStyle } from '../themes/GlobalStyle';
import Login from '../components/login';
import Button from '../components/button';
// import Head from 'next/head';
// import styles from '../assets/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <div>Ola mundo</div>
      <GlobalStyle />
      <Button />
      {/* <Login /> */}
    </>
  );
}
