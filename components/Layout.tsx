import Meta from 'components/Meta';
import Header from 'components/Header';
import Footer from 'components/Footer';

import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
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
