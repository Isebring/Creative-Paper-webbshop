import { useContext } from 'react';
import { ShoppingCartContext } from './ShoppingCartContext';

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
