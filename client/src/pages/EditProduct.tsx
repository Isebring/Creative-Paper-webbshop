import { Container, Group, Title } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { Product, ProductContext } from '../contexts/ProductContext';

function EditProduct() {
  const { id } = useParams();
  const { products, updateProduct } = useContext(ProductContext);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const product = products.find((product) => product._id === id);
      setProductToEdit(product || null);
    } else {
      setProductToEdit(null);
    }
  }, [id, products]);

  const handleSubmit = (updatedProduct: Product) => {
    if (id) {
      updateProduct(id, updatedProduct);
    }
  };

  if (!id) {
    return <div>Product ID is not defined.</div>;
  }

  if (productToEdit === null) {
    return <div>Product not found.</div>;
  }

  if (!productToEdit) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Group position="center" mb="xl">
        <Title>Edit Product</Title>
      </Group>
      <ProductForm
        onSubmit={handleSubmit}
        isEditing={true}
        product={productToEdit}
      />
    </Container>
  );
}

export default EditProduct;
