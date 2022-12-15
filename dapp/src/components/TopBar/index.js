import React, { useState } from 'react'

import {
    TopBarContainer
} from './styles'

import ConnectButton from './ConnectButton'
import BuyButton from './BuyButton'
import { ExitSVG } from '../SvgIcons'

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
                        <div className='disconnect-wallet' onClick={() => setConnected(false)}>
                            <ExitSVG />
                        </div>
                    </>
            }
        </TopBarContainer>
    )
}

export default TopBar;
