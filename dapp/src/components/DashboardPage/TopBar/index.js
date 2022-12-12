import React, { useState } from 'react'

import {
    TopBarContainer
} from './styles'

import ConnectButton from './ConnectButton'
import BuyButton from './BuyButton'

const TopBar = (props) => {
    const [connected, setConnected] = useState(false)

    return (
        <TopBarContainer>
            <div className='gap'></div>
            {
                connected !== true ?
                    <ConnectButton handleClick={() => setConnected(true)}/>
                    :
                    <>
                        <BuyButton />
                        <div className='wallet-address'>
                            <span>0xa6...1234</span>
                        </div>
                    </>
            }
        </TopBarContainer>
    )
}

export default TopBar;
