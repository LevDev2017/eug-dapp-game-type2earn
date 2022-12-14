import React from 'react'

import {
    MatchPaneContainer
} from './styles'

import PlayerOutline from '../../DashboardPage/PlayerOutline'
import StandPNG from '../../../assets/images/stand.png'
import RankLabel from '../../DashboardPage/RankPane/RankLabel'

const MatchPane = (props) => {
    return (
        <MatchPaneContainer>
            <div className='col-frame'>
                <div className='big-label'>challenger league #1</div>
                <div className='row-frame align-center justify-center'>
                    <div className='label capitalize'>typing level</div>
                    <div className='green-square'>2</div>
                    <div className='label uppercase'>total players</div>
                    <div className='green'>153/153</div>
                </div>
                <div className='row-frame justify-fit padding-top-100 full-width'>
                    <div className='col-frame align-center'>
                        <PlayerOutline icon={StandPNG} id='1382' loadout={true}/>
                        <div className='label'>JOHNY BLAZE</div>
                        <div className='row-frame justify-center'>
                            <RankLabel label='typist rank' value='10241'/>
                            <RankLabel label='PvP rank' value='234'/>
                        </div>
                    </div>
                    <div className='col-frame align-center'>
                        <div className='label uppercase'>match id: #15</div>
                        <div className='small-label capitalize'>next round starting in</div>
                        <div className='big-label'>00:15:30</div>
                    </div>
                    <div className='col-frame align-center'>
                        <PlayerOutline icon={StandPNG} id='1383'/>
                        <div className='label'>Antoin Fuder</div>
                        <div className='row-frame justify-center'>
                            <RankLabel label='typist rank' value='10241'/>
                            <RankLabel label='PvP rank' value='234'/>
                        </div>
                    </div>
                </div>
            </div>
        </MatchPaneContainer>
    )
}

export default MatchPane;
