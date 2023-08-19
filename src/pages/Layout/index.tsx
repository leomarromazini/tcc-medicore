import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

const RoutesLayout = () => {
  return (
    <Layout
      style={{
        background: 'var(--background)',
        minHeight: '100vh',
        minWidth: 1100,
      }}
    >
      <Header />

      <Outlet />
      <Footer />
    </Layout>
  );
};

export default RoutesLayout;
