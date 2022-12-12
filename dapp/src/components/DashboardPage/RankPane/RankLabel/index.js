import React from 'react'

import {
    RankLabelContainer
} from './styles'

import RandLabelSVG from '../../../../assets/svg/rank-label-back.svg'

const RankLabel = (props) => {
    const {label, value} = props

    return (
        <RankLabelContainer>
            <div className='label'>{label}</div>
            <div className='image-frame'>
                <img src={RandLabelSVG} alt='' />
                <div className='value'>{value}</div>
            </div>
        </RankLabelContainer>
    )
}

export default RankLabel;
