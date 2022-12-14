import React, { useEffect, useRef, useState, useCallback } from 'react'

import {
    PlayPaneContainer
} from './styles'

import PlayPaneTopBarSVG from '../../../assets/svg/playpane-topbar.svg'
import BgButton from '../../BgButton'

const PlayPane = (props) => {
    const { close } = props

    const [error, setError] = useState('')
    const [amount, setAmount] = useState('')

    const myRef = useRef()

    const handleClickOutside = useCallback((e) => {
        const outSideMenu = !myRef.current?.contains(e.target)
        if (outSideMenu) {
            close && close();
        }
    }, [close, myRef.current])

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('click', handleClickOutside)
        }, 200)

        return () => window.removeEventListener('click', handleClickOutside)
    }, [handleClickOutside])

    return (
        <PlayPaneContainer>
            <div className='ambient-dark'></div>
            <div className='model-frame' ref={myRef}>
                <img src={PlayPaneTopBarSVG} alt='' />
                <div className='content-frame'>
                    <div className='label1'>bet amount ($tte)</div>
                    <div className='tte-input-frame'>
                        <input className='tte-amount-input' placeholder='Maximum. 500 $TTE' value={amount} onChange={e => setAmount(e.target.value)} />
                        <div className='max-button'>max</div>
                    </div>
                    <div className={`label2 ${error ? 'error' : ''}`}>{error ? error : 'Balance: 1000 $TTE'}</div>
                    <div className='gap-line'></div>
                    <div className='typing-level-frame'>
                        <div className='typing-level'>typing level</div>
                        <div className='levels'>
                            <div className='level-item'>1</div>
                            <div className='level-item'>2</div>
                            <div className='level-item-selected'>3</div>
                            <div className='level-item'>4</div>
                            <div className='level-item'>5</div>
                            <div className='level-item'>6</div>
                            <div className='level-item'>7</div>
                            <div className='level-item'>8</div>
                            <div className='level-item'>9</div>
                            <div className='level-item'>10</div>
                            <div className='level-item'>11</div>
                            <div className='level-item'>12</div>
                        </div>
                    </div>
                    <div className='confirm-frame'>
                        <BgButton label='confirm' onClick={() => setError('Insufficient Funds')} dense />
                    </div>
                </div>
            </div>
        </PlayPaneContainer>
    )
}

export default PlayPane;
