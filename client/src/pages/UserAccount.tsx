import { Container, Title } from '@mantine/core';
import MyOrders from '../components/MyOrders';

function UserAccount() {
  return (
    <Container>
      <Title align="center" mt="1rem" mb="1rem">
        My Account
      </Title>
      <MyOrders />
    </Container>
  );
}

export default UserAccount;
