import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  List,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/index';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

export interface Props {
  product: Product;
  sortDirection: 'lowest' | 'highest';
  sortedProducts: Product[];
}

function ProductCard({ product }: Props) {
  const { increaseCartQuantity } = useShoppingCart();
  const link = '/product/' + product.id;

  return (
    <>
      <Card shadow="xl" radius="lg" withBorder data-cy="product">
        <Card.Section>
          <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Image src={product.image} height={230} fit="cover" />
            <Box pl="md" pr="md">
              <Group
                mt="xl"
                mb="xl"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Title order={2} data-cy="product-title">
                  {product.title}
                </Title>
                <Badge color="blue" variant="light" size="lg">
                  New!
                </Badge>
              </Group>
              <List>
                {Array.isArray(product.summary) &&
                  product.summary.map((item) => (
                    <List.Item key={item}>{item}</List.Item>
                  ))}
              </List>
            </Box>
          </Link>
        </Card.Section>
        <Group position="left" mt="md" mb="xs">
          <Link to={link}>
            <Button variant="outline" mt="md" radius="md">
              Product Page
            </Button>
          </Link>
          <Button
            variant="light"
            mt="md"
            radius="md"
            onClick={() => {
              increaseCartQuantity(product.id);
              notifications.show({
                icon: <IconShoppingCartPlus />,
                title: `${product.title}`,
                message: 'has been added',
              });
            }}
            data-cy="product-buy-button"
          >
            Add to cart
          </Button>
          <Title
            style={{ marginLeft: 'auto', marginTop: '.5rem' }}
            order={2}
            align="left"
            data-cy="product-price"
          >
            {product.price}€
          </Title>
        </Group>
      </Card>
    </>
  );
}

export default ProductCard;
