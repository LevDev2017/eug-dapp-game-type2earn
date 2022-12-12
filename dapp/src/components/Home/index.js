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
      </Routes>
      {walletConnect === true && <WalletConnect close={() => setWalletConnect(false)} />}
      {chainSelView === true && <SwitchChain close={() => switchChain(false)} />}
    </HomeContainer>
  )
}
