import { Button, Container, Group, SimpleGrid } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { PageHero } from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { Product } from '../contexts/ProductContext';

export function CategoryPage() {
  const [sortDirection, setSortDirection] = useState('');
  const [selectedCategories] = useState<string[]>(['pens']);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [activeButton, setActiveButton] = useState('');
  const sortedProductsRef = useRef<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `/api/categories/6472b1d46b886637ceb1daca/products`,
      );

      const data = await response.json();
      console.log(data);
      setSortedProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  //header: get all categories, map as links

  //fetch category
  //save

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    sortedProductsRef.current = sortedProducts;
  }, [sortedProducts]);

  useEffect(() => {
    if (sortedProductsRef.current.length === 0) return;
    const sorted = [...sortedProductsRef.current];

    if (sortDirection === 'ascending') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortDirection === 'descending') {
      sorted.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sorted);
  }, [sortDirection, selectedCategories]);

  function sortProductsByLowestPrice() {
    setSortDirection('ascending');
    setActiveButton('lowest');
  }

  function sortProductsByHighestPrice() {
    setSortDirection('descending');
    setActiveButton('highest');
  }

  return (
    /* get category information and change line 1 line 2 in database */
    <Container size="lg">
      <PageHero
        title="Pens"
        line1="Your handwriting is like a snowflake;"
        line2="unique."
      />
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
        {sortedProducts.map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
            sortedProducts={sortedProducts}
            sortDirection={sortDirection === 'ascending' ? 'lowest' : 'highest'}
            productId={''}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
