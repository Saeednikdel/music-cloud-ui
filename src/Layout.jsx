import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';

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
