/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Input as AntdInput, Select as AntdSelect, DatePicker as AntdDatePicker } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 8px;
`;

export const MenuContainer = styled.nav`
  width: 192px;
  position: fixed;

  ul {
    width: 100%;
    list-style: none;
    li {
      width: 100%;
      padding: 6px 10px;
      font-weight: 500;
      cursor: pointer;
      transition: color ease-in-out 0.2s;
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
      }

      &:hover,
      &.selected {
        background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0,0,0,.05)'};
      }

      &.selected {
        font-weight: bold;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 224px;
  form > span, input {
    color: ${({ theme }) => theme.primaryTextColor} ;
  }
  h2 {
    color: ${({ theme }) => theme.primaryTextColor};
    font-size: 24px;
    line-height: normal;
  }

  label {
    color: ${({ theme }) => theme.primaryTextColor} !important;
    font-weight: bold;
    margin: 0;
    margin-bottom: 2.5px;
  }
  .ant-form-item {
    margin-bottom: 2.5px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    a {
      color: #09f !important;
      font-weight: bold;
      line-height: 36px;
    }
  }
`;

export const Input = styled(AntdInput)`
  background-color: transparent;
  line-height: 20px;
  padding: 9px;
  border-radius: 2px;
  display: block;
  color: ${({ theme }) => theme.primaryTextColor} !important;
  border-color: ${({ theme }) => theme.isDark ? 'hsla(0, 0%, 100%, 0.2)' : '#ddd'};

  &:disabled {
    background: rgba(255, 255, 255, 0.13);
  }
`;

export const TextArea = styled(AntdInput.TextArea)`
  height: 80px !important;
  border-color: ${({ theme }) => theme.isDark ? 'hsla(0, 0%, 100%, 0.2)' : '#ddd'} !important;
  line-height: 20px;
  padding: 9px;
  background-color: transparent;
  color: ${({ theme }) => theme.primaryTextColor};
`;
export const DatePicker = styled(AntdDatePicker)`
  border-color: ${({ theme }) => theme.isDark ? 'hsla(0, 0%, 100%, 0.2)' : '#ddd'} !important;
  line-height: 20px;
  padding: 9px;
  background-color: transparent;
  color: ${({ theme }) => theme.primaryTextColor};
  width: 100%;
`;

export const Select = styled(AntdSelect)`
  border-color: ${({ theme }) => (theme.isDark ? '#999' : '#e5e5e5')};
  &,
  * {
    background-color: ${({ theme }) =>
    theme.isDark ? 'white' : '#e5e5e5'} !important;
    color: #000 !important;
  }
`;

export const Option = styled(AntdSelect.Option)`
  color: #000 !important;
`;

export const AvatarSection = styled.section`
  display:flex;
  width: 100%;
  margin-bottom:25px;
  flex-direction:column;
  > div {
    margin-top:10px;
    display:flex;
    width: 100%;
    align-items:center;
    justify-content:space-between;
    > div {
      flex:1;
      display:flex;
      flex-direction:column;
      align-items:center;

      p {
        padding: 15px 20px;
        display:block;
        color: ${({ theme }) => theme.primaryTextColor};
      }
    }
  }

`;