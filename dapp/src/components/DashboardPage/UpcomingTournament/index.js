import React from 'react'

import {
    UpcomingTournamentContainer
} from './styles'

import LaptopPNG from '../../../assets/images/3d-render-laptop-floating-notebook-icon-realistic-glossy-look 1.png'
import BgButton from '../../BgButton'

const UpcomingTournament = (props) => {
    return (
        <UpcomingTournamentContainer>
            <div className='title'>upcoming tournament</div>
            <div className='content-frame'>
                <div className='image-frame'>
                    <img src={LaptopPNG} alt='' />
                </div>
                <div className='row-frame'>
                    <div>total prize</div>
                    <div>registered players</div>
                </div>
                <div className='row-frame'>
                    <div className='green'>1,000,000 $TTE</div>
                    <div>153</div>
                </div>
                <div className='gap-line'></div>
                <div className='row-frame'>
                    <div className='col-frame'>
                        <div>start in</div>
                        <div>00:00:00:00</div>
                    </div>
                    <BgButton label='register' onClick={() => {}} />
                </div>
            </div>
        </UpcomingTournamentContainer>
    )
}

export default UpcomingTournament;
