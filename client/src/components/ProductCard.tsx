import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  List,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../contexts/ProductContext';
import { useProductContext } from '../contexts/UseProductContext';
import { useShoppingCart } from '../contexts/UseShoppingCartContext';

type ProductCardProps = {
  productId?: string;
  product: Product;
  sortedProducts?: Product[];
  sortDirection?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ productId, product }) => {
  const { increaseCartQuantity } = useShoppingCart();
  const { products } = useProductContext();
  const { colorScheme } = useMantineColorScheme();

  if (!product && productId) {
    const foundProduct = products?.find((p) => p._id === productId);

    if (foundProduct) {
      product = foundProduct;
    } else {
      return <div>Loading...</div>;
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const link = '/products/' + product._id;

  return (
    <>
      <Card
        shadow="xl"
        withBorder
        data-cy="product"
        sx={{
          backgroundColor: '#F4EEE0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Card.Section>
          <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Image
              src={'/api/image/' + product.imageId}
              height={300}
              fit="cover"
              sx={{ backgroundColor: 'white' }}
            />
            <Box pl="md" pr="md">
              <Group
                mt="xl"
                mb="xl"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Text
                  sx={{
                    color: colorScheme === 'dark' ? '#000' : 'initial',
                  }}
                  weight={500}
                  size={29}
                  // transform="uppercase"
                  data-cy="product-title"
                >
                  {product.title}
                </Text>
                {product.stock > 0 ? (
                  <Badge
                    sx={{
                      color: colorScheme === 'dark' ? '#000' : '',
                    }}
                    color="violet"
                    variant="light"
                    size="lg"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {product.stock} in stock
                  </Badge>
                ) : (
                  <Badge
                    sx={{
                      color: colorScheme === 'dark' ? '#000' : 'red',
                    }}
                    color="red"
                    variant="light"
                    size="lg"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Out of Stock
                  </Badge>
                )}
              </Group>
              <List
                sx={{
                  color: colorScheme === 'dark' ? '#000' : 'initial',
                }}
                style={{ fontFamily: 'Poppins, sans-serif', padding: '0.2rem' }}
              >
                {product.summary &&
                  product.summary
                    .split(',')
                    .map((item) => item.trim())
                    .map((item, index) => (
                      <List.Item key={`${item.trim()}-${index}`}>
                        {item.trim()}
                      </List.Item>
                    ))}
              </List>
            </Box>
          </Link>
        </Card.Section>
        <Group position="left" mt="md" mb="xs">
          <Button
            disabled={product.stock === 0}
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
             {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
          </Button>
          <Link to={link}>
            <Button
              sx={{
                color: colorScheme === 'dark' ? '#000' : 'initial',
                borderColor: colorScheme === 'dark' ? '#000' : 'initial',
              }}
              variant="outline"
              mt="md"
              radius="md"
              style={{
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              MORE INFO
            </Button>
          </Link>

          <Title
            sx={{
              color: colorScheme === 'dark' ? '#000' : 'initial',
            }}
            style={{
              marginLeft: 'auto',
              marginTop: '.5rem',
              // fontFamily: 'Poppins, sans-serif',
            }}
            order={2}
            align="left"
            data-cy="product-price"
            weight={500}
          >
            ${product?.price}
          </Title>
        </Group>
      </Card>
    </>
  );
};

export default ProductCard;
