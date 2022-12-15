import React, { useState } from 'react'

import {
    PreparePaneContainer
} from './styles'

import TypingLevelItem from '../TypingLevelItem'
import PlayPane from '../PlayPane'

const PreparePane = (props) => {
    const [levels, setLevels] = useState([
        {
            level: 1,
            unlocked: true,
            selected: false
        },
        {
            level: 2,
            unlocked: true,
            selected: true
        },
        {
            level: 3,
            unlocked: false,
            selected: false
        },
        {
            level: 4,
            unlocked: false,
            selected: false
        },
        {
            level: 5,
            unlocked: false,
            selected: false
        },
        {
            level: 6,
            unlocked: false,
            selected: false
        },
        {
            level: 7,
            unlocked: false,
            selected: false
        }
    ])
    
    return (
        <PreparePaneContainer>
            <div className='remaining-frame'>today remaining turn<span>5</span></div>
            <div className='level-frame'>
                <div className='level-contents'>
                    {
                        levels.map((l, idx) => {
                            return <TypingLevelItem key={idx} level={l.level} unlocked={l.unlocked} selected={l.selected} handleSelect={() => {console.log(l.level)}}/>
                        })
                    }
                </div>
            </div>
            <div className='play-frame'>
                <PlayPane />
            </div>
        </PreparePaneContainer>
    )
}

export default PreparePane;
