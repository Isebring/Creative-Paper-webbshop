import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const useRequireAdmin = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/404');
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  return isLoading;
};

export default useRequireAdmin;
