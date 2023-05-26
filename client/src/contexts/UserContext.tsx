import { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  email: string;
  password: string;
  _id: string;
  isAdmin: boolean;
}

interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null;
  users: User[] | null;
  setUsers: (users: User[] | null) => void;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<string>;
  getAllUsers: () => Promise<void>;
  updateUserRole: (userId: string, newRole: boolean) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  users: null,
  setUsers: () => {},
  login: () => {
    return new Promise((_, reject) => {
      reject(new Error('Login function not implemented'));
    });
  },
  logout: () => Promise.resolve(),
  register: async () => '',
  getAllUsers: async () => {},
  updateUserRole: async (_userId: string, _newRole: boolean) => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const { user: loggedInUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/auth`);
        if (response.ok) {
          const userResponse = await response.json();
          setUser(userResponse);
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
      setUser(user);
      return '';
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Failed to register user');
      } else {
        throw new Error('Failed to register user');
      }
    }
  };

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
      setUser(user);
      return user;
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

  const getAllUsers = async () => {
    const response = await fetch('/api/users');
    if (response.ok) {
      const data = await response.json();
      console.log('fetched users:', data);
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
        const updatedUser = await response.json();

        if (users) {
          const updatedUsers = users.map((user) => {
            if (user._id === userId) {
              if (user._id === loggedInUser?._id) {
                setUser({ ...user, isAdmin: newRole });
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
