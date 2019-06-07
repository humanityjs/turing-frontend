import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';

function App() {
  return (
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
  );
}

export default App;
