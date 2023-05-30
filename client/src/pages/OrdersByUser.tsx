import { Text } from '@mantine/core';
import { useEffect } from 'react';
import { useOrderContext } from '../contexts/UseOrderContext';

export function OrdersByUser() {
  const { getOrdersByUser, orders } = useOrderContext();

  useEffect(() => {
    getOrdersByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>User's Orders</h1>
      {orders &&
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Total Price: {order.totalPrice}</p>
            <h4>Products:</h4>
            {order.orderItems.map((orderItem, index) =>
              orderItem.product ? (
                <div key={order._id + index}>
                  <p>Product ID: {orderItem.product._id}</p>
                  {/* <Image
                    src={orderItem.product.image}
                    height={150}
                    width={220}
                    fit="cover"
                  /> */}
                  <Text fw={700}>Product Title: {orderItem.product.title}</Text>
                  <p>Quantity: {orderItem.quantity}</p>
                  <p>Price: {orderItem.price}</p>
                </div>
              ) : (
                <div key={order._id + index}>
                  <p>Product not found for this order item</p>
                </div>
              ),
            )}
          </div>
        ))}
    </div>
  );
}

export default OrdersByUser;
