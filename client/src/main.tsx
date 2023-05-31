import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import App from './App';
import Protected from './components/Protected';
import './index.css';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import { CategoryPage } from './pages/CategoryPage';
import Confirmation from './pages/Confirmation';
import CreateAccount from './pages/CreateAccount';
import EditProduct from './pages/EditProduct';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import ProductDetails from './pages/ProductDetails';
import SignIn from './pages/SignIn';
import UserAccount from './pages/UserAccount';
import Root from './root';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/products/:_id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Cart />} />
      <Route
        path="/admin"
        element={
          <Protected>
            <Admin />
          </Protected>
        }
      />
      <Route path="/admin/products/:id" element={<EditProduct />} />
      {/* <Route path="/admin/products/:_id/edit" element={<EditProduct />} /> */}
      <Route path="/admin/products/new" element={<NewProduct />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/my-account" element={<UserAccount />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
