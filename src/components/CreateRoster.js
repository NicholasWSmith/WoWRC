import React from 'react'
import  Roster from './Roster';
import  Player from './Player';

function CreateRoster(props) {
    return (
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
    )
}

export default CreateRoster
