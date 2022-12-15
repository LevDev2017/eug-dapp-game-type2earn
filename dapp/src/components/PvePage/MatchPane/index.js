import React, { useEffect, useState } from 'react'

import {
    MatchPaneContainer
} from './styles'

import PlayerOutline from '../../DashboardPage/PlayerOutline'
import StandPNG from '../../../assets/images/stand.png'
import RobotPNG from '../../../assets/images/3d-robot 1.png'
import SPSVG from '../../../assets/svg/sp-mark-2.svg'
import KeyboardLayout from '../../KeyboardLayout'

const MatchPane = (props) => {
    const [counter, setCounter] = useState(10)

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => {
                setCounter(t => t - 1)
            }, [1000])
        }
    }, [counter])

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
                                <div className='typing-bar'>
                                    <div className='typing-progress'></div>
                                </div>
                                <div className='typing-content'>
                                    this is your typing you need to complete you need to complete you need to complete you need to complete you need to complete you need to complete you need to complete 
                                    <div className='typed-area typing-content green'>
                                        this is your typing you need to compl
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
                    <KeyboardLayout dispatch={(ch) => console.log(ch)} enabled={counter === 0}/>
                </div>
            </div>
        </MatchPaneContainer>
    )
}

export default MatchPane;
