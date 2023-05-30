import { Button, Group, Modal, Title } from '@mantine/core';
import { useNavigate } from 'react-router';

interface OrderModalProps {
  opened: boolean;
  onClose: () => void;
}

function OrderModal({ opened, onClose }: OrderModalProps) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/signin');
  };

  const handleCreateAccount = () => {
    navigate('/createaccount');
  };

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Authentication" centered>
        <Title order={3}>
          To make your order you have to log in to your account or create a new
          account.
        </Title>
        <Group
          sx={{
            gap: '0.8',
            display: 'flex',
            marginTop: '0.8rem',
          }}
        >
          <Button onClick={handleLogin}>Log in</Button>
          <Button onClick={handleCreateAccount}>Create account</Button>
        </Group>
      </Modal>
    </>
  );
}

export default OrderModal;
