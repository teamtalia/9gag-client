import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import UserSchema from '../../schemas/user';
import api from '../../services/api';
import UserView from '../../views/u';

// import { Container } from './styles';

const User: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data: user, error } = useFetch<UserSchema>(
    username ? `/users/${username}` : null,
    api,
    {},
  );
  if (!user) {
    return <div />; // loading
  }
  if (error) {
    return <div />; // 404
  }
  return <UserView user={user} />;
};

export default User;
