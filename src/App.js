import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Layout from './components/core/layout';
import { ProductProvider } from './components/context/products.context';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/products/:id" component={ProductDetails} />
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
  );
}

export default App;
