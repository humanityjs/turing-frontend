import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Layout from './components/core/layout';
import { ProductProvider } from './components/context/products.context';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthWrapper from './components/core/wrappers/AuthWrapper';
import { AuthProvider } from './components/context/auth.context';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              <AuthWrapper exact path="/" component={Homepage} />
              <AuthWrapper
                exact
                path="/products/:id"
                component={ProductDetails}
              />
              <AuthWrapper type="guest" exact path="/login" component={Login} />
              <AuthWrapper
                type="guest"
                exact
                path="/create-account"
                component={SignUp}
              />
              <Route
                exact
                path="*"
                render={() => (
                  <span>You are missing something. Please go back.</span>
                )}
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
