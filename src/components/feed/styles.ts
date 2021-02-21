/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { shade, lighten } from 'polished';
import { Button, Menu } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  float: left;
  width: 640px;
`;

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:flex-start;
  width: 640px;
  margin-bottom: 24px;
  padding-top:10px;
  &:not(:last-child) {
    // mudar pro primeiro child
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-color: hsla(0, 0%, 100%, 0.2);
  }
`;

export const PostContainer = styled.div`
  width: 500px;
  position: relative;
  margin-bottom: 8px;

  video,
  img {
    width: 100%;
    min-height: 280.435px;
    max-height:500px;
  }
`;

export const PostHeader = styled.div`
  h1 {
    transition: color 0.3 ease-in-out;
    color: ${({ theme }) => theme.primaryTextColor};
    text-transform: capitalize;
    :hover {
      color: #09f;
    }
  }
`;

export const PostMeta = styled.div`
  margin-top: 2.5px;
  a {
    transition: color ease-in-out 0.3;
    color: ${({ theme }) => shade(0.2, theme.primaryTextColor)};
    &:hover {
      color: ${({ theme }) => shade(0.6, theme.primaryTextColor)};
    }
  }
`;

export const PostInteractions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  width:500px;
  section {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
  }
`;

export const InteractionButton = styled(Button)`
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 44px;
  height: 34px;
  display: block;
  position: relative;
  background-color: transparent !important;
  outline: 0 !important;
  color: ${({ theme }) => theme.primaryTextColor};
  margin: 0 4px;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.primaryTextColor};
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
//  && next export