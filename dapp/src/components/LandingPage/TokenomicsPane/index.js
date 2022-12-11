import React from 'react'

import {
    TokenomicsPaneContainer
} from './styles'

import TokenomicsLayout1SVG from '../../../assets/svg/tokenomics_layout1.svg'
import TokenomicsLayout2SVG from '../../../assets/svg/tokenomics_layout2.svg'

import BgButton from '../../BgButton'
import TokenomicsItem from './TokenomicsItem'

const TokenomicsPane = (props) => {
    return (
        <TokenomicsPaneContainer>
            <img src={TokenomicsLayout1SVG} alt='' />
            <div className='content-frame'>
                <div className='left-frame'>
                    <div>
                        <div className='title1'>tokenomics</div>
                        <div className='title2'>description</div>
                    </div>
                    <div className='description'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </div>
                    <BgButton label='white paper' dense/>
                </div>
                <div className='right-frame'>
                    <div>
                        <span className='big-letters'>1,000</span>
                        <span className='small-letters'>total supply</span>
                    </div>
                    <div className='item-array-frame'>
                        <TokenomicsItem label='marketing' value='1%'/>
                        <TokenomicsItem label='liquidity' value='1%'/>
                        <TokenomicsItem label='reflection' value='1%'/>
                        <TokenomicsItem label='burned' value='1%'/>
                    </div>
                </div>
            </div>
            <img src={TokenomicsLayout2SVG} alt='' />
        </TokenomicsPaneContainer>
    )
}

export default TokenomicsPane;
