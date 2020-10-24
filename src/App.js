import React from 'react';
import './App.css';
import {Switch, Route, Link } from 'react-router-dom';
import CreateRoster from './components/CreateRoster';
import LevelCalc from './components/LevelCalc';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga'

function App() {
  ReactGA.initialize('UA-109529411-1');

  return (
    <div className="App">
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
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    </div>
  );
}

export default App;
