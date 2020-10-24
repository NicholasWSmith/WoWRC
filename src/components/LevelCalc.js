import React, { useState, useEffect } from 'react'
import SplitPane from 'react-split-pane'
import '../styles/divider.css'
import useWindowDimensions from './GetWindowDimensions'
import LevelBoost from './boosts/LevelBoost';

function LevelCalc() {
    const { height, width } = useWindowDimensions();
    const [center, setCenter] = useState(width/2);
    const boost = new LevelBoost();

    return (
        <SplitPane split="vertical" minSize={200} defaultSize={center}>
        <div>
          {boost}
        </div>
        <div>
          width: {width} ~ height: {height}
        </div>
      </SplitPane>
    )
}

export default LevelCalc