import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

interface Props {
  children: ReactNode;
}

// Function for protected route for admin
function Protected({ children }: Props) {
  const { user, isLoading } = useContext(UserContext); // get user from UserContext

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && user.isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
}

export default Protected;
