import { Button, Container, Group, SimpleGrid } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import { PageHero } from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { Product, ProductContext } from '../contexts/ProductContext';

export function Pens() {
  const { products } = useContext(ProductContext);
  const [sortDirection, setSortDirection] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'pens',
  ]); // Set 'pens' as a default selection
  const [sortedProducts, setSortedProducts] = useState(products);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    if (products === null) return;
    let sorted = [...products];

    if (sortDirection === 'ascending') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortDirection === 'descending') {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (selectedCategories.length > 0) {
      sorted = sorted.filter((product: Product) =>
        product.categories.some((categories: string) =>
          selectedCategories.includes(categories),
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
    <Container size="lg">
      <PageHero
        title="Pens"
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
          products={products}
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
