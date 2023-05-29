import { Box, Checkbox, Divider, Table, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useOrderContext } from '../contexts/UseOrderContext';

function AdminOrders() {
  const { getAllOrders, orders } = useOrderContext();

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows =
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
          {order.orderItems.map((item) => (
            <div key={item.product._id}>
              <Text>Product #{item.product._id}</Text>
              <Text>Title: {item.product.title}</Text>
              <Text>Price per item: {item.product.price} SEK</Text>
              <Text>Quantity: {item.quantity}</Text>
              {/* <Image src={item.product.image} width={100} fit="cover" /> */}
              <Text>Total price: {item.price} SEK</Text>
              <Divider my="sm" variant="dotted" />
            </div>
          ))}
        </td>
        <td>{order.totalPrice} SEK</td>
        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        <td>
          <Checkbox
            checked={order.status === 'shipped'}
            onChange={() => {}}
            color="green"
          />
        </td>
      </tr>
    ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Order #</th>
          <th>Shipping Details</th>
          <th>Total Items</th>
          <th>Order Items</th>
          <th>Order Total</th>
          <th>Order Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default AdminOrders;
