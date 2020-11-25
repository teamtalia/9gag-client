/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.primaryColor};
  div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 36px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.primaryTextColor};
  }
  h3 {
    text-align: center;
    color: ${({ theme }) => theme.primaryTextColor};
  }
  p {
    margin-bottom: 20px;
    line-height: 1.6em;
    color: #999;
  }
  a {
    margin-bottom: 20px;
    line-height: 1.6em;
    color: #999;
  }
`;
export const Botao = styled.button`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  font-weight: 700;
  background-color: #09f;
  color: #fff;
  width: 200px;
  height: 60px;
  line-height: 28px;
  text-align: center;
  padding: 0px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
  outline: none !important;
`;

export const BotaoFB = styled(Botao)`
  background: #4367b0;
`;

export const BotaoG = styled(Botao)`
  background-color: #4585f1;
`;

export const BotaoLogin = styled(Botao)`
  height: 50px;
  width: 100px;
`;
export const DivInput = styled.div`
  margin: 2px auto;
  position: relative;
  width: 100%;
  label {
    display: flex;
    flex-direction: column;
    font-weight: 700;
    width: 100%;
    color: ${({ theme }) => theme.primaryTextColor} !important;
    input {
      font-size: 16px;
      line-height: 20px;
      padding: 9px;
      border-radius: 2px;
      display: block;
      width: 100%;
      border: 1px solid
        ${({ theme }) =>
    theme.name === 'dark' ? 'hsla(0,0%,100%,.2)' : '#ddd'};
      outline: none;
      background-color: transparent;
      color: ${({ theme }) => theme.primaryTextColor};
    }
  }
`;
export const DivApp = styled.ul`
  justify-content: center !important;
  width: 100%;
  padding: 24px 0;
  display: flex;
  a {
    display: block;
    width: 143px;
    height: 42px;
    overflow: hidden;
    text-indent: -999px;
    border-radius: 2px;
    border: 1px solid #000;
  }
  li {
    float: none;
    display: flex;
    margin-right: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 8px 15px;
    background-color: black;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    svg {
      margin-right: 5px;
    }
    &:hover {
      opacity: 0.7;
    }
  }
`;
export const DivBotoes = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  display: flex;
  align-items: center !important;
  justify-content: space-between !important;
  a {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
`;
