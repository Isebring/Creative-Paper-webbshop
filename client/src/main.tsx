import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import ProductProvider from './contexts/ProductContext';
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import './index.css';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import { Contact } from './pages/Contact';
import EditProduct from './pages/EditProduct';
import { Faq } from './pages/Faq';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import ProductDetails from './pages/ProductDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/product/:id" element={<EditProduct />} />
      <Route path="/admin/product/:id/edit" element={<EditProduct />} />
      <Route path="/admin/product/new" element={<NewProduct />} />
      <Route path="/confirmation" element={<Confirmation />} />
    </Route>
  )
);

function Root() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <React.StrictMode>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            primaryColor: 'blue',
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications data-cy="added-to-cart-toast" />
          <ProductProvider>
            <ShoppingCartProvider>
              <RouterProvider router={router} />
            </ShoppingCartProvider>
          </ProductProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
);
