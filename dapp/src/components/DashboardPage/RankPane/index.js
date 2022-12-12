import React from 'react'
import RankLabel from './RankLabel';

import {
    RankPaneContainer
} from './styles'

const RankPane = (props) => {
    return (
        <RankPaneContainer>
            <div className='row-frame'>
                <RankLabel label='typist rank' value='10241'/>
                <RankLabel label='PvP rank' value='234'/>
            </div>
            <div className='gap-line'></div>
            <div className='value-frame'>
                <div className='label'>PvE remaining turns</div>
                <div className='value'>5</div>
                <div className='label'>today earned</div>
                <div className='value'>1836 $TTE</div>
                <div className='label'>today lost</div>
                <div className='value'>352 $TTE</div>
                <div className='label'>total profit earned</div>
                <div className='value'>102400 $TTE</div>
            </div>
        </RankPaneContainer>
    )
}

export default RankPane;
