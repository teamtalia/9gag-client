/* eslint-disable prettier/prettier */
import { Menu } from 'antd';
import { shade } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  float: left;
  width: 640px;
  min-height: 100px;
  margin-bottom: 100px;
  section {
    color: ${({ theme }) => theme.primaryTextColor};
    margin-bottom: 12 px !important;
  }
`;
export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  figure {
    width: 80px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-right: 16px;
    flex-shrink: 0;
    border-radius: 50%;
    display:flex;
    justify-content:center;
    align-items:center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h2 {
    color: ${({ theme }) => theme.primaryTextColor};
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 0;
  }
  p {
    color: #999;
    margin-bottom: 0;
  }
`;
export const TabBar = styled.div`
  margin-top: 12px;
  box-shadow: inset 0 -1px 0 ${({ theme }) => (theme.isDark ? 'hsla(0, 0%, 100%, 0.2)' : 'rgba(0,0,0,.1)')};
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    fill: ${({ theme }) => theme.primaryTextColor};
    opacity: 0.7;
    transition: all 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
  ul {
    display: flex;
    list-style-type: none !important;
    margin-bottom: 0;
    li {
      cursor: pointer;
      color: #999;
      padding: 8px 16px;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease-in-out;
      &:hover,
      &.active {
        color: ${({ theme }) => theme.primaryTextColor};
      }
      &.active {
        border-bottom-color: ${({ theme }) => theme.primaryTextColor};
      }
    }
  }
`;

export const MoreActionsContainer = styled(Menu)`
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? shade(0.2, theme.primaryColor) : 'white'};
  border-color: transparent;
`;

export const MoreActionsItem = styled(Menu.Item)`
  a,&,
  a:hover {
    color: ${({ theme }) => theme.primaryTextColor}!important;
  }
  &:hover,
  &:focus,
  &.ant-menu-item-selected {
    background-color: ${({ theme }) =>
    shade(0.08, theme.primaryColor)} !important;
  }
`;


export const BlankState = styled.div`
  background-color:  ${({ theme }) => theme.isDark ? 'hsla(0,0%,100%,.1)' : '#f4f4f4'};
  margin: 20px 0;
  height: 300px;
  overflow: hidden;
  border-radius: 2px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  width: 100%;
  h3 {
    font-size: 16px;
    text-align: center;
    font-weight: 400;
    color: #999;
  }

`;
