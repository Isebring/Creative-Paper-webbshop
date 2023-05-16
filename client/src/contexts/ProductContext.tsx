import { createContext, ReactNode } from 'react';
import { Product, products as mockedProducts } from '../../data/index';
import useLocalStorage from '../hooks/useLocalStorage';

interface ContextValue {
  products: Product[];
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
}

export const ProductContext = createContext<ContextValue>(null as any);

interface Props {
  children: ReactNode;
}

function ProductProvider({ children }: Props) {
  const [products, setProducts] = useLocalStorage<Product[]>(
    'products',
    mockedProducts
  );

  function deleteProduct(id: string) {
    setProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== id);
    });
  }

  function addProduct(product: Product) {
    setProducts((currentProducts) => [...currentProducts, product]);
  }

  const updateProduct = (updatedProduct: Product) => {
    const newProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );

    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  return (
    <ProductContext.Provider
      value={{ products, deleteProduct, addProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
