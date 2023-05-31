import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

interface ProtectedProps {
  children: ReactNode;
}

// Function for protected route for admin
function Protected({ children }: ProtectedProps) {
  const { user } = useContext(UserContext); // get user from UserContext

  if (user && user.isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
}

export default Protected;
