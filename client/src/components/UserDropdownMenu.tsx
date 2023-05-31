import { Menu, Text } from '@mantine/core';
import {
  IconLogin,
  IconLogout,
  IconUser,
  IconUserCircle,
  IconUserShield,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UseUserContext';

function UserDropdownMenu() {
  const { logout, user } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!user);
    setIsAdmin(user?.isAdmin === true); // Update the admin state based on user's role
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconUserCircle size="1.8rem" stroke="1.3" cursor="pointer" />
      </Menu.Target>

      <Menu.Dropdown>
        {isLoggedIn ? (
          <>
            <Menu.Item>
              <Text>Signed in as</Text>
              <Text fw={700}>{user?.email}</Text>
            </Menu.Item>
            <Menu.Divider />
            {isAdmin ? ( // Render "Admin" menu item if isAdmin is true
              <>
                <Menu.Item
                  icon={<IconUserShield size={14} />}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/admin');
                  }}
                >
                  Admin
                </Menu.Item>
              </>
            ) : null}
            <Menu.Item
              icon={<IconUser size={14} />}
              onClick={() => navigate('/my-account')}
            >
              My account
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<IconLogout size={14} />} onClick={handleLogout}>
              Sign out
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              icon={<IconLogin size={14} />}
              onClick={() => navigate('/signin')}
            >
              Sign in
            </Menu.Item>
            <Menu.Item
              icon={<IconUser size={14} />}
              onClick={() => navigate('/createaccount')}
            >
              Create an account
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserDropdownMenu;
