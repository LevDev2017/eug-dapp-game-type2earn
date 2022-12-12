import React, { useEffect, useState } from 'react'

import {
    HeaderContainer
} from './styles'

import HeaderItem from './HeaderItem'

import { KeyboardSVG } from '../SvgIcons'
import { DashboardSVG } from '../SvgIcons'
import { InventorySVG } from '../SvgIcons'
import { PVESVG } from '../SvgIcons'
import { PVPSVG } from '../SvgIcons'
import { TournamentSVG } from '../SvgIcons'
import { LeaderboardSVG } from '../SvgIcons'
import { StakingSVG } from '../SvgIcons'
import { useLocation } from 'react-router-dom'

const Header = (props) => {
    const location = useLocation()

    const routerPaths = [
        '/dashboard',
        '/inventory',
        '/pve',
        '/pvp',
        '/tournament',
        '/leaderboard',
        '/staking'
    ]

    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        let t = routerPaths.findIndex(r => location.pathname.includes(r))
        if (t < 0) setSelectedIndex(0)
        else setSelectedIndex(1 + t)
    }, [location.pathname])
    return (
        <HeaderContainer>
            <HeaderItem icon={<KeyboardSVG />} label='' link='/' def/>
            <HeaderItem icon={<DashboardSVG />} label='home' link={routerPaths[0]} selected={selectedIndex === 1}/>
            <HeaderItem icon={<InventorySVG />} label='inventory' link={routerPaths[1]} selected={selectedIndex === 2}/>
            <HeaderItem icon={<PVESVG />} label='pvE' link={routerPaths[2]} selected={selectedIndex === 3} />
            <HeaderItem icon={<PVPSVG />} label='pvP' link={routerPaths[3]} selected={selectedIndex === 4} />
            <HeaderItem icon={<TournamentSVG />} label='tournament' link={routerPaths[4]} selected={selectedIndex === 5} />
            <HeaderItem icon={<LeaderboardSVG />} label='leaderboard' link={routerPaths[5]} selected={selectedIndex === 6} />
            <HeaderItem icon={<StakingSVG />} label='staking' link={routerPaths[6]} selected={selectedIndex === 7} desc='SOON'/>
        </HeaderContainer>
    )
}

export default Header;
