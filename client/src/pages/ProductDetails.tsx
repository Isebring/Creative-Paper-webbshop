import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconShoppingCartPlus,
  IconStarFilled,
  IconUserStar,
} from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import { ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find((p) => p.id === id);
  const { increaseCartQuantity } = useShoppingCart();

  const goBack = () => {
    window.history.back();
  };
  const theme = useMantineTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <Container>
        <Link to="/">
          <Button variant="outline">Go back</Button>
        </Link>
        <Title>Sorry! Product not found</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Button variant="outline" mb="sm" mt="sm" onClick={goBack}>
        Back to Store
      </Button>
      <Flex direction={{ base: 'column', sm: 'row' }}>
        <Card sx={{ flex: 1 }}>
          <Title align="center" mb={50} data-cy="product-title">
            {product.title}
          </Title>
          <Box sx={{ display: 'flex' }}>
            <Box
              mb="xs"
              mr="sm"
              sx={{
                background: theme.colors.blue[7],
                color: theme.colors.gray[1],
                width: '15%',
                borderRadius: '.2rem',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <IconStarFilled size="1.1rem" />
              {product.rating}
            </Box>
            <IconUserStar
              style={{ marginRight: '.2rem' }}
              stroke="0.04rem"
              size="1.5rem"
            />
            {product.usersRated}
          </Box>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            grabCursor={true}
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <Image
                src={product.image}
                key={product.id}
                alt={product.title}
                fit="contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={product.secondImage}
                alt={product.title}
                fit="contain"
              />
            </SwiperSlide>
          </Swiper>
        </Card>
        <Card sx={{ flex: 1 }}>
          <Box
            sx={{
              background: theme.colors.blue[7],
              color: theme.colors.gray[1],
              borderTopLeftRadius: '.5rem',
              borderBottomLeftRadius: '.5rem',
              padding: '.4rem',
            }}
          >
            <Title order={3} align="center">
              About this {product.title}
            </Title>
          </Box>
          <Text size="md" align="left" mt="md" data-cy="product-description">
            {product.description}
          </Text>
          <Group position="right">
            <Title order={2} data-cy="product-price">
              {product.price}€
            </Title>
          </Group>
          <Button
            fullWidth
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
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <Button
              fullWidth
              variant="outline"
              mt="md"
              radius="md"
              onClick={() => {
                increaseCartQuantity(product.id);
              }}
            >
              Buy now
            </Button>
          </Link>
        </Card>
      </Flex>
    </Container>
  );
}

export default ProductDetails;
