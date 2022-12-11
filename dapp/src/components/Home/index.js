import React, { useState, useEffect } from 'react'

import {
  HomeContainer,
} from './styles'

import { WalletConnect } from '../WalletConnect'
import { SwitchChain } from '../SwitchChain'
import { useWindowSize } from '../../hooks/useWindowSize'

import LandingPage from '../LandingPage'

export const Home = (props) => {
  const w = useWindowSize()

  const [walletConnect, setWalletConnect] = useState(false)
  const [chainSelView, switchChain] = useState(false)

  return (
    <HomeContainer>
      <LandingPage />
      {walletConnect === true && <WalletConnect close={() => setWalletConnect(false)} />}
      {chainSelView === true && <SwitchChain close={() => switchChain(false)} />}
    </HomeContainer>
  )
}
