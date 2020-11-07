import React, { useEffect } from 'react';
import './App.css';
import {Switch, Route, Link } from 'react-router-dom';
import CreateRoster from './components/CreateRoster';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga'
import {Alert} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import LevelBoost from './components/boosts/LevelBoost';
import SplitPane from 'react-split-pane'
import useWindowDimensions from './components/GetWindowDimensions'
import AdSense from 'react-adsense';
import './styles/divider.css';

function App() {
  ReactGA.initialize('UA-109529411-1');
  const boost = new LevelBoost();
  const { height, width } = useWindowDimensions();

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
      <Switch>
        <Route exact path="/create" component={CreateRoster}/>
      </Switch>
      <SplitPane split="vertical" minSize={200} defaultSize={width*0.5}>
          <div>
            {boost}
          </div>
          <div>
            <AdSense.Google
              client='ca-pub-5493170330729204'
              slot='1602176967'
            />
          </div>
        </SplitPane>
    </div>
  );
}

export default App;
