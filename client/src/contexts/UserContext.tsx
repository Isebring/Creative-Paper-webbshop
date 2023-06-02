import { createContext, useEffect, useState } from 'react';
import { useUserContext } from './UseUserContext';

export interface User {
  email: string;
  _id: string;
  isAdmin?: boolean;
}

interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null;
  isLoading: boolean;
  users: User[] | null;
  setUsers: (users: User[] | null) => void;
  login: (
    email: string,
    password: string,
  ) => Promise<{ _id: string; email: string }>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<string>;
  getAllUsers: () => Promise<void>;
  updateUserRole: (userId: string, newRole: boolean) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  isLoading: true,
  users: null,
  setUsers: () => {
    throw new Error('setUsers function not implemented');
  },
  login: () => {
    return new Promise((_, reject) => {
      reject(new Error('Login function not implemented'));
    });
  },
  logout: () => Promise.resolve(),
  register: async () => {
    throw new Error('register function not implemented');
  },
  getAllUsers: async () => {
    throw new Error('getAllUsers function not implemented');
  },
  updateUserRole: async () => {
    throw new Error('updateUserRole function not implemented');
  },
});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user: loggedInUser } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/users/auth`);
        if (response.ok) {
          const userResponse = await response.json();
          setUser({
            _id: userResponse._id,
            email: userResponse.email,
            isAdmin: userResponse.isAdmin || false,
          });
        } else if (response.status === 401) {
          setUser(null);
        } else {
          throw new Error('Failed to fetch user information');
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setIsLoading(false);
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
      setUser({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin || false,
      });
      return {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin || false,
      };
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

  const getAllUsers = async () => {
    const response = await fetch('/api/users');
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      throw new Error('Error fetching users');
    }
  };

  const updateUserRole = async (userId: string, newRole: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdmin: newRole }),
      });

      if (response.ok) {
        if (users) {
          const updatedUsers = users.map((user) => {
            if (user._id === userId) {
              if (user._id === loggedInUser?._id) {
                setUser((currentUser) =>
                  currentUser ? { ...currentUser, isAdmin: newRole } : null,
                );
              }

              return { ...user, isAdmin: newRole };
            } else {
              return user;
            }
          });
          setUsers(updatedUsers);
        }
      }
    } catch (error) {
      // Handle the error here
      console.error('Error updating user role:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        users,
        register: RegisterUser,
        login: LogInUser,
        logout: LogoutUser,
        updateUserRole,
        getAllUsers,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
