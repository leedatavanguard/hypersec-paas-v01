import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import Router from './Router';

const theme = {
  token: {
    colorPrimary: '#123456',
    borderRadius: 6,
    colorLink: '#123456',
    colorLinkHover: '#234567',
  },
  components: {
    Menu: {
      itemSelectedBg: '#123456',
      itemSelectedColor: '#ffffff',
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;