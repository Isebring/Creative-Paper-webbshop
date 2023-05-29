import { Button, Modal, Title } from '@mantine/core';
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
        <Title>
          You have to create or log in to an account to make your order!
        </Title>
        <Button onClick={handleLogin}>Log in</Button>
        <Button onClick={handleCreateAccount}>Create account</Button>
      </Modal>
    </>
  );
}

export default OrderModal;
