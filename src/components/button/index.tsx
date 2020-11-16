import React from 'react';
import { Container } from './styles';

interface ButtonProps {
  onClick: VoidFunction;
  children: any;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default Button;
