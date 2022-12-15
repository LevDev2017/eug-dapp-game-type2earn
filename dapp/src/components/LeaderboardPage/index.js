import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
    LeaderboardPageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import StandPNG from '../../assets/images/stand.png'
import GoldStarPNG from '../../assets/images/gold-star.png'
import BlueStarPNG from '../../assets/images/blue-star.png'
import BronzeStarPNG from '../../assets/images/bronze-star.png'

import RankingInfo from './RankingInfo'

const LeaderboardPage = (props) => {
    const { category } = props

    return (
        <LeaderboardPageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-frame'>
                    <Link className={`category-label ${category === 'pve'? 'green': ''}`} to='/leaderboard/l-pve'>
                        pve mode
                        {category === 'pve' && <div className='selected'></div>}
                    </Link>
                    <Link className={`category-label ${category === 'pvp'? 'green': ''}`} to='/leaderboard/l-pvp'>
                        pvp mode
                        {category === 'pvp' && <div className='selected'></div>}
                    </Link>
                    <Link className={`category-label ${category === 'tournament'? 'green': ''}`} to='/leaderboard/l-tournament'>
                        last tournament
                        {category === 'tournament' && <div className='selected'></div>}
                    </Link>
                </div>
                <div className='ranking-frame'>
                    <RankingInfo isHeader={true} rankingId='RANKING' username='CHARACTER' level='TYPING LEVEL' wallet='WALLET' totalEarned='TOTAL EARNED' />
                    <RankingInfo rankingId='1' rankingIcon={GoldStarPNG} avatar={StandPNG} username='#USER 1' level='12' wallet='0xa6...1234' totalEarned='2500 $TTE' />
                    <RankingInfo rankingId='2' rankingIcon={BlueStarPNG} avatar={StandPNG} username='#USER 2' level='10' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='3' rankingIcon={BronzeStarPNG} avatar={StandPNG} username='#USER 3' level='9' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='4' avatar={StandPNG} username='#USER 4' level='8' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='5' avatar={StandPNG} username='#USER 5' level='7' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='6' avatar={StandPNG} username='#USER 6' level='6' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='7' avatar={StandPNG} username='#USER 7' level='5' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='8' avatar={StandPNG} username='#USER 8' level='4' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='9' avatar={StandPNG} username='#USER 9' level='3' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                    <RankingInfo rankingId='10' avatar={StandPNG} username='#USER 10' level='2' wallet='0xa6...1234' totalEarned='1000 $TTE' />
                </div>
            </div>
        </LeaderboardPageContainer>
    )
}

export default LeaderboardPage;
