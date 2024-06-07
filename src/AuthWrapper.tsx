import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AuthWrapperProps } from './Type/Auth';
import { useNavigate } from 'react-router-dom';
import LogIn from './Component/Auth/Login/login';

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('UUID');

    if (token) {
      setAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated ? <>{children}</> : <LogIn />;
}

export default AuthWrapper;
