/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from 'react';

export interface Product {
  _id: string;
  image: string;
  imageId: string;
  secondImage: string;
  title: string;
  description: string;
  summary: string[];
  price: number;
  category: string[];
  rating: number;
  usersRated: number;
}

interface ProductContextType {
  products: Product[];
  getProductById: (_id: string) => Promise<Product | null>;
  addProduct: (product: Product) => void;
  deleteProduct: (_id: string) => void;
  updateProduct: (product: Product) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  getProductById: () => Promise.resolve(null),
  addProduct: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
});

export interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  async function getProductById(_id: string): Promise<Product | null> {
    try {
      const response = await fetch(`/api/products/${_id}`);
      console.log('getProductById', _id);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  function deleteProduct(_id: string) {
    setProducts((currentProducts) => {
      return currentProducts.filter((product) => product._id !== _id);
    });
  }

  function addProduct(product: Product) {
    setProducts((currentProducts) => [...currentProducts, product]);
  }

  const updateProduct = (updatedProduct: Product) => {
    const newProducts = products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product,
    );

    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        deleteProduct,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
