import React, { useEffect, useRef, useState } from 'react'
import SpButton from '../../SpButton'

import {
    RoomInfoContainer
} from './styles'

const RoomInfo = (props) => {
    const { isHeader, roomId, avatar, owner, level, betAmount } = props
    const myRef = useRef()
    const [hover, setHover] = useState()

    useEffect(() => {
        if (isHeader !== true) {
            const onmouseover = (event) => {
                setHover(true)
            }

            const onmouseout = (event) => {
                setHover(false)
            }

            myRef.current?.addEventListener('mouseover', onmouseover, true)
            myRef.current?.addEventListener('mouseout', onmouseout, true)

            return () => {
                myRef.current?.removeEventListener('mouseover', onmouseover, true)
                myRef.current?.removeEventListener('mouseout', onmouseout, true)
            }
        }
    }, [myRef.current, isHeader])

    return (
        <RoomInfoContainer sticky={isHeader === true? true: false} ref={myRef}>
            <div className={`room-id ${isHeader === true? 'green': 'dark'}`}>{roomId}</div>
            <div className={`owner ${isHeader === true? 'green': 'dark'}`}>
                {avatar && <img src={avatar} alt='' />}
                {owner}
            </div>
            <div className={`typing-level ${isHeader === true? 'green': 'dark'}`}>{level}</div>
            <div className={`bet-amount ${isHeader === true? 'green': 'dark'}`}>{betAmount}</div>
            <div className={`hover-frame ${hover === true? 'show': 'hide'}`}>
                <div className='button-frame'>
                    <SpButton label='join game'/>
                </div>
            </div>
        </RoomInfoContainer>
    )
}

export default RoomInfo;
