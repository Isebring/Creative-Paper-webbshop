import {
  Box,
  Container,
  Divider,
  List,
  Loader,
  Select,
  Table,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useOrderContext } from '../contexts/UseOrderContext';

function AdminOrders() {
  const theme = useMantineTheme();
  const { getAllOrders, orders, updateOrderStatus } = useOrderContext();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [localStatuses, setLocalStatuses] = useState<{
    [key: string]: 'in progress' | 'shipped';
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  const updateLocalStatus = (
    _id: string,
    status: 'in progress' | 'shipped',
  ) => {
    setLocalStatuses((prevStatuses) => ({
      ...prevStatuses,
      [_id]: status,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllOrders();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For bigger screens
  const tableRows =
    Array.isArray(orders) &&
    orders.map((order) => (
      <tr key={order._id}>
        <td>
          <Text fw={700}>{order._id}</Text>
        </td>
        <td>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Text>{order.deliveryAddress.email}</Text>
            <Text>{order.deliveryAddress.phoneNumber}</Text>
            <Text>{order.deliveryAddress.fullName}</Text>
            <Text>{order.deliveryAddress.address}</Text>
            <Text>
              {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
            </Text>
          </Box>
        </td>
        <td>
          {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
        </td>
        <td>
          {order.orderItems.map((item, index) => (
            <Box key={`${item.product._id}-${index}`}>
              <Text>Product: {item.product._id}</Text>
              <Text>Title: {item.product.title}</Text>
              <Text>Price per item: ${item.product.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Total price: ${item.price}</Text>
              <Divider my="sm" variant="dotted" />
            </Box>
          ))}
        </td>
        <td>${order.totalPrice}</td>
        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        <td>
          <Select
            value={localStatuses[order._id] || order.status}
            onChange={(value) => {
              updateLocalStatus(order._id, value as 'in progress' | 'shipped');
              updateOrderStatus(order._id, value as 'in progress' | 'shipped');
            }}
            data={[
              { value: 'in progress', label: 'In Progress' },
              { value: 'shipped', label: 'Shipped' },
            ]}
          />
        </td>
      </tr>
    ));

  // For smaller screens
  const listRows =
    Array.isArray(orders) &&
    orders.map((order) => (
      <List.Item key={order._id}>
        <Box style={{ width: '100%' }}>
          <Text fw={700}>Order ID:</Text>
          <Text>{order._id}</Text>
          <Divider my="sm" variant="dotted" />
          <Text fw={700}>Shipping Details:</Text>
          <Text>{order.deliveryAddress.email}</Text>
          <Text>{order.deliveryAddress.phoneNumber}</Text>
          <Text>{order.deliveryAddress.fullName}</Text>
          <Text>{order.deliveryAddress.address}</Text>
          <Text>
            {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
          </Text>
          <Divider my="sm" variant="dotted" />
          <Text fw={700}>Order Items:</Text>
          {order.orderItems.map((item, index) => (
            <Box key={`${item.product._id}-${index}`}>
              <Divider my="sm" variant="dotted" />
              <Text>Product: {item.product._id}</Text>
              <Text>Title: {item.product.title}</Text>
              <Text>Price per item: ${item.product.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Total price: ${item.price}</Text>
            </Box>
          ))}
          <Divider my="sm" variant="dotted" />
          <Text>
            Total Items:{' '}
            {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Text>
          <Text>Order Total: ${order.totalPrice}</Text>
          <Divider my="sm" variant="dotted" />
          <Text>
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider my="sm" variant="dotted" />
          <Text>Status:</Text>
          <Box style={{ width: '100%' }}>
            <Select
              value={localStatuses[order._id] || order.status}
              onChange={(value) => {
                updateLocalStatus(
                  order._id,
                  value as 'in progress' | 'shipped',
                );
                updateOrderStatus(
                  order._id,
                  value as 'in progress' | 'shipped',
                );
              }}
              data={[
                { value: 'in progress', label: 'In Progress' },
                { value: 'shipped', label: 'Shipped' },
              ]}
            />
          </Box>
          <Divider size="lg" mt="lg" mb="lg" />
        </Box>
      </List.Item>
    ));

  if (isLoading) {
    return <Loader color="violet" />;
  }

  return isDesktop ? (
    <Container size="xl">
      <Title mt="1.5rem" align="center" sx={{ marginBottom: '1rem' }}>
        Order Management
      </Title>
      <Table>
        <thead>
          <tr style={{ backgroundColor: theme.colors.violet[0] }}>
            <th>Order ID</th>
            <th>Shipping Details</th>
            <th>Total Items</th>
            <th>Order Items</th>
            <th>Order Total</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </Container>
  ) : (
    <Container size="xl">
      <List style={{ listStyle: 'none' }}>
        <List.Item>
          <Title align="center" sx={{ marginBottom: '1rem' }}>
            Order Management
          </Title>
        </List.Item>
        {listRows}
      </List>
    </Container>
  );
}

export default AdminOrders;
