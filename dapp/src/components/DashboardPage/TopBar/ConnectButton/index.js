import React from 'react'

import {
    ConnectButtonContainer
} from './styles'

const ConnectButton = (props) => {
    const { handleClick } = props
    return (
        <ConnectButtonContainer onClick={handleClick}>
            connect wallet
        </ConnectButtonContainer>
    )
}

export default ConnectButton;
