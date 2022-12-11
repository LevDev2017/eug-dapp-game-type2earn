import React from 'react'

import {
    LogoContainer
} from './styles'

import LogoSVG from '../../../../assets/svg/logo.svg'

const Logo = (props) => {
    return (
        <LogoContainer>
            <img src={LogoSVG} alt='' />
        </LogoContainer>
    )
}

export default Logo
