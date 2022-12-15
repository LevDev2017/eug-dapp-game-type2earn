import React, { useEffect, useRef, useState, useCallback } from 'react'

import {
    ModalPaneContainer
} from './styles'

import ModalPaneTopBarSVG from '../../../assets/svg/playpane-topbar.svg'
import CancelBackSVG from '../../../assets/svg/cancel-back.svg'
import ConfirmBackSVG from '../../../assets/svg/confirm-back.svg'

const ModalPane = (props) => {
    const { close, handleClick } = props

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
        <ModalPaneContainer>
            <div className='ambient-dark'></div>
            <div className='model-frame' ref={myRef}>
                <img src={ModalPaneTopBarSVG} alt='' />
                <div className='content-frame'>
                    <div className='label1'>Are you sure to register in this tournament?</div>
                    <div className='label2'>cost: 500 $TTE</div>
                    <div className='button-frame'>
                        <div className='button-1' onClick={() => close && close()}>
                            <img src={CancelBackSVG} alt='cancel button' />
                            <div className='button-label white'>cancel</div>
                        </div>
                        <div className='button-1' onClick={handleClick}>
                            <img src={ConfirmBackSVG} alt='confirm button' />
                            <div className='button-label black'>confirm</div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalPaneContainer>
    )
}

export default ModalPane;
