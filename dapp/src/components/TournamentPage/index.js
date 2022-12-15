import React, { useState } from 'react'

import {
    TournamentPageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import ValueLabel from '../ValueLabel'
import BgButton from '../BgButton'

import TTESVG from '../../assets/svg/tte-logo.svg'
import BNBSVG from '../../assets/svg/bnb-logo.svg'
import GoldStarPNG from '../../assets/images/gold-star.png'
import BlueStarPNG from '../../assets/images/blue-star.png'
import BronzeStarPNG from '../../assets/images/bronze-star.png'
import ModalPane from './ModalPane'
import { useNavigate } from 'react-router-dom'

const TournamentPage = (props) => {
    const [updateFlag, setUpdateFlag] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    
    return (
        <TournamentPageContainer>
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
                <div className='subtitle'>buy ticket to register and win prize in tournament</div>
                <div className='col-frame no-gap'>
                    <div className='col-frame frame-2 grey-back'>
                        <div className='row-frame align-center'>
                            <div className='label-1 variable-item'>CHALLENGER LEAGUE #1</div>
                            <div className='status-1'>{updateFlag === true? 'closed': 'ready'}</div>
                        </div>
                        <div className='row-frame align-center'>
                            <div className='label-2'>typing level</div>
                            <div className='level-number'>2</div>
                            <div className='time-to-1 variable-item'>{updateFlag === true? 'TOURNAMENT ALREADY STARTED': 'starting in 15:24:02'}</div>
                        </div>
                    </div>
                    <div className='col-frame bg-image-back'>
                        <div className='row-frame justify-center gap-40'>
                            <div className='col-frame medal-amount-label'>
                                <div className='row-frame justify-fit'>
                                    <img src={GoldStarPNG} alt='gold star' />
                                    <span>5000 $TTE</span>
                                </div>
                                <div className='row-frame justify-fit'>
                                    <img src={BlueStarPNG} alt='gold star' />
                                    <span>3000 $TTE</span>
                                </div>
                                <div className='row-frame justify-fit'>
                                    <img src={BronzeStarPNG} alt='gold star' />
                                    <span>1000 $TTE</span>
                                </div>
                                <div className='row-frame justify-fit'>
                                    <span>Top 8-16</span>
                                    <span>750 $TTE</span>
                                </div>
                            </div>
                            <div className='col-frame medal-amount-label align-end uppercase'>
                                <div>total prize</div>
                                <div className='green'>1,000,000 $TTE</div>
                                <div className='gap'></div>
                                <div>registered players</div>
                                <div className='registered-player-frame'>153</div>
                            </div>
                        </div>
                        <div className='row-frame justify-center padding-top-60'>
                            <BgButton label='register' dense disabled={updateFlag} onClick={() => {setShowModal(true); setUpdateFlag(true)}}/>
                        </div>
                        <div className='row-frame justify-center'>
                            <div className='register-description'>you need 500 $TTE to sign in this tournament</div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal === true &&
                <ModalPane close={() => setShowModal(false)} handleClick={() => {
                    setShowModal(false)

                    setTimeout(() => {
                        navigate('/tournament/match')
                    }, 1000)
                }}/>
            }
        </TournamentPageContainer>
    )
}

export default TournamentPage;
