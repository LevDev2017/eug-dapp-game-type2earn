import React from 'react'

import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'

import {
  RightPaneContainer
} from './styles'

import { PresalePane } from '../PresalePane'

import useToast from '../../hooks/useToast'
import { useCustomWallet } from '../../contexts/WalletContext'
import walletConfig from '../../contexts/WalletContext/config'
import { useGlobal } from '../../contexts/GlobalContext'

export const RightPane = (props) => {

  const { setLogin, switchNetwork, showDoc } = props;
  const { chainId } = useGlobal()

  const location = useLocation();

  const { disconnectWallet, wallet, isLoggedIn } = useCustomWallet();
  const { toastError } = useToast();

  return (
    <RightPaneContainer>
      <div className='section-frame'>
        <div className='button-frame'>
          <a href='https://diamondback.io/' target='_blank' rel='noreferrer' className='site-load'>
            <i class="fa-solid fa-gem"></i>
            <span>https://diamondback.io</span>
          </a>
          <div className='site-load' onClick={showDoc}>
            <i class="fa-solid fa-book"></i>
            <span>docs</span>
          </div>
          <div className='gap'></div>  
          <div className='switch-network' onClick={switchNetwork}>
            <i className="fa-sharp fa-solid fa-shuffle circle"></i>
            <span>{walletConfig[chainId].networkName}</span>
          </div>
          {isLoggedIn() ?
            <div className='logout-wallet' onClick={disconnectWallet}>
              { `Logout ${wallet.address.slice(0, 5) + '...' + wallet.address.slice(-3)}`}
            </div>
          : 
            <div className='connect-wallet' onClick={setLogin}>
              Connect Wallet
            </div>
          }
        </div>
      </div>
      <PresalePane />
    </RightPaneContainer>
  )
}
