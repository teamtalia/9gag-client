import styled, { createGlobalStyle } from 'styled-components';

export const SetupNav = createGlobalStyle`
  body, html {
    padding-top: 48px;
  }
`;

export const Container = styled.nav`
  width: 100vw;
  padding: 0 80px;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  height: 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  font-weight: bold;
  ul {
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    list-style: none;
    padding: 0 !important;
    margin: 0;
  }
  h1 {
    margin-right: 12px;
    color: white;
    margin-bottom: 0;
  }
`;

interface NavOptionProps {
  notify?: boolean;
  onlyIcon?: boolean;
  gray?: boolean;
}

export const NavOption = styled.li<NavOptionProps>`
  padding: 0 12px;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all ease-in-out 0.3s;
  font-size: 14px;
  position: relative;
  color: ${({ gray }) => (gray ? '#bbb' : 'white')};
  &:hover {
    opacity: ${({ gray }) => (gray ? 1 : 0.7)};

    &,
    svg {
      color: ${({ gray }) => (gray ? 'white' : '#bbb')};
    }
  }
  svg {
    margin-right: ${({ onlyIcon }) => (onlyIcon ? '0px' : '10px')};
    color: ${({ gray }) => (gray ? '#bbb' : 'white')};
  }

  span {
    margin-right: 10px;
  }
  span > svg {
    margin: 0px;
  }
  &::after {
    height: 4px;
    width: 4px;
    border-radius: 2px;
    background: green;
    position: absolute;
    right: 0;
    top: -2px;
    content: '';
    display: ${({ notify }) => (notify ? 'block' : 'none')};
  }
`;

export const NavRightContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
