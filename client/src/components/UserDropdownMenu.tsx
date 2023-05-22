import { Button, Menu, Text } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconLogin,
  IconLogout,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UseUserContext';

function UserDropdownMenu() {
  const { logout, user } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      console.log('User has been signed out :)');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs" variant="subtle" radius="xl">
          <IconUserCircle size="1.8rem" stroke="1.3" />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {isLoggedIn ? (
          <>
            <Menu.Item>
              <Text>Signed in as</Text>
              <Text fw={700}>{user?.email}</Text>
            </Menu.Item>
            <Menu.Item icon={<IconUser size={14} />}>My account</Menu.Item>
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
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
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserDropdownMenu;
