import React, { useEffect } from 'react';
import './App.css';
import {Switch, Route, Link } from 'react-router-dom';
import CreateRoster from './components/CreateRoster';
import LevelCalc from './components/LevelCalc';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga'
import {Alert} from 'react-bootstrap';
import {Helmet} from "react-helmet";

function App() {
  ReactGA.initialize('UA-109529411-1');

  return (
    <div className="App">
       <Helmet>
          <meta charSet="utf-8" />
          <title>Huokan Lvl Calc</title>
          <script data-ad-client="ca-pub-5493170330729204" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Helmet>
      <Alert variant={'primary'} dismissible>
        Ads help us keep this service free of charge to use! Please consider turning off Adblock :) 
      </Alert>
      <ul>
        <li>
          <Link to="/create"> CreateRoster</Link>
        </li>
        <li>
          <Link to="/lvlcalc"> Leveling Price Calculator</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/create" component={CreateRoster}/>
        <Route exact path="/lvlcalc" component={LevelCalc}/>
      </Switch>
    </div>
  );
}

export default App;
