import { Box, Button, Container, Title, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import AdminOrderTable from '../components/AdminOrderTable';
import AdminProductManagement from '../components/AdminProductManagement';
import { AdminUserControl } from '../components/AdminUserControl';
import MyOrders from '../components/MyOrders';

function Admin() {
  const theme = useMantineTheme();
  const [selectedComponent, setSelectedComponent] = useState('');
  return (
    <Container
      size="xl"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Title>My Account</Title>
      <Box>
        <Button
          onClick={() => setSelectedComponent('component1')}
          sx={{
            backgroundColor:
              selectedComponent === 'component1'
                ? theme.colors.violet[2]
                : 'black',
            color: 'white',
            margin: '1rem',
          }}
        >
          Product Management
        </Button>
        <Button
          onClick={() => setSelectedComponent('component2')}
          sx={{
            backgroundColor:
              selectedComponent === 'component2'
                ? theme.colors.violet[2]
                : 'black',
            color: 'white',
            margin: '1rem',
          }}
        >
          Order Management
        </Button>
        <Button
          onClick={() => setSelectedComponent('component3')}
          sx={{
            backgroundColor:
              selectedComponent === 'component3'
                ? theme.colors.violet[2]
                : 'black',
            color: 'white',
            margin: '1rem',
          }}
        >
          User Management
        </Button>
        <Button
          onClick={() => setSelectedComponent('component4')}
          sx={{
            backgroundColor:
              selectedComponent === 'component4'
                ? theme.colors.violet[2]
                : 'black',
            color: 'white',
            margin: '1rem',
          }}
        >
          My Orders
        </Button>
      </Box>

      {selectedComponent === 'component1' && <AdminProductManagement />}
      {selectedComponent === 'component2' && <AdminOrderTable />}
      {selectedComponent === 'component3' && <AdminUserControl />}
      {selectedComponent === 'component4' && <MyOrders />}
    </Container>
  );
}

export default Admin;
