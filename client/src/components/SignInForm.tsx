import styled from '@emotion/styled';
import { Box, Button, Center, Text, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface SignInFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email, please use the format example@example.com')
    .required('Email is required'),
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

  const handleSubmit = (values: { email: string; password: string }) => {
    onSubmit(values);
    form.reset();
    navigate('/');
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
      <Box sx={{ paddingTop: '1rem' }}>
        <Text fz="sm">
          New here?{' '}
          <StyledLink to="/createaccount">Create an account</StyledLink>
        </Text>
      </Box>
    </Box>
  );
}

const StyledLink = styled(Link)({
  color: 'grey',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default SignInForm;
