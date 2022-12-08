import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useContract } from "../../../contexts/ContractContext";
import { useCustomWallet } from "../../../contexts/WalletContext";
import useToast from "../../../hooks/useToast";

const MinMaxUpdate = () => {

  const { reloadCounter, refreshPages, updateMinMaxTokenPerWallet, getVTokenSymbol, 
    getMinAmountPerWallet, getMaxAmountPerWallet, getTotalSellAmount, updateTotalCap } = useContract()
  const { wallet, isLoggedIn } = useCustomWallet()
  const { toastError, showLoading, hideLoading, toastSuccess } = useToast()

  const [vTokenSymbol, setVTokenSymbol] = useState('')
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  const [newMinVal, setNewMinVal] = useState('')
  const [newMaxVal, setNewMaxVal] = useState('')
  const [totalSell, setTotalSell] = useState(0)
  const [newTotalSell, setNewTotalSell] = useState('')

  useEffect(() => {
    let ac = new AbortController()

    getMinAmountPerWallet()
      .then(r => {
        if (ac.signal.aborted === false) {
          setMinVal(r)
        }
      })
      .catch(err => {
        console.log(err)
      })

    getMaxAmountPerWallet()
      .then(r => {
        if (ac.signal.aborted === false) {
          setMaxVal(r)
        }
      })
      .catch(err => {
        console.log(err)
      })

    getVTokenSymbol()
      .then(r => {
        if (ac.signal.aborted === false) {
          setVTokenSymbol(r)
        }
      })
      .catch(err => {
        console.log(err)
      })

    getTotalSellAmount()
      .then(r => {
        if (ac.signal.aborted === false) {
          setTotalSell(r)
        }
      })
      .catch(err => {
        console.log(err)
      })

    return () => { ac.abort() }
  }, [reloadCounter, getMinAmountPerWallet, getMaxAmountPerWallet, getVTokenSymbol, getTotalSellAmount])

  const handleUpdateMinMaxValue = useCallback(() => {
    if (isLoggedIn() !== true) {
      toastError('Wallet', 'Please connect wallet first');
      return;
    }

    showLoading(`Updating min/max value...`);

    updateMinMaxTokenPerWallet(newMinVal, newMaxVal)
      .then(tx => {
        refreshPages();
        toastSuccess('MinMaxUpdate', 'Success ' + tx.transactionHash);
        hideLoading();
      })
      .catch(err => {
        toastError('MinMaxUpdate', `${err.message}`);
        hideLoading();
      })
  }, [wallet.address, isLoggedIn, toastError, showLoading, updateMinMaxTokenPerWallet, refreshPages, toastSuccess, hideLoading, newMinVal, newMaxVal])

  const handleUpdateTotalCap = useCallback(() => {
    if (isLoggedIn() !== true) {
      toastError('Wallet', 'Please connect wallet first');
      return;
    }

    showLoading(`Updating Total Cap...`);

    updateTotalCap(newTotalSell)
      .then(tx => {
        refreshPages();
        toastSuccess('Total Cap', 'Success ' + tx.transactionHash);
        hideLoading();
      })
      .catch(err => {
        toastError('Total Cap', `${err.message}`);
        hideLoading();
      })
  }, [wallet.address, isLoggedIn, toastError, showLoading, updateTotalCap, refreshPages, toastSuccess, hideLoading, newTotalSell])

  return (
    <PriceUpdateContainer>
      <div className='flex-column'>
        <div className='grid-2'>
          <div className='grid-label'>New Min.</div>
          <input className='grid-value-input' placeholder={`old min: ${Math.floor(minVal * 10000) / 10000} $${vTokenSymbol}`} value={newMinVal} onChange={e => setNewMinVal(e.target.value)} />
          <div className='grid-label'>New Max.</div>
          <input className='grid-value-input' placeholder={`old max: ${Math.floor(maxVal * 10000) / 10000} $${vTokenSymbol}`} value={newMaxVal} onChange={e => setNewMaxVal(e.target.value)} />
        </div>
        <Button onClick={handleUpdateMinMaxValue}>Update</Button>
      </div>
      <div className='flex-column'>
        <div className='grid-2'>
          <div className='grid-label'>New Total Cap</div>
          <input className='grid-value-input' placeholder={`old: ${Math.floor(totalSell * 10000) / 10000} $${vTokenSymbol}`} value={newTotalSell} onChange={e => setNewTotalSell(e.target.value)} />
        </div>
        <Button onClick={handleUpdateTotalCap}>Update</Button>
      </div>
    </PriceUpdateContainer>
  );
};


const PriceUpdateContainer = styled.div`
  background-color: #fff1;
  border-radius: 8px;

  .flex-row {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    flex-gap: 10px;
    gap: 10px;
  }

  .flex-column {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    flex-gap: 20px;
    gap: 20px;

    padding-bottom: 30px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    column-gap: 10px;
    row-gap: 6px;
    justify-content: center;
    align-items: center;

    .grid-label, .grid-value {
      font-size: 10px;
    }

    .grid-value {
      color: #fc8;
    }

    .grid-value-input {
      border: none;
      outline: none;
      padding: 4px 12px;
      border-radius: 4px;

      :placeholder {
        color: #0004;
      }
    }
  }
`;

const Button = styled.div`
  background: linear-gradient(176deg, #17c139, #28e868 70%, #e5f57a);
  border-radius: 8px;
  text-align: center;
  color: black;
  font-size: 16px;
  padding: 4px 8px;
  user-select: none;
  cursor: pointer;
  transition: all .2s ease-in-out;
  max-width: 200px;

  &:hover {
    transform: scale(1.02, 1.02);
  }

  &:active {
    background: linear-gradient(176deg, #0e6c18, #144432 70%, #186578);
    transform: scale(0.98, 0.98);
    color: #ccc;
  }
`;

export default MinMaxUpdate
