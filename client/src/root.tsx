import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import ProductProvider from './contexts/ProductContext';
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import { UserProvider } from './contexts/UserContext';
import './index.css';
import { router } from './main';

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
            primaryColor: 'violet',
            fontFamily: 'Ovo, serif',
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications data-cy="added-to-cart-toast" />
          <ProductProvider>
            <UserProvider>
              <ShoppingCartProvider>
                <RouterProvider router={router} />
              </ShoppingCartProvider>
            </UserProvider>
          </ProductProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
  );
}

export default Root;
