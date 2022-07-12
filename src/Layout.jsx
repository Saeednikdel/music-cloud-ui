import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

const Layout = () => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  );
};

export default Layout;
