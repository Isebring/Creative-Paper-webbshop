import { createContext, useContext, useEffect, useState } from 'react';

export interface Product {
  id: string;
  image: string;
  secondImage: string;
  title: string;
  description: string;
  summary: string[];
  price: number;
  rating: number;
  usersRated: number;
}

interface ProductContextType {
  products: Product[] | null;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: null,
  addProduct: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
});

export const useProduct = () => useContext(ProductContext);

export interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
      product.id === updatedProduct.id ? updatedProduct : product,
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
};

export default ProductProvider;
