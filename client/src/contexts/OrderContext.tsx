import React, { createContext, useState } from 'react';

export interface Product {
  _id: string;
  title: string;
  description: string;
  summary: string;
  categories: string; // This might need to be adjusted based on the actual data type.
  price: number;
  quantity: number;
  stock: number;
  imageId: string;
  imageURL: string;
  secondImageId: string;
  secondImageURL: string;
  rating: number;
  usersRated: number;
  isArchived: boolean;
}

export interface OrderItem {
  product: Product;
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
  currentOrder: Order | null;
  getOrdersByUser: () => void;
  getAllOrders: () => void;
  getOrderById: (_id: string) => Promise<Order | null>;
  createOrder: (order: Order) => Promise<Order | null>;
}

export const OrderContext = createContext<OrderContextProps>({
  orders: [],
  currentOrder: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getOrdersByUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAllOrders: () => {},
  getOrderById: () => Promise.resolve(null),
  createOrder: () => Promise.resolve(null),
});

// export const useOrderContext = () => useContext(OrderContext); // in another file

export const OrderProvider = ({ children }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

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
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders.');
      }
      const orders = await response.json();
      setOrders(orders);
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

  const createOrder = async (order: Order): Promise<Order | null> => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!res.ok) {
        throw new Error('Failed to create order.');
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
        currentOrder,
        getOrdersByUser,
        getAllOrders,
        getOrderById,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
