import { useRouter } from 'next/router';
import React from 'react';
import UserView from '../../views/u';

// import { Container } from './styles';

const User: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  return <UserView username="username" />;
};

export default User;
