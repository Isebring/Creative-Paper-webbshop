import { Box, Button, Center, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface SignInFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function SignInForm({ onSubmit }: SignInFormProps) {
  const navigate = useNavigate();
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    form.reset();
  }, [form]);

  const handleSubmit = (values: { email: string; password: string }) => {
    onSubmit(values);
    form.reset();
    navigate('/dashboard');
  };

  return (
    <Box
      maw={300}
      mx="auto"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Center>
          <Title>Sign In</Title>
        </Center>
      </Box>
      <form onSubmit={form.onSubmit(handleSubmit)} data-cy="signin-form">
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@example.com"
          {...form.getInputProps('email')}
          data-cy="signin-email"
          errorProps={{ 'data-cy': 'signin-email-error' }}
        />
        <TextInput
          withAsterisk
          type="password"
          label="Password"
          placeholder="********"
          {...form.getInputProps('password')}
          data-cy="signin-password"
          errorProps={{ 'data-cy': 'signin-password-error' }}
        />
        <Center>
          <Button
            type="submit"
            sx={{
              marginTop: '1rem',
              width: '100%',
            }}
          >
            Sign In
          </Button>
        </Center>
      </form>
      <Box>{/* <Text>Are you new here?</Text> */}</Box>
    </Box>
  );
}

export default SignInForm;
