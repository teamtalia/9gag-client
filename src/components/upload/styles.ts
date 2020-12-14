/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 0 20px;
  flex-direction: column;
  h3 {
    color: ${({ theme }) => theme.primaryTextColor};
    font-size: 24px;
  }
  span {
    font-size: 12px;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  section {
    margin: 0;
    width: 32%;
    align-items: center;
    justify-content: center;
  }
`;

interface UploadSectionProps {
  disableHover?: boolean;
}
export const UploadSection = styled.section<UploadSectionProps>`
  padding:${({ disableHover }) => disableHover ? '0' : '10px 20px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disableHover ? 'normal' : 'pointer')};
  transition: background-color 0.1s ease-in-out;
  border: 1px solid
    ${({ theme }) => (theme.name === 'dark' ? 'hsla(0,0%,100%,.2)' : '#ddd')};
  margin: 10px;
  &:nth-of-type(1) {
    margin-left: 0;
    margin-right: 0;
  }
  &:hover {
    background: ${({ disableHover }) =>
    disableHover ? 'transparent' : 'rgba(0, 0, 0, 0.13)'};
  }
  span {
    margin: 2.5px 0;
    width: 100%;
    text-align: center;
  }
  .ant-upload.ant-upload-drag {
    display: flex !important;
    background-color: transparent;
    flex: 1;
    width: 100%;
    border: 0;
  }
  .ant-upload-text {
    margin-bottom: 10px !important;
  }
  svg,
  .ant-upload-text {
    color: ${({ theme }) => theme.primaryTextColor} !important;
  }
`;

export const PostSection = styled.div`
  display: flex;
  width: 100%;
  justify-content:space-between;
  align-items:center;
  padding: 8px 10px;
  position:relative;
  border:1px solid transparent;
  border-top-color: ${({ theme }) =>
    (theme.name === 'dark' ? 'hsla(0,0%,100%,.2)' : '#ddd')};
  border-bottom-color: ${({ theme }) =>
    (theme.name === 'dark' ? 'hsla(0,0%,100%,.2)' : '#ddd')};
  

  > span {
    text-align:start;
    width: auto;
    flex-shrink: 0;
    padding: 0 8px;
  }
  > input[type^="text"] {
    outline: 0 !important;
    border:0;
    width: 100%;
    background-color:transparent;
    &::placeholder{
      color:#999;
    }
  }


  figure {
    width: 96px;
    height: 96px;
    margin: 0;
    margin-right: 5px;
    img{
      width: 96px;
      height: 96px;
    }
  }
  > div {
    display: flex;
    flex: 1;
    height:96px;
    flex-direction: column;
    justify-content: space-between;
    textarea {
      flex: 1;
      background-color: transparent;
      border: 0;
      resize: none;
      outline: none !important;
      font-weight: 14px;
      &::placeholder {
        color: #999;
      }
    }
    span {
      text-align: end;
      /* color: #999; */
    }
  }
`;
