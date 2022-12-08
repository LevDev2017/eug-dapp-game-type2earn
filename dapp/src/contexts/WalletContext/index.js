import React from 'react'
import { useWallet } from 'use-wallet'
import { isMobile } from 'react-device-detect'

import { createContext, useContext, useState, useEffect, useCallback } from "react";

import walletConfig from './config';
import { useGlobal } from '../GlobalContext';

const Web3 = require("web3");

export const WalletContext = createContext();

const walletSessionKey = 'walletHyperXV1';

export const WalletProvider = (props) => {
    const { chainId } = useGlobal()

    const [wallet, setWallet] = useState({
        address: '',
        chainId: 0
    });

    const defWallet = useWallet();

    const connectWalletChain = useCallback(async (_chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls) => {
        let ethereum = window.ethereum;
        if (ethereum === undefined)
            return;

        try {
            await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: _chainId }] });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            console.log("error switch chain: ", switchError);
            if (switchError.code === 4902) {
                const data = [{
                    // chainId: '0x38',
                    chainId: _chainId,
                    // chainName: 'Binance Smart Chain',
                    chainName: chainName,
                    // nativeCurrency:
                    // {
                    //     name: 'BNB',
                    //     symbol: 'BNB',
                    //     decimals: 18
                    // },
                    nativeCurrency: nativeCurrency,
                    // rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    rpcUrls: rpcUrls,
                    // blockExplorerUrls: ['https://bscscan.com/'],
                    blockExplorerUrls: blockExplorerUrls
                }]

                await ethereum.request({ method: 'wallet_addEthereumChain', params: data })
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error('Failed to add network ', error)
                        throw error
                    })
            }
        }
    }, [])

    const connectWalletByConfig = useCallback(async () => {
        return await connectWalletChain(
            walletConfig[chainId].chainId,
            walletConfig[chainId].networkName,
            walletConfig[chainId].nativeCurrency,
            walletConfig[chainId].rpcUrls,
            walletConfig[chainId].blockUrls
        )
    }, [connectWalletChain, chainId])

    useEffect(() => {
        // console.log('--------------', defWallet);

        setWallet(t => {
            if (defWallet._web3ReactContext.library === undefined) {
                return {
                    ...t,
                    address: '',
                    chainId: 0
                }
            } else {
                return {
                    ...t,
                    address: defWallet.account,
                    chainId: defWallet.chainId
                }
            }
        })

        if (defWallet._web3ReactContext.library !== undefined) {
            window.web3 = new Web3(defWallet._web3ReactContext.library);
        } else {
            window.web3 = undefined;
        }
    }, [defWallet])

    useEffect(() => {
        window.web3 = undefined;
        // if (isMobile) defWallet.connect('walletconnect');
        // else defWallet.connect();
    }, [])

    useEffect(() => {
        let oldAddr = window.localStorage.getItem(walletSessionKey);
        if (wallet.address !== '' && wallet.address !== oldAddr) {
            window.localStorage.setItem(walletSessionKey, wallet.address);
            console.log(`wallet: ${oldAddr} => ${wallet.address}`);
        }
    }, [wallet.address])

    const getWalletAddressBySessionKey = useCallback(() => {
        let oldAddr = window.localStorage.getItem(walletSessionKey);
        return oldAddr;
    }, [])

    const connectWallet = async (w) => {
        if (w === 'injected') {
            await defWallet.connect();
            
            if (defWallet._web3ReactContext.library === undefined || defWallet.chainId !== parseInt(walletConfig[chainId].chainId, 16)) {
                await connectWalletByConfig()
    
                if (w === 'injected') await defWallet.connect();
                else await defWallet.connect(w);
            }
        }
        else await defWallet.connect(w);
    }

    const disconnectWallet = () => {
        defWallet.reset();
    }

    const isLoggedIn = () => {
        return defWallet._web3ReactContext.library !== undefined;
    }

    return (
        <WalletContext.Provider value={{ connectWallet, disconnectWallet, connectWalletByConfig, getWalletAddressBySessionKey, wallet, isLoggedIn }}>
            {props.children}
        </WalletContext.Provider>
    )
}

export const useCustomWallet = () => {
    const dataManager = useContext(WalletContext)
    return dataManager || [{}, async () => { }]
}
