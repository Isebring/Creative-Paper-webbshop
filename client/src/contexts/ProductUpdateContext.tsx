import { createContext, ReactNode, useContext, useState } from 'react';
import { ProductProviderProps } from './ProductContext';

interface UpdateContextProps {
    update: boolean;
    setUpdate: (update: boolean) => void;
}

interface ProductUpdateProviderProps {
    children: ReactNode;
  }
  

const ProductUpdateContext = createContext<UpdateContextProps | undefined>(undefined);

export function ProductUpdateProvider({ children }: ProductProviderProps) {
  const [update, setUpdate] = useState(false);

  const value = { update, setUpdate };

  return (
    <ProductUpdateContext.Provider value={value}>
      {children}
    </ProductUpdateContext.Provider>
  );
}

export function useProductUpdate() {
  const context = useContext(ProductUpdateContext);

  if (!context) {
    throw new Error('useProductUpdate must be used within a ProductUpdateProvider');
  }

  return context;
}
