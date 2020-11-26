/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryTextColor};
  display: flex;
  flex: 1;
  section[data-bottom="no"]{
    margin-bottom:0;
    border-bottom:0;
    padding-bottom:0;
  }
  section {
    border-bottom: 1px solid rgba(0,0,0,.13);
    padding-bottom:10px;
    margin-bottom:10px;
  }
  h2, h3, h1, label {
    color: ${({ theme }) => theme.primaryTextColor};
  }
  p {
    margin-bottom: 0.5em;
    color: #999;
    a { 
      margin-left: 2.5px;
    }
  }
  & > div > span {
    margin-bottom: 20px;
    line-height: 1.6em;
    color: #999;
    font-size: 12px;
    font-weight: 400;
    b {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      margin-right: 3px;
    }
  }
  & > div {
    width: 100%;
  }
  label {
    display:flex;
    width: 100%;
    flex-direction:column;
    margin-top:6px;

    input {
      width: 100%;
      font-size: 16px;
      line-height: 20px;
      padding: 9px;
      border-radius: 2px;
      display: block;
      border: 1px solid
        ${({ theme }) =>
    theme.name === 'dark' ? 'hsla(0,0%,100%,.2)' : '#ddd'};
      outline: none;
      background-color: transparent;
      color: ${({ theme }) => theme.primaryTextColor};
      margin-top:4px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  button[data-mode="fb"] {
      background-color:#4367b0 !important;
  }
  button[data-mode="black"] {
    background-color:#000 !important;
    div {
      flex-direction:column;
      span:nth-of-type(2) {
        font-size:18px;
      }
      span:nth-of-type(1) {
        font-size:12px;
      }
    }
    
  }
  button {
    flex: 1;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    background-color: #2d72d9;
    color: #fff;
    padding: 8px 15px;
    border-radius: 2px;
    align-items: center;
    justify-content: space-evenly;
    border: 0px;
    margin: 0 5px;
    outline: none;
    transition: all ease-in-out 0.3s;
    height:48px;
    cursor: pointer;
    div {
      display:flex;
      align-items:center;
      justify-content:center;
      height:100%;
      width:100%;
    }
    &:hover {
      opacity: 0.8;
    }
    svg[type="google"] {
      background-color: white;
      border-radius:2px;
      padding:2px;
    }
  }
`;

export const ButtonsAppsContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`;
