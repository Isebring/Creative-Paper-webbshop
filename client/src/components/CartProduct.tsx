import { Box, Button, Group, Image, Input, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { CartItem } from '../../data/index';
import { ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

interface Props {
  cartItem: CartItem;
}

function CartProduct({ cartItem }: Props) {
  const { products } = useContext(ProductContext);
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  products.find((i) => i.id === cartItem.id);

  return (
    <Box
      mt="sm"
      p="sm"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        '@media(max-width:721px)': {
          flexDirection: 'column',
        },
      }}
      data-cy="cart-item"
    >
      <Image src={cartItem.image} height={150} width={220} fit="cover" />

      <Group position="center" pl="xs" pr="xs" mt="sm" mb="sm">
        <Text
          weight={500}
          size={20}
          transform="uppercase"
          data-cy="product-title"
        >
          {cartItem.title}
        </Text>
      </Group>
      <Group>
        <Group sx={{ display: 'flex' }} position="center" mt="xs" mb="xs">
          {' '}
          <Button
            variant="light"
            mt="sm"
            radius="sm"
            onClick={() => decreaseCartQuantity(cartItem.id)}
            data-cy="decrease-quantity-button"
          >
            <IconMinus size="1.2rem" stroke="0.1rem" />
          </Button>
          <Input
            data-cy="product-quantity"
            mt="sm"
            readOnly
            variant="unstyled"
            type="number"
            value={cartItem.quantity}
            rightSectionWidth="0px"
            sx={{
              width: '1.2rem',
            }}
          />
          <Button
            variant="light"
            mt="sm"
            radius="md"
            onClick={() => increaseCartQuantity(cartItem.id)}
            data-cy="increase-quantity-button"
          >
            <IconPlus size="1.2rem" stroke="0.1rem" />
          </Button>
        </Group>
        <Group position="center" mt="xs" mb="xs">
          <Text mt="sm" weight={500} size={15} data-cy="product-price">
            x{cartItem.price * cartItem.quantity}€
          </Text>
        </Group>
      </Group>
    </Box>
  );
}

export default CartProduct;
