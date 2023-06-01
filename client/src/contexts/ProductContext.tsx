/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from 'react';
import { Category } from '../components/CategoryFilter';

export interface Product {
  _id: string;
  image: string;
  imageId: string;
  secondImageId: string;
  title: string;
  description: string;
  summary: string;
  stock: number;
  price: number;
  categories: Category[];
  rating: number;
  usersRated: number;
}

interface ProductContextType {
  products: Product[];
  getProductById: (_id: string) => Promise<Product | null>;
  addProduct: (product: Product) => void;
  deleteProduct: (_id: string) => void;
  updateProduct: (productId: string, product: Product) => void;
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
  // const { id } = useParams<{ id: string }>();

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
      console.log('Adding product:', product);

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async function updateProduct(productId: string, updatedProduct: Product) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
        credentials: 'same-origin',
      });

      if (response.ok) {
        const { newProduct, oldProductId } = await response.json();
        setProducts((prevProducts) => {
          const productIndex = prevProducts.findIndex(
            (p) => p._id === oldProductId,
          );
          if (productIndex !== -1) {
            const updatedProducts = [...prevProducts];
            updatedProducts.splice(productIndex, 1, newProduct);
            return updatedProducts;
          }
          return prevProducts;
        });
      } else {
        console.error('Failed to update product');
      }
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
