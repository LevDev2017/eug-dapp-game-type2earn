import React, { useEffect, useRef, useState } from 'react'

import {
    PlayerOutlineContainer
} from './styles'

import PlayerOutlineSVG from '../../../assets/svg/player-outline.svg'
import RefreshSVG from '../../../assets/svg/refresh.svg'
import SpButton from '../../SpButton'
import { useNavigate } from 'react-router-dom'

const PlayerOutline = (props) => {
    const {icon, id, loadout} = props

    const [hover, setHover] = useState(false)
    const myRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
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
    }, [myRef.current])

    return (
        <PlayerOutlineContainer ref={myRef}>
            <img className='width-300' src={PlayerOutlineSVG} alt=''/>
            <div className='stand-image'>
                <img src={icon} alt='' />
            </div> 
            {id && <div className='id-field'>#{id}</div>}
            <div className={`loadout ${hover === true && loadout === true? 'show': 'hide'}`}>
                <SpButton icon={<img src={RefreshSVG} alt='' />} label='loadout' handleClick={() => navigate('/inventory')}/>
            </div>
        </PlayerOutlineContainer>
    )
}

export default PlayerOutline;
