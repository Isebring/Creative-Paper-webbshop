import { Button, Container, Group, SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import { PageHero } from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { Product } from '../contexts/ProductContext';
import { useProductUpdate } from '../contexts/ProductUpdateContext';

export function Notebooks() {
  const [sortDirection, setSortDirection] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'notebooks',
  ]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [activeButton, setActiveButton] = useState('');
  const { update, setUpdate } = useProductUpdate();

  useEffect(() => {
    fetchProducts();
    setUpdate(false);
  }, [update]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products/by-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: ['Notebooks', 'Journals'] }),
      });
        
      const data: Product[] = await response.json();
  
      const uniqueProducts: Product[] = Array.from(
        new Set(data.map(product => JSON.stringify(product))), 
        product => JSON.parse(product)
      );
      
      setSortedProducts(uniqueProducts);
  
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  

  useEffect(() => {
    if (sortedProducts.length === 0) return;
    let sorted = [...sortedProducts];

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
    <Container size="lg">
      <PageHero
        title="Notebooks & Journals"
        line1="Let our beautiful notebooks harbour"
        line2="your best and worst ideas."
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
        <CategoryFilter
          products={sortedProducts}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
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
