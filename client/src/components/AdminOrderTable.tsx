import { Box, Divider, Select, Table, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useOrderContext } from '../contexts/UseOrderContext';

function AdminOrders() {
  const { getAllOrders, orders, updateOrderStatus } = useOrderContext();
  const [localStatuses, setLocalStatuses] = useState<{
    [key: string]: 'in progress' | 'shipped';
  }>({});

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
          {order.orderItems.map((item, index) => (
            <Box key={`${item.product._id}-${index}`}>
              <Text>
                Product <Text fw={700}>{item.product._id}</Text>
              </Text>
              <Text>Title: {item.product.title}</Text>
              <Text>Price per item: {item.product.price} SEK</Text>
              <Text>Quantity: {item.quantity}</Text>
              {/* <Image src={item.product.image} width={100} fit="cover" /> */}
              <Text>Total price: {item.price} SEK</Text>
              <Divider my="sm" variant="dotted" />
            </Box>
          ))}
        </td>
        <td>{order.totalPrice} SEK</td>
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

export default AdminOrders;
