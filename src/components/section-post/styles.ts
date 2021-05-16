/* eslint-disable prettier/prettier */
import { Button, Menu } from 'antd';
import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  float: left;
  width: 640px;
  min-height: 100px;
  margin-bottom: 100px;
`;

export const Header = styled.header`
  width: 640px;
  height: 80px;
  display: flex;
  flex-direction: column;
  h1 {
    color: ${props => props.theme.primaryTextColor} !important;
    text-transform: capitalize;
    margin-bottom: 8px;
  }
  p {
    a {
      color: ${({ theme }) => shade(0.2, theme.primaryTextColor)} !important;
    }
  }
`;

export const PostContainer = styled.div`
  width: 600px;
  position: relative;
  margin-bottom: 8px;

  video,
  img {
    width: 100%;
    min-height: 280.435px;
    max-height: 500px;
  }
`;

export const PostInteractions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  width: 500px;
  margin-bottom: 15px;
  section {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    > *:not(:first-child) {
      margin: 0 5px;
    }
    > *:is(:first-child) {
      margin: 0;
      margin-right: 5px;
    }
  }
`;
interface InteractionButtonProps {
  active?: boolean;
};

export const InteractionButton = styled(Button) <InteractionButtonProps>`
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 44px;
  height: 34px;
  display: block;
  position: relative;
  background-color: transparent !important;
  outline: 0 !important;
  color: ${({ theme, active }) => active ? '#09fc' : theme.primaryTextColor};
  margin: 0 4px;
  &:hover,
  &:focus {
    color: ${({ theme, active }) => active ? '#09fc' : theme.primaryTextColor};
    border-color: ${({ theme }) => shade(0.6, theme.primaryTextColor)};
  }
`;

export const FacebookButton = styled(Button)`
  border: 1px solid #3b5998;
  border-radius: 2px;
  /* width: 44px; */
  height: 34px;
  display: block;
  position: relative;
  background-color: #3b5998;
  color: white;
  font-weight: bold;
  &:hover {
    color: white;
    border-color: #3b5998;
    background-color: ${lighten(0.1, '#3b5998')};
  }
`;

export const MoreActionsContainer = styled(Menu)`
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? shade(0.2, theme.primaryColor) : 'white'};
  border-color: transparent;
`;

export const MoreActionsItem = styled(Menu.Item)`
  a,
  a:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
  &:hover,
  &:focus,
  &.ant-menu-item-selected {
    background-color: ${({ theme }) =>
    shade(0.08, theme.primaryColor)} !important;
  }
`;

export const CommentsHeader = styled.header`
  height: 40px;
  width: 100%;
  margin-top: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid
    ${({ theme }) => (theme.name === 'dark' ? '#333' : '#e5e5e5')};

  section {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;

    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 19px;
      letter-spacing: 0em;
    }
    a {
      display: flex;
      border-bottom: 2px solid transparent;
      padding: 0 12px;
      height: 100%;
      align-items: center;
      color: #999;
      font-weight: bold;

      &.active,
      &:hover {
        color: ${({ theme }) => theme.primaryTextColor};
        border-bottom-color: ${({ theme }) =>
    theme.name === 'dark' ? '#fff' : '#000'};
      }
    }
  }
`;
