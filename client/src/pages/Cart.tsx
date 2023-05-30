import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Text,
} from '@mantine/core';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
import { ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/UseShoppingCartContext';

function Cart() {
  const { cartItems, cartQuantity } = useShoppingCart();
  const { products } = useContext(ProductContext);

  if (!products) {
    return <div>Loading...</div>;
  }

  <Text weight={500} size={29}>
    total: $
    {cartItems.reduce((total, cartItem) => {
      const product = products.find((i) => i._id === cartItem._id);
      return total + (product?.price || 0) * cartItem.quantity;
    }, 0)}
  </Text>;

  if (cartQuantity < 1) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
        size="xs"
      >
        <img
          src="./assets/sad-cart.svg"
          alt="a sad box indicating that the cart is empty"
        />
        <Text
          style={{
            color: '#7950f2',
            fontWeight: '500',
            fontSize: '1.5rem',
            textAlign: 'center',
          }}
        >
          Oops! Your cart is empty!
        </Text>
        <Text>Looks like you haven´t added anything to your cart yet</Text>
        <Link to="/">
          <Button variant="light" mt="md" radius="md">
            Shop Now
          </Button>
        </Link>
      </Container>
    );
  } else {
    return (
      <Container size={'1680px'} sx={{ marginTop: '0.5rem' }}>
        <Flex
          gap="3rem"
          wrap="wrap"
          direction="column"
          justify="center"
          align="center"
        >
          <Box>
            {cartItems.map((product) => (
              <Fragment key={product._id}>
                <CartItem cartItem={product} />
                <Divider mt="md" mb="sm" size="xs" />
              </Fragment>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '3rem',
              '@media(max-width:801px)': {
                justifyContent: 'center',
              },
            }}
          >
            <CheckoutForm />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <Card
                shadow="md"
                sx={{
                  width: '22rem',
                  display: 'flex',
                  gap: '1rem',
                  flexDirection: 'column',
                  justifyItems: 'center',
                  alignItems: 'center',
                  marginTop: '0.7rem',
                  marginBottom: '1rem',
                  '@media(max-width:721px)': {
                    width: '20rem',
                  },
                }}
              >
                <Text weight={600} size={25}>
                  Summary:
                </Text>
                <Text weight={500} size={18}>
                  {cartItems.map((cartItem) => {
                    const product = products.find(
                      (i) => i._id === cartItem._id,
                    );
                    return (
                      <Box
                        key={cartItem._id}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '1rem',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>{product?.title}</Text>
                        <Text weight={400}>
                          {cartItem.quantity}x ${product?.price}
                        </Text>
                      </Box>
                    );
                  })}
                </Text>
                <Text
                  data-cy="total-price"
                  weight={500}
                  size={29}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Total: $
                  {cartItems.reduce((total, cartItem) => {
                    const product = products.find(
                      (i) => i._id === cartItem._id,
                    );
                    return total + (product?.price || 0) * cartItem.quantity;
                  }, 0)}
                </Text>
              </Card>
            </Box>
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default Cart;
