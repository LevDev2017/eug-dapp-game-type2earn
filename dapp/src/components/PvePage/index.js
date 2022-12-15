import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
    PvePageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'
import ValueLabel from '../ValueLabel'

import TTESVG from '../../assets/svg/tte-logo.svg'
import BNBSVG from '../../assets/svg/bnb-logo.svg'
import PreparePane from './PreparePane'
import MatchPane from './MatchPane'
import SpButton from '../SpButton'
import ResultModal from '../ResultModal'

const PvePage = (props) => {
    const { category } = props
    const [showModal, setShowModal] = useState(false)

    return (
        <PvePageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-frame frame-1'>
                    <div className='label-frame variable-item'>
                        <div className='big-label'>pve mode</div>
                        <div className='small-label'>choose level and enter amount token to play</div>
                    </div>
                    {
                        category === 'prepare'?
                        <>
                            <ValueLabel label='1,000,000' icon={<img src={TTESVG} alt='' />}/>
                            <ValueLabel label='3,012' icon={<img src={BNBSVG} alt='' />}/>
                        </>
                        :
                        <Link to='/pve' className='leave-room-link'>
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
            { showModal === true && <ResultModal close={() => setShowModal(false)} result='ok' label1='congratulation!' label2='you win!' label3='+ 1000 $TTE' icon={TTESVG} handleClick={() => setShowModal(false)}/>}
        </PvePageContainer>
    )
}

export default PvePage;
