import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 16px;
    width: 100%;
    margin-bottom: 10px;
  }
  img {
    width: 200px;
    height: auto;
  }
  margin: 20px;
`;
