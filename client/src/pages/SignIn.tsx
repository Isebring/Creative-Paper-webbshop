import { Container } from '@mantine/core';
import SignInForm from '../components/SignInForm';

function SignIn() {
  return (
    <Container size="xl">
      <SignInForm
        onSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Container>
  );
}

export default SignIn;
