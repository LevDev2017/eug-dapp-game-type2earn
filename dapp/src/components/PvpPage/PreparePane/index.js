import React, { useState } from 'react'

import {
    PreparePaneContainer
} from './styles'

import PlayerOutline from '../../DashboardPage/PlayerOutline'
import RoomInfo from '../RoomInfo'
import StandPNG from '../../../assets/images/stand.png'
import CreateRoomPane from '../CreateRoomPane'
import SpButton from '../../SpButton'

const PreparePane = (props) => {
    const [showCreateRoom, setShowCreateRoom] = useState(false)
    const [searchText, setSearchText] = useState('')

    return (
        <PreparePaneContainer>
            <div className='col-frame align-center max-width-300'>
                <div className='player-outline'>
                    <PlayerOutline icon={StandPNG} id='1382' loadout={true} />
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
            {showCreateRoom === true && <CreateRoomPane close={() => setShowCreateRoom(false)}/>}
        </PreparePaneContainer>
    )
}

export default PreparePane;
