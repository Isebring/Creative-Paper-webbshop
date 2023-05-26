import {
  Checkbox, Table
} from '@mantine/core';
import { useState } from 'react';

function MyOrders() {
  const [data, setData] = useState ([
    {
      id: 1,
      date: '2023-01-01',
      orderId: '0001',
      name: 'Jane Smith',
      amount: 5,
      price: '$100',
      status: false, 
    },
    {
      id: 2,
      date: '2023-02-01',
      orderId: '0002',
      name: 'Jane Smith',
      amount: 3,
      price: '$60',
      status: false, 
    },
    {
      id: 3,
      date: '2023-03-01',
      orderId: '0003',
      name: 'Jane Smith',
      amount: 4,
      price: '$80',
      status: false, 
    },
  ]);
  
  const handleStatusChange = (id: number) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: !row.status } : row
      )
    );
  };

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.date}</td>
      <td>{row.orderId}</td>
      <td>{row.name}</td>
      <td>{row.amount}</td>
      <td>{row.price}</td>
      <td>
      <Checkbox
          checked={row.status}
          onChange={() => handleStatusChange(row.id)}
          color="green"
        />
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Order Id</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default MyOrders;

