import {
  Box,
  Divider,
  Image,
  List,
  Table,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useOrderContext } from '../contexts/UseOrderContext';

function MyOrders() {
  const theme = useMantineTheme();
  const { getOrdersByUser, orders } = useOrderContext();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    getOrdersByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div key={`${item.product._id}-${index}`}>
              <Text>
                Product <Text fw={700}>{item.product._id}</Text>
              </Text>
              <Text>Title: {item.product.title}</Text>
              <Text>Price per item: ${item.product.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Image
                src={'/api/image/' + item.product.imageId}
                width={100}
                fit="cover"
              />
              <Text>Total price: ${item.price}</Text>
              <Divider my="sm" variant="dotted" />
            </div>
          ))}
        </td>
        <td>${order.totalPrice}</td>
        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        <td>
          <Text>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </td>
      </tr>
    ));

  const listRows =
    Array.isArray(orders) &&
    orders.map((order) => (
      <List.Item key={order._id}>
        <Box mt="lg" style={{ width: '100%' }}>
          <Text fw={700}>Order ID: {order._id}</Text>
          <Text>Shipping Details: {order.deliveryAddress.email}</Text>
          <Text>
            Total Items:{' '}
            {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Text>
          <Text>Order Items:</Text>
          {order.orderItems.map((item, index) => (
            <Box key={`${item.product._id}-${index}`}>
              <Text>
                Product <Text fw={700}>{item.product._id}</Text>
              </Text>
              <Text>Title: {item.product.title}</Text>
              <Text>Price per item: ${item.product.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Image
                src={'/api/image/' + item.product.imageId}
                width={100}
                fit="cover"
              />
              <Text>Total price: ${item.price}</Text>
              <Divider my="sm" variant="dotted" />
            </Box>
          ))}
          <Text>Order Total: ${order.totalPrice}</Text>
          <Text>
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Text>Status:</Text>
          <Text>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
          <Box style={{ width: '350px' }}>
            <Divider size="lg" mt="lg" mb="lg" />
          </Box>
        </Box>
      </List.Item>
    ));

  return isDesktop ? (
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
  ) : (
    <List
      style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {listRows}
    </List>
  );
}

export default MyOrders;
