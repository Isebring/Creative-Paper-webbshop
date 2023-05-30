import { Box, Divider, Table, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useOrderContext } from '../contexts/UseOrderContext';

function MyOrders() {
  const { getOrdersByUser, orders } = useOrderContext();

  useEffect(() => {
    getOrdersByUser();
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
          {order.orderItems.map((item, index) => (
            <div key={`${item.product._id}-${index}`}>
              <Text>
                Product <Text fw={700}>{item.product._id}</Text>
              </Text>
              <Text>Title: {item.product.title}</Text>
              <Text>Price per item: ${item.product.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              {/* <Image src={item.product.image} width={100} fit="cover" /> */}
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

  return (
    <Table>
      <thead>
        <tr>
          <th>Order ID</th>
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

export default MyOrders;
