import { Container, Group, SimpleGrid, Title } from '@mantine/core';
import { useContext, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import HeroSlide from '../components/HeroSlide';
import { PageHero } from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../contexts/ProductContext';

function Home() {
  const { products } = useContext(ProductContext);
  const [sortDirection] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortedProducts] = useState(products);

  console.log(products);
  console.log(selectedCategories);

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return selectedCategories.some((category) =>
      product.categories.some((pc) => pc._id === category),
    );
  });

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
        <CategoryFilter
          value={selectedCategories}
          onChange={setSelectedCategories}
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
        {filteredProducts?.map((product) => (
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
