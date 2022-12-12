import React from 'react'

import {
    DashboardPageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import Avatar from './Avatar'
import WelcomePane from './WelcomePane'
import PriceChart from './PriceChart'
import PlayerOutline from './PlayerOutline'
import RankPane from './RankPane'
import UpcomingTournament from './UpcomingTournament'
import Notification from './Notification'
import History from './History'

const DashboardPage = (props) => {
    return (
        <DashboardPageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-1'>
                    <div className='item-1'>
                        <Avatar />
                    </div>
                    <div className='item-2'>
                        <WelcomePane />
                    </div>
                </div>
                <PriceChart />
                <div className='multi-panes'>
                    <div style={{gridArea: 'a'}}>
                        <PlayerOutline />
                    </div>
                    <div style={{gridArea: 'b'}}>
                        <RankPane />
                    </div>
                    <div style={{gridArea: 'c'}}>
                        <UpcomingTournament />
                    </div>
                    <div style={{gridArea: 'd'}}>
                        <Notification />
                    </div>
                    <div style={{gridArea: 'e'}}>
                        <History />
                    </div>
                </div>
            </div>
        </DashboardPageContainer>
    )
}

export default DashboardPage;
