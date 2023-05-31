import { Box, Button, Container, Title, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import AdminOrderTable from '../components/AdminOrderTable';
import AdminProductManagement from '../components/AdminProductManagement';
import { AdminUserControl } from '../components/AdminUserControl';

function Admin() {
  const theme = useMantineTheme();
  const [selectedComponent, setSelectedComponent] = useState('component1');
  return (
    <Container
      size="xl"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Title>Admin</Title>
      <Box>
        <Button
          onClick={() => setSelectedComponent('component1')}
          sx={{
            backgroundColor:
              selectedComponent === 'component1'
                ? theme.colors.violet[0]
                : 'black',
            color: selectedComponent === 'component1' ? '#7950f2' : 'white',
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
                ? theme.colors.violet[0]
                : 'black',
            color: selectedComponent === 'component2' ? '#7950f2' : 'white',
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
                ? theme.colors.violet[0]
                : 'black',
            color: selectedComponent === 'component3' ? '#7950f2' : 'white',
            margin: '1rem',
          }}
        >
          User Management
        </Button>
      </Box>

      {selectedComponent === 'component1' && <AdminProductManagement />}
      {selectedComponent === 'component2' && <AdminOrderTable />}
      {selectedComponent === 'component3' && <AdminUserControl />}
    </Container>
  );
}

export default Admin;
