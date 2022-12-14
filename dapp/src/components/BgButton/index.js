import React from 'react'

import {
    BgButtonContainer
} from './styles'

const BgButton = (props) => {
    const { label, dense, disabled, onClick } = props

    return (
        <BgButtonContainer dense={dense === true? true: false} disabled={disabled === true? true: false} onClick={disabled === true? () => {}: onClick}>
            {label && <div className='bg-button-label'>{label}</div>}
        </BgButtonContainer>
    )
}

export default BgButton;
