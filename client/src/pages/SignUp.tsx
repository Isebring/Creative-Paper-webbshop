import { Container } from '@mantine/core';
import SignUpForm from '../components/SignUpForm';

function SignUp() {
  return (
    <Container size="xl">
      <SignUpForm
        onSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Container>
  );
}

export default SignUp;
