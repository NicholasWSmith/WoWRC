import React from 'react'

function Player(props) {

    const dragStart = e => {
        const target = e.target;
        const player_id = e.target.id;
        e.dataTransfer.setData('player_id', player_id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }

    const dragOver = e => {
        e.stopPropagation();
    }

    return (
        <div
            id={props.id}
            className={props.className}
            draggable="true"
            onDragStart={dragStart}
            onDragOver={dragOver}
        >
            { props.children }
        </div>
    )
}

export default Player
