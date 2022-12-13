import React, { useState } from 'react'

import {
    PvePageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import ValueLabel from '../ValueLabel'

import TTESVG from '../../assets/svg/tte-logo.svg'
import BNBSVG from '../../assets/svg/bnb-logo.svg'
import TypingLevelItem from './TypingLevelItem'
import PlayPane from './PlayPane'

const PvePage = (props) => {
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
        <PvePageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-frame frame-1'>
                    <div className='label-frame variable-item'>
                        <div className='big-label'>pve mode</div>
                        <div className='small-label'>choose level and enter amount token to play</div>
                    </div>
                    <ValueLabel label='1,000,000' icon={<img src={TTESVG} alt='' />}/>
                    <ValueLabel label='3,012' icon={<img src={BNBSVG} alt='' />}/>
                </div>
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
            </div>
        </PvePageContainer>
    )
}

export default PvePage;
