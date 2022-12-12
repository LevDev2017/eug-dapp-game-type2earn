import React from 'react'

import { ValueLabelContainer } from './styles'

import AvatarInfoBackSVG from '../../assets/svg/avatar-info-back.svg'

const ValueLabel = (props) => {
    const {icon, label} = props

    return (
        <ValueLabelContainer>
            <img src={AvatarInfoBackSVG} alt='' />
            <div className='col-center'>
                <div className='content-frame'>
                    <div className='value'>{label}</div>
                    <div className='icon'>
                        {icon}
                    </div>
                </div>
            </div>
        </ValueLabelContainer>
    )
}

export default ValueLabel;
