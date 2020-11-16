import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Container, MeuSpan } from './styles';

// import { Container } from './styles';

const Button: React.FC = () => {
  return (
    <Container>
      <MeuSpan>
        Meu botao
        <a href="http://teste">alo</a>
      </MeuSpan>
      <FaHome />
    </Container>
  );
};

export default Button;
