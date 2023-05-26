import {
  Box,
  Button,
  FileInput,
  Group,
  MultiSelect,
  TextInput
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Product } from '../contexts/ProductContext';
import generateID from '../utils/generateID';
import { categoryData } from './CategoryData';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  addProduct: (product: Product) => void;
  isEditing: boolean;
  product?: Product;
}

const schema = Yup.object().shape({
  imageId: Yup.string().required('Image is required'),
  secondImageId: Yup.string().required('Second Image ID is required'),
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
  category: Yup.array()
    .of(Yup.string().min(2))
    .required('At least one category is required'),
    stock: Yup.number()
    .required('Stock is required'),
});

function ProductForm({
  onSubmit,
  addProduct,
  isEditing,
  product,
}: ProductFormProps) {
  const navigate = useNavigate();
  const form = useForm<Product>({
    validate: yupResolver(schema),
    initialValues: {
      _id: '',
      imageURL: '',
      imageId: '',
      title: '',
      description: '',
      price: null as never,
      secondImage: '',
      secondImageId: '',
      summary: [],
      rating: 0,
      usersRated: 0,
      category: [] as never,
      stock: null as never,
    },
  });

  useEffect(() => {
    if (isEditing && product) {
      form.setValues(product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isEditing, form.setValues]);

  const addProductToDatabase = async (product: Product) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error(`Could not save product: ${response.statusText}`);
    }

    const savedProduct = await response.json();
    return savedProduct;
  };

  const handleSubmit =  async (values: Product, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const editedProduct = {
      ...values,
      id: product?._id || '',
      category: values.category || [],
    };
    if (isEditing) {
      onSubmit(editedProduct);
    } else {
      const newProduct = { ...editedProduct, _id: generateID() };
      const savedProduct = await addProductToDatabase(newProduct);
      addProduct(savedProduct);
    }
    form.reset();
    navigate('/admin');
  };

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedFile) {
      handleImageUpload(selectedFile);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };
  

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setLoading(true);
    // Indicate that image is being uploaded.
    form.setFieldValue('imageId', 'uploading...');
  
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`Could not upload file: ${response.statusText}`);
    }
  
    const data = await response.json();
    form.setFieldValue('imageId', data._id);
    setLoading(false);
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
          label="Image"
          placeholder="https://www.image.com/image1.png"
          value={selectedFile}
          onChange={handleFileChange}
          data-cy="product-image"
          errorProps={{ 'data-cy': 'product-image-error' }}
        />
        <TextInput
          label="Second Image URL"
          placeholder="https://www.image.com/image2.png"
          {...form.getInputProps('secondImageId')}
          errorProps={{ 'data-cy': 'product-image-error' }}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="This is the description of this product."
          {...form.getInputProps('description')}
          data-cy="product-description"
          errorProps={{ 'data-cy': 'product-description-error' }}
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
         <TextInput
          withAsterisk
          type="number"
          label="Stock"
          placeholder="100"
          {...form.getInputProps('stock')}
          onChange={(e) => form.setFieldValue('stock', Number(e.target.value))}
        />
        <MultiSelect
          data={categoryData}
          label="Category"
          placeholder="Select categories"
          {...form.getInputProps('category')}
          errorProps={{ 'data-cy': 'product-categories-error' }}
        />

        <Group mt="xl">
          <Button type="submit" disabled={loading}>
            {isEditing ? 'Save changes' : 'Add new Product'}
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default ProductForm;
