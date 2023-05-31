import React, { createContext, useState } from 'react';

export interface OrderProduct {
  _id: string;
  title: string;
  imageId: string;
  price: number;
}

export interface OrderItem {
  product: OrderProduct;
  imageId: string;
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
  updateOrderStatus: (_id: string, status: 'in progress' | 'shipped') => void;
}

export const OrderContext = createContext<OrderContextProps>({
  orders: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getOrdersByUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAllOrders: () => {},
  getOrderById: () => Promise.resolve(null),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateOrderStatus: () => {},
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
      setOrders(data);
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

  const updateOrderStatus = async (
    _id: string,
    status: 'in progress' | 'shipped',
  ) => {
    try {
      const res = await fetch(`/api/orders/status/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error('Failed to update order status.');
      }
      await res.json();
      getAllOrders(); // refresh all orders
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrdersByUser,
        getAllOrders,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
