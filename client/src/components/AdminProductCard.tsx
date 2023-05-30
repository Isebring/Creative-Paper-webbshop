import { Box, Button, Card, Group, Image, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../contexts/ProductContext';

interface Props {
  product: Product;
  onDelete?: () => void;
}

function AdminProductCard({ product, onDelete }: Props) {
  const edit = '/admin/products/' + product._id;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  async function deleteProduct(productId: string) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting the product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleDelete = async () => {
    if (showConfirmDelete) {
      await deleteProduct(product._id);
      onDelete?.();
    } else {
      setShowConfirmDelete(true);
    }
  };

  return (
    <>
      <Card
        shadow="xl"
        padding="md"
        radius="lg"
        withBorder
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        data-cy="product"
      >
        <Card.Section>
          <Image
            src={'/api/image/' + product.imageId}
            height={300}
            fit="cover"
          />
          <Box pl="md" pr="md">
            <Group position="left" mt="sm" mb="sm">
              <Text
                weight={500}
                size={29}
                transform="uppercase"
                data-cy="product-title"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {product.title}
              </Text>
            </Group>
            <Group position="left" mt="sm" mb="md">
              <Text color="dimmed">Product id:</Text>
              <Text
                color="dimmed"
                data-cy="product-id"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {product._id}
              </Text>
            </Group>
            <Text
              size="md"
              align="left"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {product.description}
            </Text>
          </Box>
        </Card.Section>
        <Group position="left" mt="md" mb="xs">
          {showConfirmDelete ? (
            <Button
              sx={{ color: 'red', borderColor: 'red' }}
              variant="outline"
              mt="md"
              radius="md"
              onClick={handleDelete}
              data-cy="confirm-delete-button"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Are you sure?
            </Button>
          ) : (
            <Button
              sx={{ color: 'red', borderColor: 'red' }}
              variant="outline"
              mt="md"
              radius="md"
              onClick={handleDelete}
              data-cy="admin-remove-product"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Delete Product
            </Button>
          )}

          <Link to={edit} data-cy="admin-edit-product">
            <Button
              variant="outline"
              mt="md"
              radius="md"
              sx={{ border: '1px solid black', color: 'black' }}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Edit product
            </Button>
          </Link>
          <Title
            order={2}
            sx={{ marginLeft: '1rem', marginTop: '.5rem' }}
            align="right"
            data-cy="product-price"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {product.price}€
          </Title>
        </Group>
      </Card>
    </>
  );
}

export default AdminProductCard;
