import Head from 'next/head';
import Header from './header.js';
import Footer from './footer.js';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>Refr - link shortener</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
