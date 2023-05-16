import { Box, Button, Group, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

export interface FormValues {
  fullName: string;
  email: string;
  adress: string;
  zipCode: string;
  mobileNr: string;
  city: string;
}

const schema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name should have at least 2 letters')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
  adress: Yup.string()
    .min(2, 'Your adress should have at least 2 letters')
    .required('This field is required'),
  zipCode: Yup.string()
    .min(5, 'this field should be 5 numbers long')
    .max(5, 'this field should be 5 numbers long')
    .required('This field is required'),
  mobileNr: Yup.string()
    .min(10, 'Your phone nr should be 10 numbers long')
    .max(10, 'Your phone nr should be 10 numbers long')
    .required('This field is required'),
  city: Yup.string()
    .min(2, 'Name should have at least 2 letters')
    .max(50, 'This field is too big')
    .required('This field is required'),
});

function CheckoutForm() {
  const navigate = useNavigate();
  const { addOrder, cartProducts } = useShoppingCart();
  const onSubmit = (data: FormValues) => {
    addOrder(cartProducts, data);
    navigate('/confirmation');
  };

  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      fullName: '',
      email: '',
      adress: '',
      zipCode: '',
      mobileNr: '',
      city: '',
    },
  });

  return (
    <Box
      sx={{
        width: '22rem',
        '@media(max-width:721px)': {
          flexDirection: 'column',
          width: '20rem',
        },
      }}
    >
      <Title mb="sm" order={3}>
        Your details
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)} data-cy="customer-form">
        <TextInput
          autoComplete="name"
          withAsterisk
          label="Full Name"
          placeholder="Firstname Lastname"
          {...form.getInputProps('fullName')}
          data-cy="customer-name"
          errorProps={{ 'data-cy': 'customer-name-error' }}
        />
        <TextInput
          autoComplete="email"
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          errorProps={{ 'data-cy': 'customer-email-error' }}
          data-cy="customer-email"
        />
        <TextInput
          autoComplete="street-address"
          withAsterisk
          label="Adress"
          placeholder="ex: Bigboiroad 31"
          {...form.getInputProps('adress')}
          data-cy="customer-address"
          errorProps={{ 'data-cy': 'customer-address-error' }}
        />
        <TextInput
          autoComplete="address-level2"
          withAsterisk
          label="City"
          placeholder="ex: Gothenburg"
          {...form.getInputProps('city')}
          data-cy="customer-city"
          errorProps={{ 'data-cy': 'customer-city-error' }}
        />
        <TextInput
          autoComplete="postal-code"
          withAsterisk
          type="number"
          label="Zip Code"
          placeholder="ex: 43152"
          {...form.getInputProps('zipCode')}
          data-cy="customer-zipcode"
          errorProps={{ 'data-cy': 'customer-zipcode-error' }}
        />
        <TextInput
          autoComplete="tel"
          type="number"
          withAsterisk
          label="Mobile nr"
          placeholder="ex: 0700415160"
          {...form.getInputProps('mobileNr')}
          data-cy="customer-phone"
          errorProps={{ 'data-cy': 'customer-phone-error' }}
        />
        <Group position="right" mt="md">
          <Button sx={{ width: '100%' }} type="submit">
            Place order
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default CheckoutForm;
