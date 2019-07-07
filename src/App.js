import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Homepage from './pages/Homepage';
import Layout from './components/core/layout';
import { ProductProvider } from './components/context/products.context';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthWrapper from './components/core/wrappers/AuthWrapper';
import { AuthProvider } from './components/context/auth.context';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import NotFound from './components/notFound';

toast.configure();

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
              <AuthWrapper exact path="/cart" component={Cart} />
              <AuthWrapper exact path="/checkout" component={Checkout} />
              <AuthWrapper
                type="auth"
                exact
                path="/account"
                component={Account}
              />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
