import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import {
  RouterProvider
} from 'react-router-dom';
import ProductProvider from './contexts/ProductContext';
import ShoppingCartProvider from './contexts/ShoppingCartContext';
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

  export default Root;