import React from 'react'

import {
    SpButtonContainer
} from './styles'

import SpButtonBackSVG from '../../assets/svg/sp-button-back.svg'

const SpButton = (props) => {
    const {label, icon, handleClick} = props
    
    return (
        <SpButtonContainer onClick={handleClick}>
            <img src={SpButtonBackSVG} alt='' />
            <div className='label'>{icon && icon}{label}</div>
        </SpButtonContainer>
    )
}

export default SpButton;
