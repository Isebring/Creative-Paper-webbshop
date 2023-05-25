import { Box, Button, Container, Flex, Group, MediaQuery, Paper, Title } from "@mantine/core";
import { useEffect } from "react";
import { useUser } from '../contexts/UserContext';

export function AdminUserControl() {
    const { users, updateUserRole, getAllUsers } = useUser();

    const handleMakeAdmin = async (userId: string, isAdmin: boolean) => {
        await updateUserRole(userId, isAdmin);
      };

      const sortedUsers = users?.sort((a, b) => {
        return a.email.localeCompare(b.email);
      });

    useEffect(() => {
        console.log('Calling getAllUsers...');
        getAllUsers();
      }, [getAllUsers]);
      
    return(
        <Container size="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title>User management</Title>
        {sortedUsers &&
          sortedUsers.map((user) => (
            <MediaQuery
              key={user._id}
              query="(max-width: 500px)"
              styles={{ width: '20rem' }}
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
                 
                  <Group>
                    <Button
                      variant="outline"
                      onClick={() => handleMakeAdmin(user._id, !user.isAdmin)}
                      color={user.isAdmin ? 'red' : 'green'}
                    >
                      {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </Button>
                  </Group>
                </Flex>
              </Paper>
            </MediaQuery>
          ))}
      </Box>
    </Container>
    )
}