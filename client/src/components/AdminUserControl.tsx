import {
  Box,
  Button,
  Container,
  Flex,
  MediaQuery,
  Paper,
  Title,
} from '@mantine/core';
import { useEffect } from 'react';
import { useUserContext } from '../contexts/UseUserContext';
import { User } from '../contexts/UserContext';

export function AdminUserControl() {
  const { users, updateUserRole, getAllUsers } = useUserContext();

  const handleMakeAdmin = async (userId: string, isAdmin: boolean) => {
    await updateUserRole(userId, isAdmin);
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container size="xl" sx={{ paddingLeft: '0', paddingRight: '0' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '0',
          paddingRight: '0',
        }}
      >
        <Title mt="1.5rem">User management</Title>
        {users &&
          users.map((user: User) => (
            <MediaQuery
              key={user._id}
              query="(max-width: 500px)"
              styles={{ width: '18rem' }}
            >
              <Paper shadow="sm" p="md" m="sm" sx={{ width: '30rem' }}>
                <Flex
                  justify="space-between"
                  align="center"
                  sx={{
                    '@media (max-width: 600px)': {
                      flexDirection: 'column',
                      gap: '1rem',
                    },
                  }}
                >
                  {user.email}
                  <Button
                    variant="outline"
                    onClick={() => handleMakeAdmin(user._id, !user.isAdmin)}
                    color={user.isAdmin ? 'red' : 'green'}
                  >
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </Button>
                </Flex>
              </Paper>
            </MediaQuery>
          ))}
      </Box>
    </Container>
  );
}
