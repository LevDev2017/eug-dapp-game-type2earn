import React, { useState } from 'react'

import {
    InventoryPageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import ValueLabel from '../ValueLabel'
import PlayerOutline from '../DashboardPage/PlayerOutline'

import TTESVG from '../../assets/svg/tte-logo.svg'
import BNBSVG from '../../assets/svg/bnb-logo.svg'
import SPSVG from '../../assets/svg/sp-mark.svg'

import L1PNG from '../../assets/images/stand1.png'
import L2PNG from '../../assets/images/stand2.png'
import L3PNG from '../../assets/images/stand3.png'
import L4PNG from '../../assets/images/stand4.png'
import L5PNG from '../../assets/images/stand5.png'
import L6PNG from '../../assets/images/stand6.png'
import L7PNG from '../../assets/images/stand7.png'
import L8PNG from '../../assets/images/stand8.png'
import L9PNG from '../../assets/images/stand9.png'
import L10PNG from '../../assets/images/stand10.png'

import LoadoutItem from './LoadoutItem'

const InventoryPage = (props) => {
    const [loadouts, setLoadouts] = useState(
        [
            { icon: L1PNG, inUse: true },
            { icon: L2PNG, inUse: false },
            { icon: L3PNG, inUse: false },
            { icon: L4PNG, inUse: false },
            { icon: L5PNG, inUse: false },
            { icon: L6PNG, inUse: false },
            { icon: L7PNG, inUse: false },
            { icon: L8PNG, inUse: false },
            { icon: L9PNG, inUse: false },
            { icon: L10PNG, inUse: false },
        ]
    )
    return (
        <InventoryPageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-frame frame-1'>
                    <div className='label-frame variable-item'>
                        <div className='big-label'>inventory</div>
                        <div className='small-label'>fight with other players to show your skill</div>
                    </div>
                    <ValueLabel label='1,000,000' icon={<img src={TTESVG} alt='' />}/>
                    <ValueLabel label='3,012' icon={<img src={BNBSVG} alt='' />}/>
                </div>
                <div className='row-frame frame-2'>
                    <div className='col-frame stand-out-frame'>
                        <PlayerOutline />
                        <div className='row-frame'>
                            <img src={SPSVG} alt='' />
                            <div className='col-frame variable-item gap-5'>
                                <div className='line-1'>Special Skill</div>
                                <div className='line-2'>You just need to type QWERTYYUIOPP</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-frame'>
                        <div className='loadout-label'>select your loadout</div>
                        <div className='loadout-images'>
                            {
                                loadouts.map((l, idx) => {
                                    return <LoadoutItem key={idx} icon={<img src={l.icon} alt='' />} inUse={l.inUse} handleSelect={() => {}}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </InventoryPageContainer>
    )
}

export default InventoryPage;
