import { Box, Table, Title } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function UserOrderTable() {
  const ths = (
    <tr>
      <th>Date</th>
      <th>Order</th>
      <th>Customer</th>
      <th>Amount</th>
      <th>Price</th>
      <th>Status</th>
    </tr>
  );

  const rows = elements.map((element) => (
    <tr key={element.name /**order._id */}>
      <td>{element.position /**order.date */}</td>
      <td>{element.name /**order._id */}</td>
      <td>{element.symbol /**order.customer */}</td>
      <td>{element.mass /**order.amount */}</td>
      <td>{element.mass /**order.price */}</td>
      <td>{element.mass /**order.status */}</td>
    </tr>
  ));
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Title>Admin - Order Management </Title>
      <Table
        striped
        highlightOnHover
        withBorder
        withColumnBorders
        sx={
          {
            //   width: '60%',
          }
        }
      >
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
}

export default UserOrderTable;
