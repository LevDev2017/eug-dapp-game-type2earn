import React from 'react'

import {
    TokenomicsItemContainer
} from './styles'

const TokenomicsItem = (props) => {
    const {label, value} = props
    return (
        <TokenomicsItemContainer>
            <div className='label'>{label}</div>
            <div className='value'>{value}</div>
        </TokenomicsItemContainer>
    )
}

export default TokenomicsItem;
