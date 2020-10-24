import React from 'react'
import SplitPane from 'react-split-pane'
import '../styles/divider.css'
import useWindowDimensions from './GetWindowDimensions'
import LevelBoost from './boosts/LevelBoost';

function LevelCalc() {
    const { height, width } = useWindowDimensions();
    const boost = new LevelBoost();

    return (
      <div>
        {boost}
      </div>
      
      //   <SplitPane split="vertical" minSize={200} defaultSize={750}>
      //   <div>
      //     
      //   </div>
      //   <div>
      //     width: {width} ~ height: {height}
      //   </div>
      // </SplitPane>
    )
}

export default LevelCalc