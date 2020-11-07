import React, { useEffect } from 'react'
import  Roster from './Roster';
import  Player from './Player';
import { useParams } from "react-router-dom";

function CreateRoster(props) {
    const { code } = useParams();

    useEffect(() => {
        console.log('got here');
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('code');

        const data = {
            client_id: '',
            client_secret: '',
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:8000/create',
            code: myParam,
            scope: 'guilds',
        };

        fetch('https://discord.com/api/oauth2/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data),
            }
        ).then(
            res => res.json()
        ).then(
            console.log
        );
    }, []);

    return (
        <main className="flexbox">
            <p> hello </p>
        </main>
    )
}

export default CreateRoster
