import { createContext, ReactNode, useContext } from 'react';
import { CartItem } from '../components/CartProduct';
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

export const ShoppingCartContext = createContext<ShoppingCartContext>(
  null as never,
);

interface Props {
  children: ReactNode;
}

function ShoppingCartProvider({ children }: Props) {
  const { products } = useContext(ProductContext);
  const [cartProducts, setCartProducts] = useLocalStorage<CartItem[]>(
    'cart',
    [],
  );

  const [orders, setOrders] = useLocalStorage<Order[]>('Orders:', []);

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => product.quantity + quantity,
    0,
  );

  function getProductQuantity(id: string) {
    return cartProducts.find((product) => product._id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    if (!products) return;
    const productToAdd = products.find((product) => product._id === id);
    if (!productToAdd) {
      return;
    }

    setCartProducts((currentProducts) => {
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
    setCartProducts((currentProducts) => {
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
    setCartProducts((currentProducts) => {
      return currentProducts.filter((product) => product._id !== id);
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
