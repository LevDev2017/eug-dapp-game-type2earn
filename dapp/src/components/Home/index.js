import React, { useState, useEffect } from 'react'

import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'

import {
  HomeContainer,
} from './styles'

import { WalletConnect } from '../WalletConnect'
import { SwitchChain } from '../SwitchChain'
import { useWindowSize } from '../../hooks/useWindowSize'

import LandingPage from '../LandingPage'
import DashboardPage from '../DashboardPage'
import InventoryPage from '../InventoryPage'
import PvePage from '../PvePage'
import PvpPage from '../PvpPage'
import TournamentPage from '../TournamentPage'
import TournamentMatchPage from '../TournamentMatchPage'
import LeaderboardPage from '../LeaderboardPage'

export const Home = (props) => {
  const w = useWindowSize()
  const location = useLocation()

  const [walletConnect, setWalletConnect] = useState(false)
  const [chainSelView, switchChain] = useState(false)

  return (
    <HomeContainer>
      <Routes location={location}>
        <Route exact path='/' element={<LandingPage />}></Route>
        <Route exact path='/dashboard' element={<DashboardPage />}></Route>
        <Route exact path='/inventory' element={<InventoryPage />}></Route>
        <Route exact path='/pve' element={<PvePage category='prepare' />}></Route>
        <Route exact path='/pve/match' element={<PvePage category='match' />}></Route>
        <Route exact path='/pvp' element={<PvpPage />}></Route>
        <Route exact path='/tournament' element={<TournamentPage />}></Route>
        <Route exact path='/tournament/match' element={<TournamentMatchPage category='match'/>}></Route>
        <Route exact path='/tournament/final' element={<TournamentMatchPage category='final'/>}></Route>
        <Route exact path='/leaderboard' element={<LeaderboardPage category='pve'/>}></Route>
        <Route exact path='/leaderboard/l-pve' element={<LeaderboardPage category='pve'/>}></Route>
        <Route exact path='/leaderboard/l-pvp' element={<LeaderboardPage category='pvp'/>}></Route>
        <Route exact path='/leaderboard/l-tournament' element={<LeaderboardPage category='tournament'/>}></Route>
      </Routes>
      {walletConnect === true && <WalletConnect close={() => setWalletConnect(false)} />}
      {chainSelView === true && <SwitchChain close={() => switchChain(false)} />}
    </HomeContainer>
  )
}
