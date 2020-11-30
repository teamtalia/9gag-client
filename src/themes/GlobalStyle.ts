import { createGlobalStyle } from 'styled-components';

export const PreGlobalStyle = createGlobalStyle`
  body {
    background-color: #000;
  }


  .spin {
    animation:spin 0.5s linear infinite;
  }

  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

`;
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Bebas Neue', cursive;
  }
  :root {
    --primary-color: #000;
  }
  body {
    background-color: ${props => props.theme.bgColor};
    color: ${({ theme }) => theme.primaryTextColor};
  }

`;
