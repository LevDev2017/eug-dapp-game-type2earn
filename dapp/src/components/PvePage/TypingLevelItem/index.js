import React from 'react'

import {
    TypingLevelItemContainer
} from './styles'

import TypingLevelBackPNG from '../../../assets/images/typing-level-back.png'
import LockSVG from '../../../assets/svg/lock.svg'

const TypingLevelItem = (props) => {
    const { level, unlocked, selected, handleSelect } = props

    return (
        <TypingLevelItemContainer>
            <img src={TypingLevelBackPNG} alt='' className='img-fix-width'/>
            <div className='typing-level'>
                typing level
                <span className='number'>{level}</span>
            </div>
            <div className={`${unlocked === true? 'hide': 'show'}`}>
                <div className='endark'></div>
                <div className='unlock-frame'>
                    <img src={LockSVG} alt='' />
                    <span>WIN PREVIOUS LEVEL TO UNLOCK</span>
                </div>
            </div>
            <div className={`${unlocked === true? 'show': 'hide'}`}>
                <div className={`${selected === true? 'show': 'hide'}`}>
                    <div className='thick-border'></div>
                    <div className='corner-1'></div>
                    <div className='corner-2'></div>
                    <div className='corner-3'></div>
                    <div className='corner-4'></div>
                </div>
                <div className={`${selected === false? 'show': 'hide'}`}>
                    <div className='normal-border'></div>
                </div>
            </div>
            <div className={`${unlocked === false? 'hide': 'show'}`}>
                <div className='bright' onClick={handleSelect? handleSelect: () => {}}></div>
            </div>
        </TypingLevelItemContainer>
    )
}

export default TypingLevelItem;
