import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import './index.css';
import { Accessories } from './pages/Accessories';
import Admin from './pages/Admin';
import { Calendars } from './pages/Calendar';
import { Cards } from './pages/Cards';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import CreateAccount from './pages/CreateAccount';
import EditProduct from './pages/EditProduct';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import { Notebooks } from './pages/Notebooks';
import OrdersByUser from './pages/OrdersByUser';
import { Pens } from './pages/Pens';
import ProductDetails from './pages/ProductDetails';
import SignIn from './pages/SignIn';
import Root from './root';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/pens" element={<Pens />} />
      <Route path="/notebooks" element={<Notebooks />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/calendars" element={<Calendars />} />
      <Route path="/accessories" element={<Accessories />} />
      <Route path="/products/:_id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/products/:id" element={<EditProduct />} />
      {/* <Route path="/admin/products/:_id/edit" element={<EditProduct />} /> */}
      <Route path="/admin/products/new" element={<NewProduct />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/test" element={<OrdersByUser />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
