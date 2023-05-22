import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import './index.css';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import { Contact } from './pages/Contact';
import CreateAccount from './pages/CreateAccount';
import EditProduct from './pages/EditProduct';
import { Faq } from './pages/Faq';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import ProductDetails from './pages/ProductDetails';
import Root from './root';

export const router = createBrowserRouter(
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
      <Route path="/createaccount" element={<CreateAccount />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
