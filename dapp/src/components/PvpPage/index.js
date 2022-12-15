import React, { useState } from 'react'

import {
    PvpPageContainer
} from './styles'
import { Link } from 'react-router-dom'

import Header from '../Header'
import TopBar from '../TopBar'
import ValueLabel from '../ValueLabel'

import TTESVG from '../../assets/svg/tte-logo.svg'
import BNBSVG from '../../assets/svg/bnb-logo.svg'
import SpButton from '../SpButton'
import PreparePane from './PreparePane'
import MatchPane from './MatchPane'
import ResultModal from '../ResultModal'

const PvpPage = (props) => {
    const { category } = props
    const [showModal, setShowModal] = useState(false)

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
                    {
                        category === 'prepare'?
                        <>
                            <ValueLabel label='1,000,000' icon={<img src={TTESVG} alt='' />}/>
                            <ValueLabel label='3,012' icon={<img src={BNBSVG} alt='' />}/>
                        </>
                        :
                        <Link to='/pvp' className='leave-room-link'>
                            <SpButton label='leave room'/>
                        </Link>
                    }
                </div>
                {
                    category === 'prepare'
                    ? <PreparePane />
                    :
                    category === 'match'
                    ? <MatchPane handleResult={() => setShowModal(true)} />
                    :
                    <></>
                }
            </div>
            { showModal === true && <ResultModal close={() => setShowModal(false)} result='fail' label1='try next time!' label2='YOU LOSE...' label3='- 1000 $TTE' icon={TTESVG} handleClick={() => setShowModal(false)}/>}
        </PvpPageContainer>
    )
}

export default PvpPage;
