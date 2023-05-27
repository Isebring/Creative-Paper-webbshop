/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from 'react';

export interface Product {
  _id: string;
  imageURL: string;
  imageId: string;
  secondImage: string;
  title: string;
  description: string;
  summary: string[];
  price: number;
  category: string[];
  rating: number;
  usersRated: number;
  secondImageId: string;
  stock: number;
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

  async function addProduct(product: Product) {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
  
      if (!response.ok) {
        throw new Error(`Could not save product: ${response.statusText}`);
      }
  
      const savedProduct = await response.json();
  
      setProducts((currentProducts) => [...currentProducts, savedProduct]);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

  async function updateProduct(updatedProduct: Product) {
    try {
      const response = await fetch(`/api/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });
  
      if (!response.ok) {
        throw new Error(`Could not update product: ${response.statusText}`);
      }
  
      const savedProduct = await response.json();
      
      setProducts((currentProducts) => 
        currentProducts.map((product) =>
          product._id === updatedProduct._id ? savedProduct : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  
  

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
