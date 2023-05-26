import { Box, Button, Container, Title } from '@mantine/core';
import { useState } from 'react';
import AdminOrderTable from '../components/AdminOrderTable';
import AdminProductManagement from '../components/AdminProductManagement';
import { AdminUserControl } from '../components/AdminUserControl';
import MyOrders from '../components/MyOrders';

function Admin() {
  const [selectedComponent, setSelectedComponent] = useState('');
  return (
    <Container
      size="xl"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Title>My Page</Title>
      <Box>
        <Button
          onClick={() => setSelectedComponent('component1')}
          sx={{ backgroundColor: 'black', color: 'white', margin: '1rem' }}
        >
          Product Management
        </Button>
        <Button
          onClick={() => setSelectedComponent('component2')}
          sx={{ backgroundColor: 'black', color: 'white', margin: '1rem' }}
        >
          Order Management
        </Button>
        <Button
          onClick={() => setSelectedComponent('component3')}
          sx={{ backgroundColor: 'black', color: 'white', margin: '1rem' }}
        >
          User Management
        </Button>
        <Button
          onClick={() => setSelectedComponent('component4')}
          sx={{ backgroundColor: 'black', color: 'white', margin: '1rem' }}
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
