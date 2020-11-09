import styled from 'styled-components';

export const Container = styled.div`
  width: 460px;
  height: 588px;
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
  }
  h3 {
    text-align: center;
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
  justify-content: center;
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
  margin: auto;
  position: relative;
  label {
    display: block;
    font-weight: 700;
    input {
      font-size: 16px;
      line-height: 20px;
      padding: 9px;
      border-radius: 2px;
      display: block;
      width: 440px;
      border: 1px solid #ddd;
    }
  }
`;
export const DivApp = styled.div`
  justify-content: center !important;
  margin-top: 0;
  padding-top: 24px;
  margin-bottom: 8px;
  display: flex;
  text-align: center;
  a {
    display: block;
    width: 143px;
    height: 42px;
    overflow: hidden;
    text-indent: -999px;
    border-radius: 2px;
    border: 1px solid #000;
  }
  h3 {
    text-align: center;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 20px;
  }
  li {
    float: none;
    display: inline-block;
    margin-right: 10px;
    text-align: center;
    a {
      color: #09f;
      text-decoration: none;
      background: #000;
    }
  }
`;
export const DivBotoes = styled.div`
  border-bottom: 1px solid #eee;
`;
