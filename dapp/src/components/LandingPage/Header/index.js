import React, {useState} from 'react'

import {
    HeaderContainer
} from './styles'

import Logo from './Logo'
import BgButton from '../../BgButton'

import { useNavigate } from 'react-router-dom'

const Header = (props) => {
    const navigate = useNavigate()

    return (
        <HeaderContainer>
            <Logo />
            <a href='#' className='menu-item menu-item-selected'>Home</a>
            <a href='#about-us' className='menu-item'>About us</a>
            <a href='#features' className='menu-item'>Features</a>
            <a href='#tokenomics' className='menu-item'>Tokenomics</a>
            <a href='#team' className='menu-item'>Team</a>
            <a href='#roadmap' className='menu-item'>Roadmap</a>
            <a href='#contact' className='menu-item'>Contact</a>
            <BgButton label='launch app' onClick={() => {navigate('/dashboard')}}/>
        </HeaderContainer>
    )
}

export default Header
