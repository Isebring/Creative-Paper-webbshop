import { Container, Title } from '@mantine/core';
import MyOrders from '../components/MyOrders';

function UserAccount() {
  return (
    <Container>
      <Title align='center'>My Account</Title>
      <MyOrders />
    </Container>
  );
}

export default UserAccount;
