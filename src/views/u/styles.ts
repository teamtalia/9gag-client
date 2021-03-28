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
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  img {
    width: 80px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-right: 16px;
    flex-shrink: 0;
    border-radius: 50%;
  }
`;
