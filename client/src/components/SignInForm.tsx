import styled from '@emotion/styled';
import { Box, Button, Center, Text, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useUserContext } from '../contexts/UseUserContext';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email, please use the format example@example.com')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function SignInForm() {
  const navigate = useNavigate();
  const { login } = useUserContext();
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log(form.values.email, 'Signed in! :)');
    try {
      await login(values.email, values.password);
      form.reset();
      navigate('/');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Incorrect email or password, please try again!',
        color: 'red',
      });
    }
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
          <Title
            order={2}
            sx={{
              paddingTop: '3rem',
            }}
          >
            Sign In
          </Title>
        </Center>
      </Box>
      <form onSubmit={form.onSubmit(handleSubmit)} data-cy="signin-form">
        <TextInput
          autoComplete="email"
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}
      >
        <Text fz="sm" fw={500}>
          New here?{' '}
          <StyledLink to="/createaccount">Create an account</StyledLink>
        </Text>
      </Box>
    </Box>
  );
}

const StyledLink = styled(Link)({
  color: 'black',
  fontWeight: 'normal',
  textDecoration: 'underline',
  '&:hover': {
    color: 'gray',
  },
});

export default SignInForm;
