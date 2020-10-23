import React from 'react'
import SplitPane from 'react-split-pane'
import '../styles/divider.css'

function LevelCalc() {
    return (
        <SplitPane split="vertical" minSize={50} defaultSize={500}>
        <div />
        <div />
      </SplitPane>
    )
}

export default LevelCalc