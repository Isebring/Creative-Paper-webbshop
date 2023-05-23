import { useContext } from 'react';
import { UserContext } from './UserContext';

export function useUserContext() {
  return useContext(UserContext);
}
