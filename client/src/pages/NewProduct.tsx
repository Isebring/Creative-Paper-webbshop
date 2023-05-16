import { Container, Group, Title } from '@mantine/core';
import { useContext } from 'react';
import ProductForm from '../components/ProductForm';
import { ProductContext } from '../contexts/ProductContext';

function NewProduct() {
  const { addProduct } = useContext(ProductContext);

  return (
    <Container>
      <Group position="center" mb="xl">
        <Title>New Product</Title>
      </Group>
      <ProductForm
        onSubmit={addProduct}
        addProduct={addProduct}
        isEditing={false}
      />
    </Container>
  );
}

export default NewProduct;
