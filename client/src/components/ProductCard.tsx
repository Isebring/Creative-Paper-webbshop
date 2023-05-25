import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  List,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, useProduct } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/UseShoppingCart';

type ProductCardProps = {
  productId: string;
  product: Product;
  sortedProducts?: Product[];
  sortDirection?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  const theme = useMantineTheme();
  const { increaseCartQuantity } = useShoppingCart();
  const { products } = useProduct();

  // Find the product by ID in the products array
  const product = products?.find((product) => product._id === productId);

  if (!product) {
    return <div>Loading...</div>;
  }

  const link = '/products/' + product._id;

  return (
    <>
      <Card shadow="xl" radius="lg" withBorder data-cy="product">
        <Card.Section>
          <Link to={link} style={{ textDecoration: 'none', color: 'inhFerit' }}>
            <Image src={product.image} height={300} fit="cover" />
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
            style={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: 'black',
              color: 'white',
            }}
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
              style={{
                fontFamily: 'Poppins, sans-serif',
                border:
                  theme.colorScheme === 'dark'
                    ? '1px solid white'
                    : '1px solid black',
                color: theme.colorScheme === 'dark' ? 'white' : 'black',
              }}
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
            ${product?.price}
          </Title>
        </Group>
      </Card>
    </>
  );
};

export default ProductCard;
