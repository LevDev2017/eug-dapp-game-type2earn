import React from 'react'

import {
    AvatarContainer
} from './styles'

import AvatarSamplePNG from '../../../assets/images/avatar-sample.png'

import BNBSVG from '../../../assets/svg/bnb-logo.svg'
import TTESVG from '../../../assets/svg/tte-logo.svg'
import ValueLabel from '../../ValueLabel'

const Avatar = (props) => {
    return (
        <AvatarContainer>
            <div className='column-align'>
                <img className='avatar' src={AvatarSamplePNG} alt=''/>
            </div>
            <div className='bnb-balance'>
                <ValueLabel label='3,012' icon={<img src={BNBSVG} alt='' />}/>
            </div>
            <div className='tte-balance'>
                <ValueLabel label='1,000,000' icon={<img src={TTESVG} alt='' />}/>
            </div>
        </AvatarContainer>
    )
}

export default Avatar;
