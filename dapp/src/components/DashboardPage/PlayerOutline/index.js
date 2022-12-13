import React, { useEffect, useRef, useState } from 'react'

import {
    PlayerOutlineContainer
} from './styles'

import PlayerOutlineSVG from '../../../assets/svg/player-outline.svg'
import StandPNG from '../../../assets/images/stand.png'
import RefreshSVG from '../../../assets/svg/refresh.svg'
import SpButton from '../../SpButton'
import { useNavigate } from 'react-router-dom'

const PlayerOutline = (props) => {
    const [select, setSelect] = useState(false)
    const myRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const onmouseover = (event) => {
            setSelect(true)
        }

        const onmouseout = (event) => {
            setSelect(false)
        }

        myRef.current?.addEventListener('mouseover', onmouseover, true)
        myRef.current?.addEventListener('mouseout', onmouseout, true)

        return () => {
            myRef.current?.removeEventListener('mouseover', onmouseover, true)
            myRef.current?.removeEventListener('mouseout', onmouseout, true)
        }
    }, [myRef.current])

    return (
        <PlayerOutlineContainer ref={myRef}>
            <img src={PlayerOutlineSVG} alt='' className='back-image-frame'/>
            <div className='stand-image'>
                <img src={StandPNG} alt='' />
            </div> 
            <div className='id-field'>#1382</div>
            <div className={`loadout ${select === true? 'show': 'hide'}`}>
                <SpButton icon={<img src={RefreshSVG} alt='' />} label='loadout' handleClick={() => navigate('/inventory')}/>
            </div>
        </PlayerOutlineContainer>
    )
}

export default PlayerOutline;
