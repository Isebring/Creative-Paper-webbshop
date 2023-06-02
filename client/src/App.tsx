import { Outlet } from 'react-router-dom';
import { FooterCentered } from './components/Footer';
import { HeaderResponsive } from './components/Navbar';

function App() {
  const footerLinks = [
    { link: '/terms-of-service', label: 'Terms of Service' },
    { link: '/privacy-policy', label: 'Privacy Policy' },
  ];

  return (
    <div>
      <HeaderResponsive />
      <main>
        <Outlet />
      </main>
      <FooterCentered links={footerLinks} />
    </div>
  );
}
export default App;
