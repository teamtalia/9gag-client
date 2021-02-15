import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { Container } from './styles';

const FullLoading: React.FC = () => {
  return (
    <Container>
      <img
        src="/images/talia-icon-white.png"
        alt="Talia Logo"
        width={200}
        height={200}
      />
      <AiOutlineLoading className="spin" style={{ margin: 20 }} size={48} />
    </Container>
  );
};

export default FullLoading;
