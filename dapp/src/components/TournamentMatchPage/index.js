import React, { useState } from 'react'

import {
    TournamentMatchPageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import ValueLabel from '../ValueLabel'

import TTESVG from '../../assets/svg/tte-logo.svg'
import BNBSVG from '../../assets/svg/bnb-logo.svg'
import { Link } from 'react-router-dom'
import MatchPane from './MatchPane'

const TournamentMatchPage = (props) => {
    const { category } = props

    return (
        <TournamentMatchPageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-frame frame-1'>
                    <div className='label-frame variable-item'>
                        <div className='big-label'>tournament</div>
                    </div>
                    <ValueLabel label='1,000,000' icon={<img src={TTESVG} alt='' />}/>
                    <ValueLabel label='3,012' icon={<img src={BNBSVG} alt='' />}/>
                </div>
                <div className='row-frame gap-40'>
                    <Link className={`category-label ${category === 'match'? 'green': ''}`} to='/tournament/match'>
                        match
                        {category === 'match' && <div className='selected'></div>}
                    </Link>
                    <Link className={`category-label ${category === 'final'? 'green': ''}`} to='/tournament/final'>
                        final stage
                        {category === 'final' && <div className='selected'></div>}
                    </Link>
                </div>
                {
                    category === 'match'?
                    <MatchPane />
                    :
                    category === 'final'?
                    <></>
                    :
                    <></>
                }
            </div>
        </TournamentMatchPageContainer>
    )
}

export default TournamentMatchPage;
