import React from 'react'
// import { Link } from 'react-router-dom'

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
import { Footer } from '../Footer'

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
          {/* <a href='https://diamondback.io/' target='_blank' rel='noreferrer' className='site-load'>
            <i className="fa-solid fa-gem"></i>
            <span>https://diamondback.io</span>
          </a> */}
          {/* <a href='https://docs.google.com/viewerng/viewer?url=https://dbk.finance/litepaper.pdf' target='_blank' rel='noreferrer' className='site-load'>
            <i className="fa-solid fa-book"></i>
            <span>docs</span>
          </a> */}
          {/* https://drive.google.com/file/d/1-ohi80_OOodcv0XvH_NjAjzRAitjosFs/view?usp=sharing */}
          <a href='https://youtu.be/7Htx08UmQI4' target='_blank' rel='noreferrer' className='site-load'>
            <i className="fa-solid fa-book"></i>
            <span>docs</span>
          </a>
          {/* <a href='https://dexo.infura-ipfs.io/ipfs/bafybeiccwjvyuj7qgtgfrzb4otk6ghoz5ocblk7znajorjads4w4hava3u/royalty-sale-litepaper.pdf' target='_blank' rel='noreferrer' className='site-load'>
            <i className="fa-solid fa-book"></i>
            <span>docs</span>
          </a> */}
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
      <Footer />
    </RightPaneContainer>
  )
}
