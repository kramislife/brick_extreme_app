import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLazyLogoutUserQuery } from '../../redux/api/authApi';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [logout] = useLazyLogoutUserQuery();
  
  // Fetch user data
  useGetMeQuery();

  const handleLogout = async () => {
    navigate('/');
    const result = await logout();
    if (result.isSuccess) {
      navigate(0);
    }
  };

  return { user, handleLogout };
};