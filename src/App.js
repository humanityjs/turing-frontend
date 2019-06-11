import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Layout from './components/core/layout';
import { SearchProvider } from './components/context/products.context';

function App() {
  return (
    <SearchProvider>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route
              exact
              path="*"
              render={() => <span>You are missing please go back.</span>}
            />
          </Switch>
        </BrowserRouter>
      </Layout>
    </SearchProvider>
  );
}

export default App;
