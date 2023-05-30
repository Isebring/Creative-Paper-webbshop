import { useContext } from 'react';
import { OrderContext } from './OrderContext';

export function useOrderContext() {
  return useContext(OrderContext);
}
