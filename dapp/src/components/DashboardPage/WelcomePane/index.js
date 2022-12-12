import React from 'react'

import {
    WelcomePaneContainer
} from './styles'

import TTESVG from '../../../assets/svg/tte-logo.svg'
import InfoItem from './InfoItem'

const WelcomePane = (props) => {
    return (
        <WelcomePaneContainer>
            <div className='headline'>
                <div className='welcome'>welcome back, #username</div>
                <div className='gap'></div>
                <img src={TTESVG} alt='' />
                <div className='token-price'>1 $TTE = 0,5342$</div>
            </div>
            <div className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
            <div className='info'>
                <InfoItem title='total supply' value='1,000,000 $TTE' />
                <InfoItem title='total subscribers' value='12,443' />
                <InfoItem title='top typist' value='Saren Dackle' />
                <InfoItem title='total online' value='1,200' />
            </div>
        </WelcomePaneContainer>
    )
}

export default WelcomePane;
