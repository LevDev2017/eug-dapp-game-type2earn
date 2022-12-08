import React, { useEffect, useRef, useCallback } from 'react'
import { useCustomWallet } from '../../contexts/WalletContext'
import {
  WalletConnectContainer
} from './styles'

import MetamaskPNG from '../../assets/images/Metamask-Icon.png'
import WalletConnectPNG from '../../assets/images/ConnectWallet-icon.png'

export const WalletConnect = (props) => {
  const { close } = props;

  const ht = useRef();

  const { connectWallet } = useCustomWallet();

  const handleMetamaskConnect = () => {
    connectWallet && connectWallet('injected');
    close && close();
  }

  const handleWalletConnect = () => {
    connectWallet && connectWallet('walletconnect');
    close && close();
  }

  const handleClickOutside = useCallback((e) => {
    const outSideMenu = !ht.current?.contains(e.target)
    if (outSideMenu) {
      close && close();
    }
  }, [close])

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  return (
    <WalletConnectContainer>
      <div className='wallet-frame' ref={ht}>
        <div className='one-wallet top-radius' onClick={handleMetamaskConnect}>
          <div className='wallet-caption'>
            <img src={MetamaskPNG} alt='metamask' width='36px' height='36px' />
            <div className='wallet-label'>Metamask</div>
          </div>
          <div className='wallet-description'>Connect to your MetaMask Wallet</div>
        </div>

        <div className='one-wallet bottom-radius' onClick={handleWalletConnect}>
          <div className='wallet-caption'>
            <img src={WalletConnectPNG} alt='metamask' width='36px' height='36px' />
            <div className='wallet-label'>WalletConnect</div>
          </div>
          <div className='wallet-description'>Scan with WalletConnect to connect</div>
        </div>
      </div>
    </WalletConnectContainer>
  )
}
