import { createContext, ReactNode, useContext } from 'react';
import { CartItem } from '../../data';
import { FormValues } from '../components/CheckoutForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { ProductContext } from './ProductContext';

interface ShoppingCartContext {
  getProductQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartProducts: CartItem[];
  cartQuantity: number;
  orders: Order[];
  addOrder: (cartProducts: CartItem[], formData: FormValues) => void;
}

interface Order {
  id: number;
  cartProducts: (CartItem | { formData: FormValues })[];
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartContext = createContext<ShoppingCartContext>(
  null as any
);

interface Props {
  children: ReactNode;
}

function ShoppingCartProvider({ children }: Props) {
  const { products } = useContext(ProductContext);
  const [cartProducts, setCartProducts] = useLocalStorage<CartItem[]>(
    'cart',
    []
  );

  const [orders, setOrders] = useLocalStorage<Order[]>('Orders:', []);

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => product.quantity + quantity,
    0
  );

  function getProductQuantity(id: string) {
    return cartProducts.find((product) => product.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    const productToAdd = products.find((product) => product.id === id);
    if (!productToAdd) {
      return;
    }

    setCartProducts((currentProducts) => {
      if (currentProducts.find((product) => product.id === id) == null) {
        return [...currentProducts, { ...productToAdd, quantity: 1 }];
      } else {
        return currentProducts.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartProducts((currentProducts) => {
      if (
        currentProducts.find((product) => product.id === id)?.quantity === 1
      ) {
        return currentProducts.filter((product) => product.id !== id);
      } else {
        return currentProducts.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== id);
    });
  }

  const addOrder = (cartProducts: CartItem[], formData: FormValues) => {
    const newOrder: Order = {
      id: orders.length + 1,
      cartProducts: [...cartProducts, { formData }],
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCartProducts([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getProductQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartProducts,
        cartQuantity,
        orders,
        addOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
