import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../components/CartItem';
import { FormValues } from '../components/CheckoutForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { Order } from './OrderContext';
import { ProductContext } from './ProductContext';

interface ShoppingCartContext {
  getProductQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartItems: CartItem[];
  cartQuantity: number;
  orders: Order[];
  currentOrderId: string | null;
  createOrder: (
    cartItems: CartItem[],
    formData: FormValues,
  ) => Promise<Order | null>;
}

export const ShoppingCartContext = createContext<ShoppingCartContext>(
  null as never,
);

interface Props {
  children: ReactNode;
}

function ShoppingCartProvider({ children }: Props) {
  const { products } = useContext(ProductContext);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useLocalStorage<Order[]>('Orders:', []);

  const cartQuantity = cartItems.reduce(
    (quantity, product) => product.quantity + quantity,
    0,
  );

  function getProductQuantity(id: string) {
    return cartItems.find((product) => product._id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    if (!products) return;
    const productToAdd = products.find((product) => product._id === id);
    if (!productToAdd) {
      return;
    }

    setCartItems((currentProducts) => {
      if (currentProducts.find((product) => product._id === id) == null) {
        return [...currentProducts, { ...productToAdd, quantity: 1 }];
      } else {
        return currentProducts.map((product) => {
          if (product._id === id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currentProducts) => {
      if (
        currentProducts.find((product) => product._id === id)?.quantity === 1
      ) {
        return currentProducts.filter((product) => product._id !== id);
      } else {
        return currentProducts.map((product) => {
          if (product._id === id) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currentProducts) => {
      return currentProducts.filter((product) => product._id !== id);
    });
  }

  const createOrder = async (
    cartItems: CartItem[],
    formData: FormValues,
  ): Promise<Order | null> => {
    const orderItems = cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const newOrder = {
      orderItems,
      deliveryAddress: formData,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Failed to create order.');
      }

      const responseData = await response.json();
      const order: Order = responseData.data; // Assuming the order ID is present in the "data" field of the response
      const orderId = order._id; // Extract the order ID from the response
      setCurrentOrderId(orderId);
      setOrders((prevOrders) => [...prevOrders, order]);
      setCartItems([]);
      return order;
    } catch (error) {
      console.error(error);
      // handle error appropriately, for example show an error message to user
      return null;
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getProductQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        orders,
        currentOrderId,
        createOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
