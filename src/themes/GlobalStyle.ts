import { createGlobalStyle } from 'styled-components';

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
