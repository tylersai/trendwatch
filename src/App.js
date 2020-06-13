import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import HomePage from './components/pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/home" component={HomePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
