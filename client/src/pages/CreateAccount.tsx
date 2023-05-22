import { Container } from '@mantine/core';
import CreateAccountForm from '../components/CreateAccountForm';

function CreateAccount() {
  return (
    <Container size="xl">
      <CreateAccountForm
        onSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Container>
  );
}

export default CreateAccount;
