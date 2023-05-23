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
import { useShoppingCart } from '../contexts/UseShoppingCart';

export interface Props {
  product: Product;
  sortDirection: 'lowest' | 'highest';
  sortedProducts: Product[];
}

function ProductCard({ product }: Props) {
  const { increaseCartQuantity } = useShoppingCart();
  const link = '/product/' + product._id;

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
                <Title
                  order={2}
                  data-cy="product-title"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {product.title}
                </Title>
                <Badge
                  color="violet"
                  variant="light"
                  size="lg"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  New!
                </Badge>
              </Group>
              <List style={{ fontFamily: 'Poppins, sans-serif' }}>
                {Array.isArray(product.summary) &&
                  product.summary.map((item) => (
                    <List.Item key={item}>{item}</List.Item>
                  ))}
              </List>
            </Box>
          </Link>
        </Card.Section>
        <Group position="left" mt="md" mb="xs">
          <Button
            variant="light"
            mt="md"
            radius="md"
            onClick={() => {
              increaseCartQuantity(product._id);
              notifications.show({
                icon: <IconShoppingCartPlus />,
                title: `${product.title}`,
                message: 'has been added',
              });
            }}
            data-cy="product-buy-button"
          >
            ADD TO CART
          </Button>
          <Link to={link}>
            <Button
              variant="outline"
              mt="md"
              radius="md"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              MORE INFO
            </Button>
          </Link>

          <Title
            style={{
              marginLeft: 'auto',
              marginTop: '.5rem',
              fontFamily: 'Poppins, sans-serif',
            }}
            order={2}
            align="left"
            data-cy="product-price"
          >
            ${product.price}
          </Title>
        </Group>
      </Card>
    </>
  );
}

export default ProductCard;
