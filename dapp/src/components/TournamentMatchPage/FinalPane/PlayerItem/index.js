import React from 'react'

import {
    PlayerItemContainer
} from './styles'

import PlayerOutlineSVG from '../../../../assets/svg/player-outline.svg'

const PlayerItem = (props) => {
    const {icon, name, lose} = props

    return (
        <PlayerItemContainer>
            <div className='image-frame'>
                <img src={PlayerOutlineSVG} alt='' className='background-image'/>
                {icon && <img src={icon} alt='' className='icon-image' />}
                {lose !== undefined && <div className='lose-label'>lost</div>}
            </div>
            {name && <div className='name-label'>{name}</div>}
        </PlayerItemContainer>
    )
}

export default PlayerItem;
