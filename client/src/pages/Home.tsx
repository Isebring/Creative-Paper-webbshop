import { Button, Container, Group, SimpleGrid, Title } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import HeroSlide from '../components/HeroSlide';
import { PageHero } from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../contexts/ProductContext';

function Home() {
  const { products } = useContext(ProductContext);
  const [sortDirection, setSortDirection] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortedProducts, setSortedProducts] = useState(products || []);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/categories/:category/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categories: selectedCategories,
        }),
      });
      const newProducts = await response.json();
      setSortedProducts(newProducts);
    };

    if (selectedCategories.length > 0) {
      fetchProducts();
    }
  }, [selectedCategories]);

  useEffect(() => {
    let sorted = [...products];

    if (sortDirection === 'ascending') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortDirection === 'descending') {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (selectedCategories.length > 0) {
      sorted = sorted.filter((product) =>
        product.category && product.category.some((category: string) =>
          selectedCategories.includes(category),
        ),
      );
    }
    

    setSortedProducts(sorted);
  }, [products, sortDirection, selectedCategories]);

  function sortProductsByLowestPrice() {
    setSortDirection('ascending');
    setActiveButton('lowest');
  }

  function sortProductsByHighestPrice() {
    setSortDirection('descending');
    setActiveButton('highest');
  }

  return (
    <Container size="xl">
      <HeroSlide />
      <PageHero
        title="Creative Paper"
        line1="Unleash Your Creativity with Our Stationary,"
        line2="Where Ideas Take Flight on Pages Delight!"
      />
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
        <CategoryFilter
          products={products}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
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
        {sortedProducts?.map((product) => ( 
          <ProductCard
            key={product._id}
            productId={product._id}
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
