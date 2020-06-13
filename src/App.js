import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import axios from "axios";
import { API_END_POINT } from './utils/constant';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';

axios.defaults.baseURL = API_END_POINT;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/movie/:id" component={MoviePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
