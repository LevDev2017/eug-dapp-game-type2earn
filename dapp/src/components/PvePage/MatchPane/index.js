import React, { useEffect, useState, useCallback } from 'react'

import {
    MatchPaneContainer
} from './styles'

import PlayerOutline from '../../DashboardPage/PlayerOutline'
import StandPNG from '../../../assets/images/stand.png'
import RobotPNG from '../../../assets/images/3d-robot 1.png'
import SPSVG from '../../../assets/svg/sp-mark-2.svg'
import KeyboardLayout from '../../KeyboardLayout'
import ProgressBar from '../../ProgressBar'

const MatchPane = (props) => {
    const { handleResult } = props

    const [counter, setCounter] = useState(10)
    const [typingText, setTypingText] = useState('')
    const [typedText, setTypedText] = useState('')
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => {
                setCounter(t => t - 1)
            }, [1000])
        } else {
            setTypingText('this pve game is designed to have fun for typists')
            setTypedText('')
        }
    }, [counter])

    const handleDispatch = useCallback((ch) => {
        if (typedText.length < typingText.length) {
            if (typingText.charAt(typedText.length).toUpperCase() === ch.toUpperCase()) {
                setTypedText(typingText.substring(0, typedText.length + 1))
            }
        }
    }, [typingText, typedText])

    useEffect(() => {
        if (typingText.length === 0) setPercent(0)
        else setPercent(Math.round(typedText.length * 100 * 100 / typingText.length) / 100)

        if (typingText.length > 0 && typedText.length == typingText.length ) {
            setTimeout(() => {
                handleResult && handleResult()
                setTypedText('')
            }, 1000)
        }
    }, [typingText.length, typedText.length, handleResult])

    return (
        <MatchPaneContainer>
            <div className='col-frame'>
                <div className='row-frame align-center justify-center'>
                    <div className='label capitalize'>typing level</div>
                    <div className='green-square'>2</div>
                </div>
                <div className='row-frame justify-fit padding-top-100 full-width'>
                    <div className='col-frame align-center relative'>
                        <div className='small-label uppercase opponent-label'>JOHNY BLAZE</div>
                        <PlayerOutline icon={StandPNG} id='1382' loadout={true}/>
                        <div className='row-frame'>
                            <img src={SPSVG} alt='' />
                            <div className='col-frame variable-item gap-5'>
                                <div className='line-1'>Special Skill</div>
                                <div className='line-2'>You just need to type QWERTYYUIOPP</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-frame align-center'>
                        {
                            counter === 0? 
                            <>
                                <ProgressBar percent={percent}/>
                                <div className='typing-content'>
                                    {typingText}
                                    <div className='typed-area typing-content green'>
                                        {typedText}
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className='small-label capitalize'>get ready<br/>the game will start in</div>
                                <div className='big-label green'>{counter}</div>
                            </>
                        }
                    </div>
                    <div className='col-frame align-center relative'>
                        <div className='small-label uppercase opponent-label'></div>
                        <PlayerOutline icon={RobotPNG} id=''/>
                    </div>
                </div>
                <div className='row-frame justify-center'>
                    <KeyboardLayout dispatch={handleDispatch} selectedChar={typedText.length < typingText.length? typingText.charAt(typedText.length): ''} enabled={counter === 0}/>
                </div>
            </div>
        </MatchPaneContainer>
    )
}

export default MatchPane;
