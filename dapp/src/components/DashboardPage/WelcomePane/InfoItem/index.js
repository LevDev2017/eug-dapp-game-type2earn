import React from 'react'

import {
    InfoItemContainer
} from './styles'

const InfoItem = (props) => {
    const { title, value } = props

    return (
        <InfoItemContainer>
            <div className='title'>{title}</div>
            <div className='value'>{value}</div>
        </InfoItemContainer>
    )
}

export default InfoItem;
