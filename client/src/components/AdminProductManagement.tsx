import {
  Button,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { IconShieldPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AdminProductCard from '../components/AdminProductCard';
import { ProductContext } from '../contexts/ProductContext';

function AdminProductManagement() {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <Container size="xl">
      <Flex justify="space-between" align="center" mt="xl" mb="sm">
        <Title>Product Management</Title>
        <Group position="center">
          <Link to="/admin/products/new" data-cy="admin-add-product">
            <Button
              leftIcon={<IconShieldPlus size="1.2rem" />}
              sx={{ backgroundColor: 'black', color: 'white' }}
            >
              {' '}
              Add new Product
            </Button>
          </Link>
        </Group>
      </Flex>
      <SimpleGrid
        cols={3}
        spacing="xl"
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: '85rem', cols: 2, spacing: 'md' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {products.map((product) => (
          <AdminProductCard
            key={product._id}
            product={product}
            onDelete={() => deleteProduct(product._id)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default AdminProductManagement;
