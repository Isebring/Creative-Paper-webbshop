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
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconShoppingCartPlus,
  IconStarFilled,
  IconUserStar,
} from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import {
  Product,
  ProductContext,
  useProduct,
} from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/UseShoppingCart';

function ProductDetails() {
  const { getProductById } = useProduct();
  const { _id = '' } = useParams();
  const { increaseCartQuantity } = useShoppingCart();
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(_id);
      if (product) {
        setProduct(product);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [getProductById, _id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
        sx={{ border: '1px solid black', color: 'black' }}
      >
        Back to Store
      </Button>
      <Flex direction={{ base: 'column', sm: 'row' }}>
        <Card sx={{ flex: 1 }}>
          <Title align="center" mb={50} data-cy="product-title">
            {product?.title}
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
              {product?.rating}
            </Box>
            <IconUserStar
              style={{ marginRight: '.2rem' }}
              stroke="0.04rem"
              size="1.5rem"
            />
            {product?.usersRated}
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
                src={product?.image}
                key={product?._id}
                alt={product?.title}
                fit="contain"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={product?.secondImage}
                alt={product?.title}
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
              About this {product?.title}
            </Title>
          </Box>
          <Text size="md" align="left" mt="md" data-cy="product-description">
            {product?.description}
          </Text>
          <Group position="right">
            <Title order={2} data-cy="product-price">
              {product?.price}€
            </Title>
          </Group>
          <Button
            fullWidth
            variant="light"
            mt="md"
            radius="md"
            onClick={() => {
              increaseCartQuantity(product!._id);
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
                increaseCartQuantity(product!._id);
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
