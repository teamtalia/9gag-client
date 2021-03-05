/* eslint-disable prettier/prettier */
import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 115px;
  justify-content: space-between;
  padding: 8px;
  height: auto;

  > section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 5px;
    position: relative;

    header {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 4px 4px 0 0;
      background: ${({ theme }) =>
    theme.name === 'dark' ? '#141414' : '#fff'};
      border: 1px solid
        ${({ theme }) => (theme.name === 'dark' ? '#333' : ' #e5e5e5')};
    }

    footer {
      width: 100%;
      display: flex;
      border-radius: 0 0 4px 4px;
      background: ${({ theme }) => (theme.name === 'dark' ? '#000' : '#fff')};
      border: 1px solid
        ${({ theme }) => (theme.name === 'dark' ? '#333' : ' #e5e5e5')};
      border-top: 0;
      padding: 8px;
      flex-direction: row;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: row;
        > * {
          margin: 0 2.5px;
          outline: 0 !important;
        }
        a {
          color: ${({ theme }) => theme.primaryTextColor};
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;
interface CommentInputProps {
  steps?: number;
}
export const CommentInput = styled.textarea<CommentInputProps>`
  width: 100%;
  height: ${({ steps }) => (steps ? steps * 18 + 72 : 72)}px;
  background: transparent;
  border: 0;
  outline: 0 !important;
  resize: none;
  padding: 6px 8px;
  overflow-y: ${({ steps }) => (steps && steps >= 4 ? 'scroll' : 'hidden')};
`;

export const AttachmentContainer = styled.div`
  height: 62px;
  width: 100%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  figure {
    width: 50px;
    height: 50px;
    margin: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    border: 1px solid
      ${({ theme }) => (theme.name === 'dark' ? '#333' : '#e5e5e5')};
    img {
      width: 50px;
      height: 50px;
    }
    a span {
      display: flex !important;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -5px;
      right: -5px;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      color: #333;
      cursor: pointer;
    }
  }
`;

export const FooterButton = styled(Button)`
  background-color: transparent !important;
  border: 0;
  svg {
    fill: rgb(153, 153, 153);
  }
`;
