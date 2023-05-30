import { Card, Container, Divider, List, Text, Title } from '@mantine/core';
import { useContext } from 'react';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';

function Confirmation() {
  const { orders, currentOrderId } = useContext(ShoppingCartContext);
  const currentOrder = orders.find((order) => order._id === currentOrderId);

  function calculateCurrentOrderTotal() {
    if (!currentOrder) {
      return 0;
    }
    return currentOrder.orderItems.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
  }

  // InitBackgroundAnimation();
  return (
    <Container size="md" mt="xl" mb="xl">
      {currentOrder && (
        <Card shadow="md" sx={{ textAlign: 'center' }}>
          <Title order={1}>Thank you for your order!</Title>
          <Divider mt="md" mb="sm" size="xs" />
          <Text>
            We have sent a confirmation to: {currentOrder.deliveryAddress.email}
          </Text>
          <Text>Your order number: {currentOrder._id}</Text>
          <Divider mt="md" mb="sm" size="xs" />
          <Title mb="xs" order={2}>
            Order details:
          </Title>
          <Text>Name: {currentOrder.deliveryAddress.fullName}</Text>
          <Text>Email: {currentOrder.deliveryAddress.email}</Text>
          <Text>Address: {currentOrder.deliveryAddress.address}</Text>
          <Text>Zip Code: {currentOrder.deliveryAddress.zipCode}</Text>
          <Text>Phone nr: {currentOrder.deliveryAddress.phoneNumber}</Text>
          <Text>City: {currentOrder.deliveryAddress.city}</Text>
          <Divider mt="md" mb="sm" size="xs" />
          <Title mb="xs" order={2}>
            Ordered Products
          </Title>
          <List listStyleType="none">
            {currentOrder.orderItems.map((orderItem, index) => (
              <List.Item key={index}>
                {orderItem.product.title} - ${orderItem.product.price} -
                Quantity:
                {orderItem.quantity}
                {/* <Image
      src={orderItem.product.image}
      height={150}
      width={220}
      fit="cover"
    /> */}
              </List.Item>
            ))}
          </List>
          <Divider mt="lg" mb="sm" size="xs" />
          <h2>Total price: ${calculateCurrentOrderTotal()}</h2>
        </Card>
      )}
    </Container>
  );
}

export default Confirmation;
