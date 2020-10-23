import React from 'react';
import './App.css';
import {Switch, Route, Link } from 'react-router-dom';
import CreateRoster from './components/CreateRoster';
import LevelCalc from './components/LevelCalc'

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/create"> CreateRoster</Link>
        </li>
        <li>
          <Link to="/lvlcalc"> Level Calcualtor</Link>
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
