import React, { useEffect, useRef, useCallback } from 'react'
import { useCustomWallet } from '../../contexts/WalletContext'
import {
  SwitchChainContainer
} from './styles'

import EthereumPNG from '../../assets/images/ethereum.png'
import BSCPNG from '../../assets/images/bnb.png'
import { useGlobal } from '../../contexts/GlobalContext'

export const SwitchChain = (props) => {
  const { close } = props;

  const ht = useRef();
  const { disconnectWallet } = useCustomWallet()
  const { setChainIndex, chainId } = useGlobal()

  const handleEthereumSelect = () => {
    if (chainId !== 1) {
      setChainIndex && setChainIndex(0);
      disconnectWallet()
    }
    close && close();
  }

  const handleBSCSelect = () => {
    if (chainId !== 56) {
      setChainIndex && setChainIndex(1);
      disconnectWallet()
    }

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
    <SwitchChainContainer>
      <div className='wallet-frame' ref={ht}>
        <div className='one-wallet top-radius' onClick={handleEthereumSelect}>
          <div className='wallet-caption'>
            <img src={EthereumPNG} alt='metamask' width='44px' height='44px' />
            <div className='wallet-label'>Ethereum</div>
          </div>
          <div className='wallet-description'>Ethereum mainnet (chain id: 1)</div>
        </div>

        <div className='one-wallet bottom-radius' onClick={handleBSCSelect}>
          <div className='wallet-caption'>
            <img src={BSCPNG} alt='metamask' width='36px' height='36px' />
            <div className='wallet-label'>Binance Smart Chain</div>
          </div>
          <div className='wallet-description'>Binance Smart Chain (chain id: 56)</div>
        </div>
      </div>
    </SwitchChainContainer>
  )
}
