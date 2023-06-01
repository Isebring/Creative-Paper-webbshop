import { Container, Group, Loader, Title } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { Product, ProductContext } from '../contexts/ProductContext';

function EditProduct() {
  const { id } = useParams();
  const { updateProduct, getProductById } = useContext(ProductContext);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductById(id)
        .then((product) => {
          setProductToEdit(product);
          setLoading(false);
        })
        .catch(() => {
          setProductToEdit(null);
          setLoading(false);
        });
    } else {
      setProductToEdit(null);
    }
  }, [id, getProductById]);

  const handleSubmit = (updatedProduct: Product) => {
    if (id) {
      updateProduct(id, updatedProduct);
    }
  };

  if (!id) {
    return <div>Product ID is not defined.</div>;
  }

  if (isLoading) {
    return <Loader color="violet" />;
  }

  if (productToEdit === null) {
    return <div>Product not found.</div>;
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
