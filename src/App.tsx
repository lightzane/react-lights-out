import React from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

export const App: React.FC = () => {
  return <>
    <Layout className='align-items-center'>
      <Home />
    </Layout>
  </>;
};
