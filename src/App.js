import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <span>Hello world</span>} />
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
