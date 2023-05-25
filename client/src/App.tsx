import { Outlet } from 'react-router-dom';
import { FooterCentered } from './components/Footer';
import { HeaderResponsive, HeaderResponsiveProps } from './components/Navbar';

function App() {
  const headerLinks: HeaderResponsiveProps['links'] = [
    { link: '/', label: 'All Products' },
    { link: '/pens', label: 'Pens' },
    { link: '/notebooks', label: 'Notebooks & Journals' },
    { link: '/cards', label: 'Cards' },
    { link: '/calendars', label: 'Calendars & Planners' },
    { link: '/accessories', label: 'Accessories' },
  ];

  const footerLinks = [
    { link: '/terms-of-service', label: 'Terms of Service' },
    { link: '/privacy-policy', label: 'Privacy Policy' },
  ];

  return (
    <div>
      <HeaderResponsive links={headerLinks} />
      <main>
        <Outlet />
      </main>
      <FooterCentered links={footerLinks} />
    </div>
  );
}
export default App;
