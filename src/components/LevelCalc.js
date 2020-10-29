import React, { useState, useEffect } from 'react'
import SplitPane from 'react-split-pane'
import '../styles/divider.css'
import useWindowDimensions from './GetWindowDimensions'
import LevelBoost from './boosts/LevelBoost';
import AdSense from 'react-adsense';

function LevelCalc() {
    const { height, width } = useWindowDimensions();
    const boost = new LevelBoost();
    return (
      <div>
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
    )
}

export default LevelCalc