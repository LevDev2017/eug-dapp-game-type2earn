import React from 'react'

import {
    BgButtonContainer
} from './styles'

const BgButton = (props) => {
    const { label, dense, onClick } = props

    return (
        <BgButtonContainer dense={dense} onClick={onClick}>
            {label && <div className='bg-button-label'>{label}</div>}
        </BgButtonContainer>
    )
}

export default BgButton;
