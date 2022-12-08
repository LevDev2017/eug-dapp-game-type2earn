import React, { useEffect, useState, useCallback } from 'react'

import {
  PresalePaneContainer
} from './styles'

import { useContract } from '../../contexts/ContractContext'
import { useGlobal } from '../../contexts/GlobalContext'

import useToast from '../../hooks/useToast'
import { useCustomWallet } from '../../contexts/WalletContext'
import walletConfig from '../../contexts/WalletContext/config'
import { FlipDate } from './FlipDate'
import { ProgressBar } from './ProgressBar'
import { ProgressBar2 } from './ProgressBar2'
import Launch from "./Launch"
import PriceUpdate from './PriceUpdate'
import MinMaxUpdate from './MinMaxUpdate'
import TokenAddresses from './TokenAddresses'
import CoinReceiver from './CoinReceiver'
import Ownership from './TransferOwnership'

import moment from 'moment'

export const PresalePane = (props) => {

  const { reloadCounter, refreshPages, getVTokenSymbol, getPresaleCoinSymbol, getTokenPrice, 
    getPresaleOwner, getStartTimestamp, getEndTimestamp, getTotalSellAmount, getVTokenAddress,
    getTotalAmountSold, getMinAmountPerWallet, getMaxAmountPerWallet, getTokenDistributed,  
    getPresaleCoinBalance, getCoinApprovedAmount, approvePresaleCoin,
    claimPublic} = useContract()
  const { chainId } = useGlobal()

  const { stringFormat } = useGlobal()
  const { toastError, showLoading, hideLoading, toastSuccess } = useToast()
  const { isLoggedIn, wallet } = useCustomWallet()

  const [flipTime, setFlipTime] = useState(moment.utc(new Date()).format())
  const [vTokenAddress, setVTokenAddress] = useState('')
  const [vTokenName, setVTokenName] = useState('ROYAL')
  const [cTokenName, setCTokenName] = useState('USD')

  const [vTokenPrice, setVTokenPrice] = useState(0)
  const [contractOwner, setContractOwner] = useState('')

  const [startTimestamp, setStartTimestamp] = useState(0)
  const [endTimestamp, setEndTimestamp] = useState(0)

  const [presaleStep, setPresaleStep] = useState(0)
  const [flipDateNumbers, setFlipDateNumbers] = useState(0)

  const [totalAmountToSell, setTotalAmountToSell] = useState(0)
  const [totalAmountSold, setTotalAmountSold] = useState(0)
  const [maxToSell, setMaxToSell] = useState(0)

  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(0)

  const [myValue, setMyValue] = useState()
  const [myValueStr, setMyValueStr] = useState('')

  const [myDistributedValue, setMyDistributedValue] = useState(0)

  const [coinAmountToCharge, setCoinAmountToCharge] = useState(0)
  const [errMsg, setErrMsg] = useState('Please input the amount')

  const [myCoinBalance, setMyCoinBalance] = useState(0)

  const [coinApprovedAmount, setCoinApprovedAmount] = useState(0)
  const [claimResolution, setClaimResolution] = useState(0.1)

  const [isOwner, setOwner] = useState(false)

  useEffect(() => {
    let ac = new AbortController();

    getVTokenSymbol()
      .then(r => {
        if (ac.signal.aborted === false) {
          setVTokenName(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getPresaleCoinSymbol()
      .then(r => {
        if (ac.signal.aborted === false) {
          setCTokenName(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getTokenPrice()
      .then(r => {
        if (ac.signal.aborted === false) {
          setVTokenPrice(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getPresaleOwner()
      .then(r => {
        if (ac.signal.aborted === false) {
          setContractOwner(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getStartTimestamp()
      .then(r => {
        if (ac.signal.aborted === false) {
          setStartTimestamp(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getEndTimestamp()
      .then(r => {
        if (ac.signal.aborted === false) {
          setEndTimestamp(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getTotalSellAmount()
      .then(r => {
        if (ac.signal.aborted === false) {
          setTotalAmountToSell(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getTotalAmountSold()
      .then(r => {
        if (ac.signal.aborted === false) {
          setTotalAmountSold(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getMinAmountPerWallet()
      .then(r => {
        if (ac.signal.aborted === false) {
          setMinAmount(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getMaxAmountPerWallet()
      .then(r => {
        if (ac.signal.aborted === false) {
          setMaxAmount(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getTokenDistributed(wallet.address)
      .then(r => {
        if (ac.signal.aborted === false) {
          setMyDistributedValue(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getPresaleCoinBalance(wallet.address)
      .then(r => {
        if (ac.signal.aborted === false) {
          setMyCoinBalance(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getCoinApprovedAmount(wallet.address)
      .then(r => {
        if (ac.signal.aborted === false) {
          setCoinApprovedAmount(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    getVTokenAddress()
      .then(r => {
        if (ac.signal.aborted === false) {
          setVTokenAddress(r)
        }
      })
      .catch(err => {
        console.log(`${err.message}`)
      })

    return () => ac.abort();
  }, [reloadCounter, wallet.address, getVTokenSymbol, getPresaleCoinSymbol, getTokenPrice, 
    getPresaleOwner, getStartTimestamp, getEndTimestamp, getTotalSellAmount, getTotalAmountSold, getVTokenAddress,
    getMinAmountPerWallet, getMaxAmountPerWallet, getTokenDistributed, getPresaleCoinBalance, getCoinApprovedAmount])

  useEffect(() => {
    setOwner(contractOwner.toLowerCase() === wallet.address.toLowerCase())
  }, [contractOwner, wallet.address])

  useEffect(() => {
    let maxAmount = 0
    if (totalAmountSold == 0) {
      maxAmount = 50000
    } else if (totalAmountSold < 50000 * 10) {
      maxAmount = Math.floor((totalAmountSold + 49999) / 50000) * 50000;
    } else if (totalAmountSold < 50000 * 100) {
      maxAmount = 50000 * 100;
    } else {
      maxAmount = totalAmountSold;
    }

    if (maxAmount >= totalAmountToSell) {
      maxAmount = totalAmountToSell
    }
    setMaxToSell(maxAmount)
  }, [totalAmountToSell, totalAmountSold])

  useEffect(() => {
    const tc = (new Date()).getTime() + 1000

    if (tc < startTimestamp) {
      setFlipTime(moment.utc(new Date(startTimestamp)).format())
      setPresaleStep(0)
    } else if (tc < endTimestamp) {
      setFlipTime(moment.utc(new Date(endTimestamp)).format())
      setPresaleStep(1)
    } else if (startTimestamp >= 100000){
      setPresaleStep(2)
    } else {
      setPresaleStep(3)
    }
  }, [startTimestamp, endTimestamp, flipDateNumbers])

  const handleAddveTokenToWallet = async () => {
    if (window.ethereum === undefined) {
      toastError('Add token', 'Not defined Metamask')
      return;
    }

    showLoading('Adding token to metamask...')

    const tokenAddress = vTokenAddress;
    const tokenSymbol = vTokenName;
    const tokenDecimals = 18;
    const tokenImage = '';

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      // const wasAdded = 
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      // if (wasAdded) {
      //   await toastSuccess('Metamask', 'Token added')
      // } else {
      //   await toastError('Metamask', 'Already exists')
      // }
    } catch (error) {
      await toastError('Metamask', `${error.message}`)
    }
    hideLoading()
  }

  const handleClaimValue = useCallback((t) => {
    setMyValueStr(t)
    
    const tNum = parseFloat(t)
    if (isNaN(tNum)) {
      setMyValue(undefined)
      return
    }

    let multiple = tNum / claimResolution
    let multipleIntegerPart = Math.floor(multiple)
    let rounded = multipleIntegerPart * claimResolution

    setMyValue(Math.floor(rounded * 100) / 100)
  }, [claimResolution])

  useEffect(() => {
    if (myValue === undefined) return

    let ac = new AbortController()
    if (parseFloat(myValueStr) != myValue) {
      setTimeout(() => {
        if (ac.signal.aborted !== true) {
          setMyValueStr(myValue.toString())
        }
      }, 2000)
    }

    return () => ac.abort()
  }, [myValueStr, myValue])

  useEffect(() => {
    if (myValue === undefined) {
      setErrMsg('Please input valid amount')
      return
    }

    setCoinAmountToCharge(myValue * vTokenPrice)
    if (myValue < minAmount) {
      setErrMsg('Too small amount')
    } else if (myValue > maxAmount) {
      setErrMsg('Too big amount')
    } else {
      setErrMsg('')
    }
  }, [myValue, vTokenPrice, minAmount, maxAmount])

  const handleApprovePresaleCoin = useCallback(() => {
    if (isLoggedIn() !== true) {
      toastError('Wallet', 'Please connect wallet first');
      return;
    }

    showLoading(`Approving ${cTokenName}...`);

    approvePresaleCoin()
      .then(tx => {
        refreshPages();
        toastSuccess('Approve', 'Success');
        hideLoading();
      })
      .catch(err => {
        toastError('Approve', `${err.message}`);
        hideLoading();
      })
  }, [wallet.address, cTokenName, toastError, showLoading, approvePresaleCoin, refreshPages, toastSuccess, hideLoading])

  const handleClaim = useCallback(() => {
    if (isLoggedIn() !== true) {
      toastError('Wallet', 'Please connect wallet first');
      return;
    }

    showLoading(`Claiming ${myValue} $${vTokenName}...`);

    claimPublic(coinAmountToCharge)
      .then(tx => {
        refreshPages();
        toastSuccess('Claim', `Success: ${tx.transactionHash}`)
        hideLoading();
      })
      .catch(err => {
        toastError('Claim', `${err.message}`);
        hideLoading();
      })
  }, [coinAmountToCharge, vTokenName, claimPublic, toastError, showLoading, refreshPages, toastSuccess, hideLoading])

  return (
    <PresalePaneContainer>
      <div className='top-frame'>
        <div className='subtitle'>Royalty Sale <sup>({walletConfig[chainId].networkName})</sup></div>

        <div className='summary-frame'>
          <div className='p1-frame padding-20 margin-8 info-frame-1'>
            <div className='row-1 row-center'>
              <div className='small-description'>
                <span>${vTokenName}</span> tokens entitle you to revenues from all DBK token sales for 25 years.  See links for more information.
              </div>
            </div>
          </div>
        </div>

        <div className='summary-frame'>
          <div className='p1-frame padding-20 margin-8 info-frame'>
            <div className='row-1 row-center'>
              <div className='grid-4'>
                <div className='ref-unit'>1 ${vTokenName}</div>
                <div className='equal-op'>=</div>
                <div className='real-amount'>{Math.floor(vTokenPrice * 10000) / 10000}</div>
                <div className='real-unit'>${cTokenName}</div>
              </div>
            </div>
          </div>
          <div className='p1-frame'>
            <div className='row-1 row-center'>
              <div className='flip-time-prefix'>
                {
                  presaleStep === 0 ? 'Presale will get started in' :
                    presaleStep === 1 ? 'Presale will be ended in' :
                      presaleStep === 2 ? 'Presale ended' :
                        'Presale is not active'
                }
              </div>
              {presaleStep < 2 && <FlipDate value={flipTime} aggregateNumber={setFlipDateNumbers} onEndProc={refreshPages}/>}
            </div>
          </div>
          { presaleStep !== 2 &&
            <div className='p1-frame'>
              <div className='grid-2'>
                <div className='total-sold-label'>Total Sold (${vTokenName})</div>
                <ProgressBar min={0} max={maxToSell} value={totalAmountSold} />
              </div>
            </div>
          }
        </div>

        { presaleStep !== 2 && 
          <div className='summary-frame'>
            <div className='p1-frame padding-20 margin-8 info-frame'>
              <div className='row-1 row-center'>
                <ProgressBar2 min={minAmount} max={maxAmount} value={myValue} valueSetter={/*myDistributedValue > 0 ? (t) => { } : */ handleClaimValue} />
              </div>
              <div className="row-1 row-center custom-info"><div>Already purchased {myDistributedValue} ${vTokenName}</div></div>
              {
                <div className='row-1 row-center'>
                  <div className='claim-label'>Buy (${vTokenName})</div>
                  <input className='claim-amount-input' value={myValueStr} onChange={/*myDistributedValue > 0 ? (e) => { } : */e => handleClaimValue(e.target.value)} />
                  {
                    /*myDistributedValue === 0 && */(
                      errMsg !== '' ? <div className='fix-error'>!</div> :
                        coinAmountToCharge > coinApprovedAmount ?
                          <div className='claim-button' onClick={handleApprovePresaleCoin}>{`Approve ${cTokenName}`}</div> :
                          <div className='claim-button' onClick={handleClaim}>Buy ${vTokenName}</div>
                    )
                  }
                </div>
              }
              <div className='row-1 row-center black-bg-10 padding-10'>
                <div className='custom-info'>
                  {errMsg ? errMsg : <div className='coin-balance-frame'>You have <span>{myCoinBalance.toFixed(2)}</span> ${cTokenName}. You {/*myDistributedValue === 0? */'will charge'/*: 'charged'*/} <span>{Math.floor(coinAmountToCharge * 10000) / 10000}</span> ${cTokenName}.</div>}
                </div>
              </div>
            </div>
          </div>
        }

        <div className='summary-frame'>
          <div className='p1-frame padding-20 margin-8 info-frame-1'>
            <div className={`token-contract ${isLoggedIn() === true ? "" : "unconnected"}`} onClick={handleAddveTokenToWallet}>Add ${vTokenName} to metamask</div>
            <a href={`${walletConfig[chainId].blockUrls[0]}token/${vTokenAddress}`} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }} className='token-address'>
              {vTokenAddress}
            </a>
          </div>
        </div>

        {
          isOwner === true && <>
            <div className='admin-panel-label'>Admin Panel</div>
            <div className='admin-grid-2'>
              <Launch />
              <PriceUpdate />
              <MinMaxUpdate />
              <TokenAddresses />
              <CoinReceiver />
              <Ownership />
            </div>
          </>
        }
        
      </div>
    </PresalePaneContainer>
  )
}
