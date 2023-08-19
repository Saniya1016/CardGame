import './App.css';
import { Landing } from './Landing';
import React from 'react';
import Start from './Start';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Control react components
function App() {

  // set the React routes
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/start">
          <Start />
        </Route>
      </Switch>
    </div>
    </Router>
  );
};

export default App;
