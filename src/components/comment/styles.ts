/* eslint-disable prettier/prettier */
import { Menu } from 'antd';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  width: 100%;
  min-height: 125px;
  position: relative;
  flex-direction: column;
  padding: 8px;
  height: auto;
`;

export const CommentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 8px;
  /* justify-content: space-between; */
  &:hover {
    background-color: ${({ theme }) => (theme.isDark ? '#1a1a1a' : '#f7f7f7')};
  }
`;

export const CommentAvatar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 5px;
  position: relative;
`;

export const CommentContainer = styled(CommentAvatar)`
  padding: 2px;
  header {
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    margin-bottom: 2px;
    a {
      color: ${({ theme }) => theme.primaryTextColor};
      text-transform: capitalize;

      &:is(:first-child) {
        margin-right: 5px;
        font-weight: 700;
        &:hover {
          text-decoration: underline;
        }
      }
      &:not(:first-child) {
        color: #999;
      }
    }
  }
  section {
    display: block;
    div {
      display: flex;
      width: 100%;
      word-break: break-word;
      overflow-wrap: break-word;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 4px;
    }
    video,
    img {
      max-width: 100%;
      max-height: 400px;
      width: auto;
      display: block;
    }
  }
`;
export const CommentFooter = styled.footer`
  display: flex;
  align-items: center;
  height: 32px;
  margin-top: 3px;
  a {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    padding: 6px 8px 6px 0px;
    margin-right: 3px;
    color: ${({ theme }) => (theme.isDark ? 'gray' : '#999')};
    &:hover {
      color: ${({ theme }) => (theme.isDark ? '#bbb' : '#555')};
    }
  }
`;

export const HideReplies = styled.div`
  /* margin-left: 48px; */
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  color: #0b6cda;
  &:hover {
    cursor: pointer;
    span {
      text-decoration: underline;
    }
  }
  span {
    margin-left: 10px;
  }
`;

export const RepliesContainer = styled.section`
  padding-left: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
`;

export const DropdownMenu = styled(Menu)`
  background-color: ${({ theme }) =>
    theme.isDark ? shade(0.2, theme.primaryColor) : 'white'};
  border-color: transparent;
`;

export const DropdownMenuItem = styled(Menu.Item)`
  a,
  a:hover,
  & {
    color: ${({ theme }) => theme.primaryTextColor};
  }
  &:hover,
  &:focus,
  &.ant-menu-item-selected {
    background-color: ${({ theme }) =>
    shade(0.08, theme.primaryColor)} !important;
  }
`;
