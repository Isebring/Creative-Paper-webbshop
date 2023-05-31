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
  useMantineColorScheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconShoppingCartPlus,
  IconStarFilled,
  IconUserStar,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import { Product } from '../contexts/ProductContext';
import { useProductContext } from '../contexts/UseProductContext';
import { useShoppingCart } from '../contexts/UseShoppingCartContext';

function ProductDetails() {
  const { getProductById } = useProductContext();
  const { _id } = useParams<{ _id: string }>();
  const { increaseCartQuantity } = useShoppingCart();
  const [product, setProduct] = useState<Product | null>(null);
  const { colorScheme } = useMantineColorScheme();

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (_id) {
      const fetchSingleProduct = async () => {
        const fetchedProduct = await getProductById(_id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        }
      };

      fetchSingleProduct();
    }
  }, [_id, getProductById]);

  if (!product) {
    return <div>Sorry! The product was not found.</div>;
  }

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
      <Button
        variant="outline"
        mb="sm"
        mt="sm"
        onClick={goBack}
        sx={{
          borderColor: colorScheme === 'dark' ? '#ADB5BD' : '#000',
          color: colorScheme === 'dark' ? '#ADB5BD' : '#000',
        }}
      >
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
                background: 'black',
                color: 'white',
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
                src={'/api/image/' + product.imageId}
                key={product._id}
                alt={product.title}
                fit="contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={'/api/image/' + product.secondImageId}
                alt={product.title}
                fit="contain"
              />
            </SwiperSlide>
          </Swiper>
        </Card>
        <Card sx={{ flex: 1 }}>
          <Box
            sx={{
              background: 'black',
              color: 'white',
              borderRadius: '0.5rem',
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

          <Group
            position="apart"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {product.stock > 0 ? (
                <IconCheck color="green" />
              ) : (
                <IconX color="red" />
              )}
              <Text fw={700} ml="xs">
                {' '}
                Current Stock: {product.stock}
              </Text>
            </Box>
            <Title
              order={2}
              data-cy="product-price"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              ${product.price}
            </Title>
          </Group>

          <Button
            fullWidth
            variant="light"
            mt="md"
            radius="md"
            onClick={() => {
              increaseCartQuantity(product._id);
              notifications.show({
                icon: <IconShoppingCartPlus />,
                title: `${product?.title}`,
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
                increaseCartQuantity(product._id);
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
