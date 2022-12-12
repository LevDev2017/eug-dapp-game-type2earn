import React from 'react'

import {
    PlayerOutlineContainer
} from './styles'

import PlayerOutlineSVG from '../../../assets/svg/player-outline.svg'
import StandPNG from '../../../assets/images/stand.png'

const PlayerOutline = (props) => {
    return (
        <PlayerOutlineContainer>
            <img src={PlayerOutlineSVG} alt='' />
            <div className='stand-image'>
                <img src={StandPNG} alt='' />
            </div> 
            <div className='id-field'>#1382</div>
        </PlayerOutlineContainer>
    )
}

export default PlayerOutline;
