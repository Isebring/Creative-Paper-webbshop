import { Card, Container, Divider, List, Text, Title } from '@mantine/core';
import { useContext } from 'react';
import { FormValues } from '../components/CheckoutForm';
import InitBackgroundAnimation from '../components/ConfirmationPageAnimation';
import { ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/UseShoppingCartContext';

function Confirmation() {
  const { products } = useContext(ProductContext);
  const { orders } = useShoppingCart();
  const lastOrder = orders[orders.length - 1];
  const formData = lastOrder.cartProducts.find(
    (item): item is { formData: FormValues } => 'formData' in item,
  )?.formData;

  function calculateLastOrderTotal() {
    if (!products) {
      return;
    }
    return lastOrder.cartProducts.reduce((total, item) => {
      if ('_id' in item) {
        const product = products.find((i) => i._id === item._id);
        return total + (product?.price || 0) * item.quantity;
      }
      return total;
    }, 0);
  }
  InitBackgroundAnimation();
  return (
    <Container size="md" mt="xl" mb="xl">
      {lastOrder && formData && (
        <Card shadow="md" sx={{ textAlign: 'center' }}>
          <Title order={1}>Thank you for your order!</Title>
          <Divider mt="md" mb="sm" size="xs" />
          <Text>We have sent a confirmation to: {formData.email}</Text>
          <Text>Your order number: {lastOrder.id}</Text>
          <Divider mt="md" mb="sm" size="xs" />
          <Title mb="xs" order={2}>
            Order details:
          </Title>
          <Text>Name: {formData.fullName}</Text>
          <Text>Email: {formData.email}</Text>
          <Text>Address: {formData.adress}</Text>
          <Text>Zip Code: {formData.zipCode}</Text>
          <Text>Phone nr: {formData.phoneNumber}</Text>
          <Text>City: {formData.city}</Text>
          <Divider mt="md" mb="sm" size="xs" />
          <Title mb="xs" order={2}>
            Ordered Products
          </Title>
          <List listStyleType="none">
            {lastOrder.cartProducts.map(
              (product, index) =>
                '_id' in product && (
                  <List.Item key={index}>
                    {product.title} - ${product.price} - Quantity:{' '}
                    {product.quantity}
                  </List.Item>
                ),
            )}
          </List>
          <Divider mt="lg" mb="sm" size="xs" />
          <h2>Total price: ${calculateLastOrderTotal()}</h2>
        </Card>
      )}
    </Container>
  );
}

export default Confirmation;
