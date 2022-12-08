import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useContract } from "../../../contexts/ContractContext";
import { useCustomWallet } from "../../../contexts/WalletContext";
import useToast from "../../../hooks/useToast";

const Ownership = () => {

  const { reloadCounter, refreshPages, transferOwnership } = useContract()
  const { wallet, isLoggedIn } = useCustomWallet()
  const { toastError, showLoading, hideLoading, toastSuccess } = useToast()

  const [newOwner, setNewOwner] = useState('')

  const handleTransferOwnership = useCallback(() => {
    if (isLoggedIn() !== true) {
      toastError('Wallet', 'Please connect wallet first');
      return;
    }

    showLoading(`Transferring ownership...`);

    transferOwnership(newOwner)
      .then(tx => {
        refreshPages();
        toastSuccess('Ownership', 'Success ' + tx.transactionHash);
        hideLoading();
      })
      .catch(err => {
        toastError('Ownership', `${err.message}`);
        hideLoading();
      })
  }, [wallet.address, isLoggedIn, toastError, showLoading, transferOwnership, refreshPages, toastSuccess, hideLoading, newOwner])

  return (
    <OwnershipContainer>
      <div className='flex-column'>
        <div className='grid-2'>
          <div className='grid-label'>New Owner</div>
          <input className='grid-value-input' value={newOwner} onChange={e => setNewOwner(e.target.value)} />
        </div>
        <Button onClick={handleTransferOwnership}>Transfer</Button>
      </div>
    </OwnershipContainer>
  );
};


const OwnershipContainer = styled.div`
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

export default Ownership
