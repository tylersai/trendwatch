import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import axios from "axios";
import { API_END_POINT } from './utils/constant';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import { notification, Button } from "antd";

axios.defaults.baseURL = API_END_POINT;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const key = `open${Date.now()}`;
  const confirmInstall = () => {
    notification.close(key);
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if(choice.outcome === "accepted") {
        console.log("User Aaccepted A2HS prompt.");
      }
    });
  };
  const btn = (
    <Button type="primary" size="small" shape="round" onClick={confirmInstall}>
      Confirm
    </Button>
  );
  const notiConfig = {
    message: 'Install Trend Watch',
    description:
      'Do you want to add Trend Watch to your home screen? Click confirm to install!',
    duration: 0,
    key,
    btn
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
    if(process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches && notification.info(notiConfig);
      }, 3000);
    }
  }, [deferredPrompt, notiConfig]);

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
