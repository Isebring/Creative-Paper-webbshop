import { useContext } from 'react';
import { UserContext } from './UserContext';

export function useUserContext() {
  return useContext(UserContext);
}

export function useUser() {
  const { user } = useUserContext();
  return user;
}
