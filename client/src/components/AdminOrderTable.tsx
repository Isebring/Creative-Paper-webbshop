import { Accordion, Container, Flex, Paper, Table, Title } from '@mantine/core';

function TableAccordion() {
  const data = [
    {
      id: 1,
      date: "2023-01-01",
      orderId: "0001",
      customer: "John Doe",
      amount: 5,
      price: "$100",
      status: "Delivered",
      products: [
        {
          name: "Notebook",
          imageUrl: 'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F90348%252F36%252Fwildflower-22590_front_1680777957.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3Dfbf27af9c76f530fb146420170981a0e?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f6d74b85151d69884edd50ba879631eb',
          price: "$50",
          quantity: 2
        },
        {
          name: "Pencil",
          imageUrl: 'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F90348%252F36%252Fwildflower-22590_front_1680777957.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3Dfbf27af9c76f530fb146420170981a0e?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f6d74b85151d69884edd50ba879631eb',
          price: "$20",
          quantity: 1
        },
        {
          name: "Accessory",
          imageUrl: 'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F90348%252F36%252Fwildflower-22590_front_1680777957.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3Dfbf27af9c76f530fb146420170981a0e?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f6d74b85151d69884edd50ba879631eb',
          price: "$30",
          quantity: 2
        },
      ]
    },
    {
      id: 2,
      date: "2023-02-01",
      orderId: "0002",
      customer: "Jane Smith",
      amount: 3,
      price: "$60",
      status: "Delivered",
      products: [
        {
          name: "Journal",
          imageUrl: 'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F90348%252F36%252Fwildflower-22590_front_1680777957.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3Dfbf27af9c76f530fb146420170981a0e?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f6d74b85151d69884edd50ba879631eb',
          price: "$20",
          quantity: 1
        },

      ]
    },
    {
      id: 3,
      date: "2023-03-01",
      orderId: "0003",
      customer: "Bob Johnson",
      amount: 4,
      price: "$80",
      status: "Processing",
      products: [
        {
          name: "Card",
          imageUrl: 'https://papier.imgix.net/https%3A%2F%2Fpapier.imgix.net%2Fhttps%253A%252F%252Fwww.papier.com%252Fproduct_image%252F90348%252F36%252Fwildflower-22590_front_1680777957.png%3Fixlib%3Drb-3.2.1%26auto%3Dformat%252Ccompress%26s%3Dfbf27af9c76f530fb146420170981a0e?ixlib=rb-3.2.1&w=700&auto=format%2Ccompress&s=f6d74b85151d69884edd50ba879631eb',
          price: "$30",
          quantity: 2
        },
      ]
    },
  ];

  return (
    <Container size="xl">
      <Title mb="sm" ta="left">
        Order Management
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Order Id</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
      </Table>
      {data.map((row) => (
        <Accordion key={row.id}>
          <Accordion.Item value={row.id.toString()}>
            <Accordion.Control>
              <Paper style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', }}>
                <div>{row.date}</div>
                <div>{row.orderId}</div>
                <div>{row.customer}</div>
                <div>{row.amount}</div>
                <div>{row.price}</div>
                <div>{row.status}</div>
              </Paper>
            </Accordion.Control>
            <Accordion.Panel>
              {row.products.map((product, index) => (
                <Flex direction="row">
                <div key={index}>
                <Flex gap="xl">
                  <img style={{ objectFit: 'cover' }}  height="80rem" width="50rem" src={product.imageUrl} alt={product.name} />
                  <Flex direction="column">
                  <div>{product.name}</div>
                  <Flex direction="row">
                  <div>{product.quantity}x </div>
                  <div> {product.price}</div>
                  </Flex>
                  </Flex>
                  </Flex>
                </div>
                </Flex>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ))}
    </Container>
  );
}

export default TableAccordion;
