import Meta from './meta.js';
import Header from './header.js';
import Footer from './footer.js';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
