import React, { useContext } from 'react';
import AuthContext, { AuthContextProps } from '../contexts/AuthContext';

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
