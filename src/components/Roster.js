import React from 'react'

function Roster(props) {
    const drop = e => {
        e.preventDefault();
        const player_id = e.dataTransfer.getData('player_id')

        const player = document.getElementById(player_id)
        player.style.display = 'block';

        e.target.appendChild(player)
    }

    const drag = e => {
        e.preventDefault();
    }

    return (
        <div 
            id={props.id}
            onDrop={drop}
            onDragOver={drag}
            className={props.className}
        >
            { props.children}
        </div>
    )
}

export default Roster