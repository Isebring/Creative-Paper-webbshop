import {
  Box,
  Button,
  Container,
  Group,
  MediaQuery,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useContext, useState } from 'react';
import HeroSlide from '../components/HeroSlide';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../contexts/ProductContext';

function Home() {
  const { products } = useContext(ProductContext);
  const [sortDirection, setSortDirection] = useState('');
  const [sortedProducts, setSortedProducts] = useState(products);
  const [activeButton, setActiveButton] = useState('');

  function sortProductsByLowestPrice() {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
    setSortDirection('ascending');
    setActiveButton('lowest');
  }

  function sortProductsByHighestPrice() {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
    setSortDirection('descending');
    setActiveButton('highest');
  }

  return (
    <Container size="xl">
      <HeroSlide />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Title>Creative Paper</Title>
        <Text
          fz="lg"
          fw={500}
          style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}
        >
          Unleash Your Creativity with Our Stationery, <br /> Where Ideas Take
          Flight on Pages Delight!
        </Text>
        <Text fz="lg" fs="italic">
          We. Stationery. You
        </Text>
      </Box>
      <MediaQuery
        query="(max-width: 650px)"
        styles={{
          img: {
            width: '3.6rem',
            height: '3.6rem',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            // background:
            //   theme.colorScheme === 'dark'
            //     ? theme.colors.violet[0]
            //     : theme.colors.violet[1],
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '1.5rem',
            marginTop: '1rem',
            padding: '.3rem',
            // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <img
            src="/assets/plantpurple.svg"
            alt="purple plant leaf"
            style={{ width: '90%' }}
          />
        </Box>
      </MediaQuery>
      <Title sx={{ marginBottom: '1rem' }} ta="center">
        Browse our collection
      </Title>
      <Group spacing={5} mb="md">
        <Button
          sx={{
            border: activeButton === 'lowest' ? '2px solid #5f3dc4' : 'none',
          }}
          variant="light"
          size="xs"
          radius="sm"
          onClick={sortProductsByLowestPrice}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Sort by lowest price
        </Button>
        <Button
          sx={{
            border: activeButton === 'highest' ? '2px solid #5f3dc4 ' : 'none',
          }}
          size="xs"
          variant="light"
          radius="sm"
          onClick={sortProductsByHighestPrice}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Sort by highest price
        </Button>
      </Group>
      <SimpleGrid
        cols={3}
        spacing="xl"
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: '85rem', cols: 2, spacing: 'md' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            sortedProducts={sortedProducts}
            sortDirection={sortDirection === 'ascending' ? 'lowest' : 'highest'}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Home;
