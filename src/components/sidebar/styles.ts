/* eslint-disable prettier/prettier */
import { Menu } from 'antd';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 192px;
  height: calc(100% - 48px);
  position: fixed;
  z-index: 1;
  overflow: hidden;
  overscroll-behavior: contain;
  padding-top: 48px;
  header h3 {
    color: ${({ theme }) => shade(0.2, theme.primaryTextColor)};
  }

  ul {
    list-style: none;
    li{
      position: relative;
    }
    li a:not(.more) {
      font-size: 14px;
      height: 36px;
      line-height: 20px;
      box-sizing: border-box;
      display: flex;
      align-items:center;
      justify-content:flex-start;

      position: relative;
      border-radius: 2px;
      transition: background-color 0.15s, padding-right 0.15s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 8px;
      color: ${({ theme }) => theme.primaryTextColor};
      &  *:not(:last-child) {
        margin-right:10px;
      }
      &.selected {
        font-weight: 700;
      }
      &.selected,
      &:hover {
        background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'hsla(0, 0%, 100%, 0.2)' : 'rgba(0,0,0,.05)'};
      }
    }
    li a.more{
      position: absolute;
      width: 36px;
      height: 36px;
      display: flex;
      justify-content:center;
      align-items:center;
      right: 0;
      top: 0;
      opacity: 1;
      text-align:center;
      transition: opacity .15s;
      font-weight:700;
      color: ${({ theme }) => theme.primaryTextColor} !important;
    }
  }
`;

export const DropdownMenu = styled(Menu)`
 background-color: ${({ theme }) =>
    theme.name === 'dark' ? shade(0.2, theme.primaryColor) : 'white'};
  border-color: transparent;

`;

export const DropdownMenuItem = styled(Menu.Item)`
  a,
  a:hover ,
  &{
    color: ${({ theme }) => theme.primaryTextColor};
  }
  &:hover,
  &:focus,
  &.ant-menu-item-selected {
    background-color: ${({ theme }) =>
    shade(0.08, theme.primaryColor)} !important;
  }
`;
