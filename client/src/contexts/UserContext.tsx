import { createContext, useEffect, useState } from 'react';

export interface User {
  email: string;
  _id: string;
}

interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<string>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  login: () => {
    return new Promise((_, reject) => {
      reject(new Error('Login function not implemented'));
    });
  },
  logout: () => Promise.resolve(),
  register: async () => '',
});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/auth`);
        if (response.ok) {
          const userResponse = await response.json();
          setUser({ _id: userResponse._id, email: userResponse.email });
        } else if (response.status === 401) {
          setUser(null);
        } else {
          throw new Error('Failed to fetch user information');
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const RegisterUser = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        return errorMessage;
      }
      const user = await response.json();
      setUser({ _id: user._id, email: user.email });
      return '';
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Failed to register user');
      } else {
        throw new Error('Failed to register user');
      }
    }
  };

  // LogInUser
  const LogInUser = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Failed to log in user');
      }
      const user = await response.json();
      setUser({ _id: user._id, email: user.email });
      return { _id: user._id, email: user.email }; // Return only necessary info
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Failed to log in user');
      } else {
        throw new Error('Failed to log in user');
      }
    }
  };

  const LogoutUser = async () => {
    try {
      await sendLogoutRequest();
      setUser(null);
      console.log('User has been signed out');
    } catch (error) {
      console.error('Failed to log out user:', error);
    }
  };

  // Ensure sendLogoutRequest returns a Promise as well
  const sendLogoutRequest = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to log out user');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Failed to log out user');
      } else {
        throw new Error('Failed to log out user');
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        register: RegisterUser,
        login: LogInUser,
        logout: LogoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
