import React, { useState } from 'react'

import {
    PlayPaneContainer
} from './styles'

import PlayPaneTopBarSVG from '../../../assets/svg/playpane-topbar.svg'
import BgButton from '../../BgButton'
import { useNavigate } from 'react-router-dom'

const PlayPane = (props) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [amount, setAmount] = useState('')

    return (
        <PlayPaneContainer>
            <img src={PlayPaneTopBarSVG} alt='' />
            <div className='content-frame'>
                <div className='label1'>bet amount ($tte)</div>
                <div className='tte-input-frame'>
                    <input className='tte-amount-input' placeholder='Maximum. 500 $TTE' value={amount} onChange={e => setAmount(e.target.value)} />
                    <div className='max-button'>max</div>
                </div>
                <div className={`label2 ${error? 'error': ''}`}>{error? error: 'Balance: 1000 $TTE'}</div>
                <div className='gap-line'></div>
                <div className='play-frame'>
                    <div>
                        <div className='reward-label'>estimated reward</div>
                        <div className='reward-label'>0 $tte</div>
                    </div>
                    <BgButton label='PLAY' onClick={() => {
                        setError('Insufficient Funds')
                        setTimeout(() => {
                            navigate('/pve/match')
                        }, [1000])
                    }} dense/>
                </div>
            </div>
        </PlayPaneContainer>
    )
}

export default PlayPane;
