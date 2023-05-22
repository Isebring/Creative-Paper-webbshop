import { Button, Menu, Text } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconLogout,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';

function UserDropdownMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs" variant="subtle" radius="xl">
          <IconUserCircle size="1.8rem" stroke="1.3" />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconUser size={14} />}>My account</Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />}>Sign out</Menu.Item>
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
