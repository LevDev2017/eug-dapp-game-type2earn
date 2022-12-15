import React, { useEffect, useRef, useState } from 'react'
import SpButton from '../../SpButton'

import {
    RankingInfoContainer
} from './styles'

const RankingInfo = (props) => {
    const { isHeader, rankingId, rankingIcon, avatar, username, level, wallet, totalEarned } = props
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
        <RankingInfoContainer sticky={isHeader === true? true: false} ref={myRef}>
            <div className={`ranking-id ${isHeader === true? 'green-1': 'dark'}`}>
                {
                    rankingIcon?
                        <img src={rankingIcon} alt='' />
                        :
                        rankingId
                }
            </div>
            <div className={`username ${isHeader === true? 'green-1': 'dark'}`}>
                {avatar && <img src={avatar} alt='' />}
                {username}
            </div>
            <div className={`typing-level ${isHeader === true? 'green-1': 'dark'}`}>{level}</div>
            <div className={`wallet ${isHeader === true? 'green-1': 'dark'}`}>{wallet}</div>
            <div className={`total-earned ${isHeader === true? 'green-1': 'dark'}`}>{totalEarned}</div>
            <div className={`hover-frame ${hover === true? 'show': 'hide'}`}>
                <div className='button-frame'>
                    <SpButton label='view info'/>
                </div>
                <div className='selected-border'></div>
            </div>
        </RankingInfoContainer>
    )
}

export default RankingInfo;
