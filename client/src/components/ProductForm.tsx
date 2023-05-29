import {
  Box,
  Button,
  FileInput,
  Group,
  MultiSelect,
  SelectItem,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Product } from '../contexts/ProductContext';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  isEditing: boolean;
  product?: Product;
}

const schema = Yup.object().shape({
  summary: Yup.string()
    .min(2, 'Summary should have at least 2 letters')
    .required('Summary is required'),
  imageId: Yup.string().required('Image is required'),
  title: Yup.string()
    .min(2, 'Title should have at least 2 letters')
    .required('Title is required'),
  description: Yup.string()
    .min(5, 'Description should have at least 5 letters')
    .required('Description is required'),
  price: Yup.number()
    .min(1, 'Nothing is this cheap...')
    .required('Price is required')
    .strict(),
  categories: Yup.array()
    .of(Yup.string().min(2))
    .required('At least one category is required'),
});

function ProductForm({ isEditing, product, onSubmit }: ProductFormProps) {
  // const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState<(string | SelectItem)[]>([]);
  const form = useForm<Product>({
    validate: yupResolver(schema),
    initialValues: {
      _id: '',
      image: '',
      imageId: '',
      title: '',
      description: '',
      price: '' as never,
      secondImageId: '',
      summary: '' as never,
      rating: 0,
      usersRated: 0,
      categories: isEditing && product ? product.categories : [],
    },
  });

  useEffect(() => {
    if (isEditing && product) {
      form.setValues(product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isEditing, form.setValues]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const categories = await response.json();

      const formattedCategories = categories
        .filter((category: any) => typeof category.name === 'string')
        .map((category: any) => ({
          value: category.name,
          label: category.name,
        }));

      setCategoryData(formattedCategories);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: Product) => {
    try {
      const editedProduct = {
        ...values,
        _id: product?._id || '',
        categories: values.categories || [],
      };

      await onSubmit(editedProduct);

      form.reset();
      navigate('/admin');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    const imageData = new FormData();
    imageData.append('file', file);
    const response = await fetch('/api/image', {
      method: 'POST',
      body: imageData,
    });
    console.log('response before parsing:', response);
    try {
      const imageId = await response.json();
      console.log('imageId:', imageId);
      form.setFieldValue('imageId', imageId);
      console.log('response after parsing:', response);
    } catch (error) {
      console.error('Error parsing JSON response', error);
    }
  };

  const handleSecondImageUpload = async (file: File) => {
    if (!file) return;
    const imageData = new FormData();
    imageData.append('file', file);
    const response = await fetch('/api/image', {
      method: 'POST',
      body: imageData,
    });
    console.log('response before parsing:', response);
    try {
      const secondImageId = await response.json();
      console.log('secondImageId:', secondImageId);
      form.setFieldValue('secondImageId', secondImageId);
      console.log('response after parsing:', response);
    } catch (error) {
      console.error('Error parsing JSON response', error);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        data-cy="product-form"
        id="product-form"
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="ComputerBook 2000"
          {...form.getInputProps('title')}
          data-cy="product-title"
          errorProps={{ 'data-cy': 'product-title-error' }}
        />
        <FileInput
          withAsterisk
          label="Image URL"
          placeholder="https://www.image.com/image1.png"
          // {...form.getInputProps('imageId')}
          onChange={handleImageUpload}
          data-cy="product-image"
          errorProps={{ 'data-cy': 'product-image-error' }}
        />
        <FileInput
          label="Second Image URL"
          placeholder="https://www.image.com/image2.png"
          onChange={handleSecondImageUpload}
          // {...form.getInputProps('secondImage')}
          errorProps={{ 'data-cy': 'product-image-error' }}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="This is the description of this product"
          {...form.getInputProps('description')}
          data-cy="product-description"
          errorProps={{ 'data-cy': 'product-description-error' }}
        />
        <TextInput
          label="Summary"
          placeholder="Separate summaries with a comma"
          {...form.getInputProps('summary')}
          errorProps={{ 'data-cy': 'product-summary-error' }}
        />
        <TextInput
          withAsterisk
          type="number"
          label="Price"
          placeholder="1000"
          {...form.getInputProps('price')}
          onChange={(e) => form.setFieldValue('price', Number(e.target.value))}
          data-cy="product-price"
          errorProps={{ 'data-cy': 'product-price-error' }}
        />
        <MultiSelect
          data={categoryData}
          label="Category"
          placeholder="Select categories"
          {...form.getInputProps('categories')}
          errorProps={{ 'data-cy': 'product-categories-error' }}
        />

        <Group mt="xl">
          <Button type="submit">
            {isEditing ? 'Save changes' : 'Add new Product'}
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default ProductForm;
