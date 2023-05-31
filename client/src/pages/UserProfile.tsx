import { Container, Title } from '@mantine/core';
import MyOrders from '../components/MyOrders';

function UserProfile() {
  return (
    <Container>
      <Title align='center'>My Account</Title>
      <MyOrders />
    </Container>
  );
}

export default UserProfile;
