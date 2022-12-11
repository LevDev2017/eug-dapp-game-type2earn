import React, {useState} from 'react'

import {
    HeaderContainer
} from './styles'

import Logo from './Logo'
import BgButton from '../../BgButton'

const Header = (props) => {
    return (
        <HeaderContainer>
            <Logo />
            <div className='menu-item menu-item-selected'>Home</div>
            <div className='menu-item'>About us</div>
            <div className='menu-item'>Features</div>
            <div className='menu-item'>Tokenomics</div>
            <div className='menu-item'>Team</div>
            <div className='menu-item'>Roadmap</div>
            <div className='menu-item'>Contact</div>
            <BgButton label='launch app'/>
        </HeaderContainer>
    )
}

export default Header
