import { useContext } from 'react';
import { ProductContext } from './ProductContext';

export function useProductContext() {
  return useContext(ProductContext);
}
