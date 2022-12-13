import React, { useState } from 'react'

import {
    PvpPageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import ValueLabel from '../ValueLabel'

import TTESVG from '../../assets/svg/tte-logo.svg'
import BNBSVG from '../../assets/svg/bnb-logo.svg'
import CreateRoomPane from './CreateRoomPane'
import PlayerOutline from '../DashboardPage/PlayerOutline'
import SpButton from '../SpButton'
import RoomInfo from './RoomInfo'

import StandPNG from '../../assets/images/stand.png'

const PvpPage = (props) => {
    const [searchText, setSearchText] = useState('')
    const [showCreateRoom, setShowCreateRoom] = useState(false)

    return (
        <PvpPageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-frame frame-1'>
                    <div className='label-frame variable-item'>
                        <div className='big-label'>pvp mode</div>
                        <div className='small-label'>Fight against other player to show your skill</div>
                    </div>
                    <ValueLabel label='1,000,000' icon={<img src={TTESVG} alt='' />}/>
                    <ValueLabel label='3,012' icon={<img src={BNBSVG} alt='' />}/>
                </div>
                <div className='row-frame'>
                    <div className='col-frame align-center max-width-300'>
                        <div className='player-outline'>
                            <PlayerOutline />
                        </div>
                        <div className='player-description'>You can create or join room to fight against other player.<br/>Winner will get all reward from bet pool. Now let’s show some skill!</div>
                        <SpButton label='create room' handleClick={() => setShowCreateRoom(true)}/>
                    </div>
                    <div className='col-frame variable-item'>
                        <div className='row-frame align-center'>
                            <div className='remaining-frame variable-item'>today remaining turn <span>5</span></div>
                            <input className='search-input' placeholder='Search ID Room' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        </div>
                        <div className='room-frame'>
                            <RoomInfo isHeader={true} roomId='ROOM ID' owner='OWNER' level='LEVEL' betAmount='BET AMOUNT' />
                            <RoomInfo roomId='1' avatar={StandPNG} owner='Antone Fuder' level='3' betAmount='500 $TTE' />
                            <RoomInfo roomId='2' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='3' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='4' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='5' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='6' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='7' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='8' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='9' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='10' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='11' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='12' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='13' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                            <RoomInfo roomId='14' avatar={StandPNG} owner='Antone Fuder' level='2' betAmount='1000 $TTE' />
                        </div>
                    </div>
                </div>
                {showCreateRoom === true && <CreateRoomPane close={() => setShowCreateRoom(false)}/>}
            </div>
        </PvpPageContainer>
    )
}

export default PvpPage;
