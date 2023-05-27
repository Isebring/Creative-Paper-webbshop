import {
  Box,
  Button,
  FileInput,
  Group,
  MultiSelect,
  SelectItem, TextInput
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Product } from '../contexts/ProductContext';
import generateID from '../utils/generateID';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  addProduct: (product: Product) => void;
  isEditing: boolean;
  product?: Product;
}

const schema = Yup.object().shape({
  //imageId: Yup.string().required('Image is required'),
  secondImage: Yup.string().required('Second Image is required'),
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
  stock: Yup.number().required('Stock is required'),
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
      secondImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpusheen.com%2F&psig=AOvVaw1T0MVg2Peb63mhZlx1nTKf&ust=1685263526782000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjzlYGOlf8CFQAAAAAdAAAAABAF',
      secondImageId: '',
      summary: [],
      rating: 0,
      usersRated: 0,
      category: [] as never,
      stock: null as never,
    },
  });

  const [categoryData, setCategoryData] = useState<SelectItem[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/category');
      const categories = await response.json();
      
      // Log the original data from the server
      console.log("Original Data:", categories);
  
      const formattedCategories = categories
      .filter((category: any) => typeof category.name === 'string')
      .map((category: any) => ({ value: category.name, label: category.name }));
    
    console.log("Formatted Data:", formattedCategories);
    
  
      setCategoryData(formattedCategories);
    };
    fetchCategories();
  }, []);
  

  useEffect(() => {
    if (isEditing && product) {
      form.setValues(product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isEditing, form.setValues]);

  const addProductToDatabase = async (product: Product) => {
    try {
      console.log('Adding product to database with values:', product);
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      console.log('Server responded with status: ', response.status);

      if (!response.ok) {
        throw new Error(`Could not save product: ${response.statusText}`);
      }

      const savedProduct = await response.json();
      console.log('Product saved in Database: ', savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('Error while saving product in database:', error);
    }
  };

  const handleSubmit = async (
    values: Product,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    console.log('handleSubmit called');
    try {
      console.log('handlesubmit called with values:', values);

      const editedProduct = {
        ...values,
        id: product?._id || '',
        category: values.category || [],
        secondImage: values.secondImage,
      };
      if (isEditing) {
        onSubmit(editedProduct);
      } else {
        const newProduct = { ...editedProduct, _id: generateID() };
        const savedProduct = await addProductToDatabase(newProduct);
        addProduct(savedProduct);
      }
      console.log('Submitting product:', values);
      form.reset();
      navigate('/admin');
    } catch (error) {
      console.error('Error while handling submit:', error);
    }
  };

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedFile) {
      handleImageUpload(selectedFile);
    }
  }, [selectedFile]);

  const handleFileChange = (file: File | null) => {
    console.log('File Selected: ', file);
    setSelectedFile(file);
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
    console.log('Data after Image Upload: ', data);
    form.setFieldValue('imageId', data._id);
    setLoading(false);
  };

  const customFilter = (value: string, selected: boolean, item: SelectItem) => {
    return typeof item.label === 'string' 
      ? item.label.toLowerCase().includes(value.toLowerCase()) 
      : false;
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
          label="Second Image"
          placeholder="https://www.image.com/secondImage.png"
          {...form.getInputProps('secondImage')}
          errorProps={{ 'data-cy': 'product-second-image-error' }}
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
          filter={customFilter}
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
