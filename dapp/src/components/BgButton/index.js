import React from 'react'

import {
    BgButtonContainer
} from './styles'

const BgButton = (props) => {
    const { label, dense } = props

    return (
        <BgButtonContainer dense={dense}>
            {label && <div className='bg-button-label'>{label}</div>}
        </BgButtonContainer>
    )
}

export default BgButton;
