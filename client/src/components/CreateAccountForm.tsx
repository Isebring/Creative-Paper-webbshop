import { Box, Button, Center, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface Props {
  onSubmit: (credentials: { email: string; password: string }) => void;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email, please use the format example@example.com')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function CreateAccountForm({ onSubmit }: Props) {
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
          <Title>Create your account</Title>
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
            Sign up
          </Button>
        </Center>
      </form>
    </Box>
  );
}

export default CreateAccountForm;
