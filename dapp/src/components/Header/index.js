import React from 'react'

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

const Header = (props) => {
    return (
        <HeaderContainer>
            <HeaderItem icon={<KeyboardSVG />} label='' link='/' def/>
            <HeaderItem icon={<DashboardSVG />} label='home' link='/dashboard' selected/>
            <HeaderItem icon={<InventorySVG />} label='inventory' link='/inventory' />
            <HeaderItem icon={<PVESVG />} label='pvE' link='/pve' />
            <HeaderItem icon={<PVPSVG />} label='pvP' link='/pvp' />
            <HeaderItem icon={<TournamentSVG />} label='tournament' link='/tournament' />
            <HeaderItem icon={<LeaderboardSVG />} label='leaderboard' link='/leaderboard' />
            <HeaderItem icon={<StakingSVG />} label='staking' link='/staking' desc='SOON'/>
        </HeaderContainer>
    )
}

export default Header;
