import React, { useState, useEffect } from 'react'

import {
  HomeContainer,
  BackgroundImageContainer
} from './styles'

import { RightPane } from '../RightPane'
import { WalletConnect } from '../WalletConnect'
import { SwitchChain } from '../SwitchChain'
import { DocView } from '../DocView'
import { useWindowSize } from '../../hooks/useWindowSize'
// import { useContract } from '../../contexts/ContractContext'
// import { useCustomWallet } from '../../contexts/WalletContext'

export const Home = (props) => {
  const w = useWindowSize()

  const [walletConnect, setWalletConnect] = useState(false)
  const [chainSelView, switchChain] = useState(false)
  const [docView, setDocView] = useState(false)

  return (
    <HomeContainer>
      {
        (true === true)?
        <>
          <BackgroundImageContainer>
            <div className='back1'></div>
            <div className='motion-1'></div>
            <div className='motion-2'></div>
            <div className='motion-3'></div>
          </BackgroundImageContainer>

          <RightPane login={walletConnect} setLogin={() => setWalletConnect(true)} switchNetwork={() => switchChain(true)} showDoc={() => setDocView(true)}/>
          {walletConnect === true && <WalletConnect close={() => setWalletConnect(false)} />}
          {chainSelView === true && <SwitchChain close={() => switchChain(false)} />}
          {docView === true && <DocView close={() => setDocView(false)} />}
        </>
        :
        <div className='center-row'>
          <div className='not-launched-label'>App is being launched again soon...</div>
        </div>
      }
    </HomeContainer>
  )
}
