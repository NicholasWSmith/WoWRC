import React from 'react';
import './App.css';
import  Roster from './components/Roster';
import  Player from './components/Player';


function App() {
  return (
    <div className="App">
      <main className="flexbox">
        <Roster id="roster-1" className="roster">
          <Player id="1" className="player">
            <p>Card one</p>
          </Player>
        </Roster>

        <Roster id="roster-2" className="roster">
          <Player id="2" className="player">
            <p>Card two</p>
          </Player>
        </Roster>
      </main>
    </div>
  );
}

export default App;
