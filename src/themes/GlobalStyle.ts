import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  :root {
    --primary-color: #000;
  }
  body {
    background-color: ${props => props.theme.bgColor};
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;
