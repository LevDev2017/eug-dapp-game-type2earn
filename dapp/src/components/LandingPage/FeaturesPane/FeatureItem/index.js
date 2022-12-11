import React from 'react'

import {
    FeatureItemContainer
} from './styles'

const FeatureItem = (props) => {
    const {icon, title, description, active} = props

    return (
        <FeatureItemContainer active={active}>
            {icon}
            <div className='title'>{title}</div>
            <div className='description'>{description}</div>
        </FeatureItemContainer>
    )
}

export default FeatureItem;
