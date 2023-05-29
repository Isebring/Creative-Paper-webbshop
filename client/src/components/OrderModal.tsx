import { Modal, Title } from '@mantine/core';

interface OrderModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function OrderModal({ opened, onClose, onSubmit }: OrderModalProps) {
  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Authentication" centered>
        <Title>
          You have to create or log in to an account to make your order!
        </Title>
      </Modal>
      {/* 
      <Group position="center">
        <Button onClick={onClose}>Close Modal</Button>
      </Group> */}
    </>
  );
}

export default OrderModal;
