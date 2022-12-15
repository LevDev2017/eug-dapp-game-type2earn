import React, { useEffect, useRef, useCallback } from 'react'

import {
    ResultModalContainer
} from './styles'

import ResultModalBarSVG from '../../assets/svg/result-modal-bar.svg'
import OKLabelSVG from '../../assets/svg/modal-ok-label.svg'
import FailLabelSVG from '../../assets/svg/modal-fail-label.svg'

import SpButton from '../SpButton'

const ResultModal = (props) => {
    const { close, result, label1, label2, label3, icon, handleClick } = props

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
        <ResultModalContainer>
            <div className='ambient-dark'></div>
            <div className='model-frame' ref={myRef}>
                <img src={ResultModalBarSVG} alt='' />
                <div className='content-frame'>
                    <div className='svg-label'>
                        <img src={result === 'ok'? OKLabelSVG: result === 'fail'? FailLabelSVG: ''} alt='' />
                        <div className='first-label'>{label1}</div>
                    </div>
                    <div className='row-frame'>
                        <div className='second-label'>{label2}</div>
                    </div>
                    <div className='row-frame align-center'>
                        <div className='third-label'>{label3}</div>
                        <img src={icon} alt='' />
                    </div>
                    <div className='row-frame'>
                        <SpButton label='next' handleClick={handleClick} />
                    </div>
                </div>
            </div>
        </ResultModalContainer>
    )
}

export default ResultModal;
