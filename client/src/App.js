import './App.css';
import { Landing } from './Landing';
import React, { useState } from 'react';
import Start from './Start';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Control react components
function App() {

  // if the gameStarted state is true render the Start page else render landing page
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
