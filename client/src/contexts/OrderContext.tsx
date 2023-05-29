import React, { createContext, useState } from 'react';

export interface OrderProduct {
  _id: string;
  title: string;
  price: number;
}

export interface OrderItem {
  product: OrderProduct;
  quantity: number;
  price: number;
}

export interface DeliveryAddress {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  orderItems: OrderItem[];
  totalPrice: number;
  date: Date;
  status: 'in progress' | 'shipped';
  deliveryAddress: DeliveryAddress;
  createdAt: Date;
}

interface Props {
  children: React.ReactNode;
}

interface OrderContextProps {
  orders: Order[];
  getOrdersByUser: () => void;
  getAllOrders: () => void;
  getOrderById: (_id: string) => Promise<Order | null>;
}

export const OrderContext = createContext<OrderContextProps>({
  orders: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getOrdersByUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAllOrders: () => {},
  getOrderById: () => Promise.resolve(null),
});

export const OrderProvider = ({ children }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrdersByUser = async () => {
    try {
      const res = await fetch('/api/orders/user');
      if (!res.ok) {
        throw new Error('Failed to fetch orders.');
      }
      const { data: orders } = await res.json();
      console.log('Orders fetched:', orders); // Debugging line
      setOrders(orders);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await fetch('/api/orders/all');
      if (!response.ok) {
        throw new Error('Failed to fetch orders.');
      }
      const { data } = await response.json();
      console.log(data);
      setOrders(data);
      console.log('Fetched orders:', data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderById = async (_id: string): Promise<Order | null> => {
    try {
      const res = await fetch(`/api/orders/${_id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch order.');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrdersByUser,
        getAllOrders,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
