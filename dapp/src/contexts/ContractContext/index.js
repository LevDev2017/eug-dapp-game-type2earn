import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { useCustomWallet } from "../WalletContext"
import IERC20_abi from './abi/IERC20.json'
import Token_abi from './abi/ERC20.json'
import Presale_abi from './abi/PresaleNorm.json'

import walletConfig from '../WalletContext/config'
import ADDRESS from './address'

import BigNumber from 'bignumber.js'
import { useGlobal } from "../GlobalContext"

const Web3 = require("web3")

export const ContractContext = createContext();

export const ContractProvider = (props) => {

    const { wallet } = useCustomWallet()
    const { chainId } = useGlobal()

    const [reloadCounter, setReloadCounter] = useState(0)
    const web3Provider = useMemo(() => {return new Web3(walletConfig[chainId].rpcUrls[0])}, [chainId, walletConfig])

    useEffect(() => {
        let ac = new AbortController();

        const reload = () => {
            setReloadCounter(t => { return t + 1 });
        }

        let tmr = setInterval(() => {
            if (ac.signal.aborted === false) {
                window.web3 && reload();
            }
        }, 60000);

        return () => {
            ac.abort();
            clearInterval(tmr);
        }
    }, [])

    useEffect(() => {
        setReloadCounter(t => { return t + 1 });
    }, [wallet])

    const refreshPages = () => {
        setReloadCounter(t => { return t + 1 });
    }

    const makeTx = useCallback(async (addr, tx, gasPlus) => {
        const web3 = window.web3;
        web3.eth.getGasPrice()
        tx.estimateGas({ from: wallet.address })

        const [gasPrice, gasCost] = await Promise.all([
            web3.eth.getGasPrice(),
            tx.estimateGas({ from: wallet.address }),
        ]);
        const data = tx.encodeABI();
        const txData = {
            from: wallet.address,
            to: addr,
            data,
            gas: gasCost + (gasPlus !== undefined? gasPlus: 0),
            gasPrice
        };
        const receipt = await web3.eth.sendTransaction(txData);
        return receipt;
    }, [wallet.address])

    const makeTxWithNativeCurrency = useCallback(async (addr, tx, nativeCurrencyAmount, gasPlus) => {
        const web3 = window.web3;

        const [gasPrice, gasCost] = await Promise.all([
            web3.eth.getGasPrice(),
            tx.estimateGas({
                value: nativeCurrencyAmount,
                from: wallet.address
            }),
        ]);
        const data = tx.encodeABI();
        const txData = {
            from: wallet.address,
            to: addr,
            value: nativeCurrencyAmount,
            data,
            gas: gasCost + (gasPlus !== undefined? gasPlus: 0),
            gasPrice
        };
        const receipt = await web3.eth.sendTransaction(txData);
        return receipt;
    }, [wallet.address])

    const A2D = useCallback(async (addr, amount) => {
        const web3 = web3Provider;
        const erc20 = new web3.eth.Contract(Token_abi.abi, addr);

        let tval = await erc20.methods.decimals().call();
        let tt = new BigNumber(amount).div(new BigNumber(`1e${tval}`));
        tt = tt.toFixed(10, BigNumber.ROUND_DOWN);
        return parseFloat(tt);
    }, [web3Provider])

    const D2A = useCallback(async (addr, amount) => {
        const web3 = web3Provider;
        const toBN = web3.utils.toBN;
        const erc20 = new web3.eth.Contract(Token_abi.abi, addr);
        let tval = await erc20.methods.decimals().call();
        tval = new BigNumber(amount).times(new BigNumber(`1e${tval}`))
        return toBN(tval.toFixed(0));
    }, [web3Provider])

    const balanceOf = useCallback(async (token, address) => {
        if (address === '') {
            throw new Error('balanceOf: not connected to the wallet');
        }

        const web3 = web3Provider;

        const tokenContract = new web3.eth.Contract(IERC20_abi.abi, token);
        let ret = await tokenContract.methods.balanceOf(address).call();

        return await A2D(token, ret);
    }, [A2D, web3Provider])

    const getTokenApprovedAmount = useCallback(async (token, owner, spender) => {
        const web3 = web3Provider;

        const tokenContract = new web3.eth.Contract(Token_abi.abi, token);
        let ret = await tokenContract.methods.allowance(owner, spender).call();

        return await A2D(token, ret);
    }, [A2D, web3Provider])

    const approveToken = useCallback(async (token, spender) => {
        const web3 = window.web3;

        const tokenContract = new web3.eth.Contract(Token_abi.abi, token);
        let tx = await makeTx(token, tokenContract.methods.approve(spender, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'));

        return tx;
    }, [makeTx])

    const getPresaleCoinSymbol = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        const cAddress = await presaleContract.methods.cToken().call();
        const tokenContract = new web3.eth.Contract(Token_abi.abi, cAddress);

        return await tokenContract.methods.symbol().call();
    }, [web3Provider, ADDRESS, chainId])

    const getPresaleCoinBalance = useCallback(async (_user) => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        const cAddress = await presaleContract.methods.cToken().call();
        const tokenContract = new web3.eth.Contract(Token_abi.abi, cAddress);

        const amount = await tokenContract.methods.balanceOf(_user).call();
        return await A2D(cAddress, amount)
    }, [web3Provider, ADDRESS, chainId])

    const getPresaleOwner = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        return await presaleContract.methods.owner().call()
    }, [web3Provider, ADDRESS, chainId])

    const getStartTimestamp = useCallback(async () => {
        const web3 = web3Provider;

        const latest = await web3.eth.getBlockNumber()
        const block = await web3.eth.getBlock(latest)

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const startT = parseInt(await presaleContract.methods.startTimestamp().call())

        return (startT - block.timestamp) * 1000 + (new Date()).getTime()
    }, [web3Provider, ADDRESS, chainId])

    const getEndTimestamp = useCallback(async () => {
        const web3 = web3Provider;

        const latest = await web3.eth.getBlockNumber()
        const block = await web3.eth.getBlock(latest)

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const endT = parseInt(await presaleContract.methods.endTimestamp().call())
        return (endT - block.timestamp) * 1000 + (new Date()).getTime()
    }, [web3Provider, ADDRESS, chainId])

    const getVTokenAddress = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.vToken().call()
        return tokenAddress
    }, [web3Provider, ADDRESS, chainId])

    const getCTokenAddress = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.cToken().call()
        return tokenAddress
    }, [web3Provider, ADDRESS, chainId])

    const getCoinReceiver = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const receiver = await presaleContract.methods.coinReceiver().call()
        return receiver
    }, [web3Provider, ADDRESS, chainId])

    const getTotalSellAmount = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.vToken().call()
        const totalAmount = await presaleContract.methods.totalvTokenToSell().call()
        return await A2D(tokenAddress, totalAmount)
    }, [web3Provider, A2D, ADDRESS, chainId])

    const getTotalAmountSold = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.vToken().call()
        const totalAmount = await presaleContract.methods.vTokenDistributed().call()
        return await A2D(tokenAddress, totalAmount)
    }, [web3Provider, A2D, ADDRESS, chainId])

    const getMinAmountPerWallet = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.vToken().call()
        const minAmount = await presaleContract.methods.minvTokenPerWallet().call()
        return await A2D(tokenAddress, minAmount)
    }, [web3Provider, A2D, ADDRESS, chainId])

    const getMaxAmountPerWallet = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.vToken().call()
        const maxAmount = await presaleContract.methods.maxvTokenPerWallet().call()
        return await A2D(tokenAddress, maxAmount)
    }, [web3Provider, A2D, ADDRESS, chainId])

    const getTokenPrice = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)

        const vTokenAddress = await presaleContract.methods.vToken().call()
        const cTokenAddress = await presaleContract.methods.cToken().call()

        const vTokenContract = new web3.eth.Contract(Token_abi.abi, vTokenAddress)
        const cTokenContract = new web3.eth.Contract(Token_abi.abi, cTokenAddress)

        const vDecimal = await vTokenContract.methods.decimals().call()
        const cDecimal = await cTokenContract.methods.decimals().call()

        const denom = await presaleContract.methods.priceDenominator().call()
        const numer = await presaleContract.methods.priceNumerator().call()

        let t1 = BigNumber(denom.toString()).div(BigNumber(`1e${cDecimal.toString()}`))
        let t2 = BigNumber(numer.toString()).div(BigNumber(`1e${vDecimal.toString()}`))
        return t1.div(t2).toNumber()
    }, [web3Provider, ADDRESS, chainId])

    const getVTokenSymbol = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.vToken().call()
        const vTokenContract = new web3.eth.Contract(Token_abi.abi, tokenAddress)
        return await vTokenContract.methods.symbol().call()
    }, [web3Provider, ADDRESS, chainId])

    const getTokenDistributed = useCallback(async (_user) => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.vToken().call()
        const amount = await presaleContract.methods.vTokenDistribution(_user).call()
        return await A2D(tokenAddress, amount)
    }, [web3Provider, A2D, ADDRESS, chainId])

    const getCoinApprovedAmount = useCallback(async (_user) => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.cToken().call()
        return await getTokenApprovedAmount(tokenAddress, _user, ADDRESS[chainId].presale)
    }, [web3Provider, getTokenApprovedAmount, ADDRESS, chainId])

    const approvePresaleCoin = useCallback(async () => {
        const web3 = web3Provider;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale)
        const tokenAddress = await presaleContract.methods.cToken().call()
        return await approveToken(tokenAddress, ADDRESS[chainId].presale)
    }, [web3Provider, approveToken, ADDRESS, chainId])

    const claimPublic = useCallback(async (amount) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        let cTokenAddress = await presaleContract.methods.cToken().call()
        let coinAmountToCharge = await D2A(cTokenAddress, amount)
        let tx = await makeTx(ADDRESS[chainId].presale, presaleContract.methods.sellPublic(coinAmountToCharge));

        return tx;
    }, [makeTx, ADDRESS, chainId, D2A])

    const giftToken = useCallback(async (receiver, amount) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        let cTokenAddress = await presaleContract.methods.cToken().call()
        let coinAmountToCharge = await D2A(cTokenAddress, amount)
        let tx = await makeTx(ADDRESS[chainId].presale, presaleContract.methods.gift(receiver, coinAmountToCharge));

        return tx;
    }, [makeTx, ADDRESS, chainId, D2A])

    const launchPresale = useCallback(async (startAfter, duration) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        let tx = await makeTx(ADDRESS[chainId].presale, presaleContract.methods.launchPresale(startAfter, duration));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    const expandPresale = useCallback(async (duration) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        let tx = await makeTx(ADDRESS[chainId].presale, presaleContract.methods.expandPresale(duration));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    const updatePrice = useCallback(async (newPrice) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        const vTokenAddress = await presaleContract.methods.vToken().call()
        const cTokenAddress = await presaleContract.methods.cToken().call()

        const vTokenContract = new web3.eth.Contract(Token_abi.abi, vTokenAddress)
        const cTokenContract = new web3.eth.Contract(Token_abi.abi, cTokenAddress)

        const vDecimal = await vTokenContract.methods.decimals().call()
        const cDecimal = await cTokenContract.methods.decimals().call()

        let denominator = BigNumber(newPrice).times(BigNumber(`1e${cDecimal.toString()}`)).toString()
        let numberator = BigNumber(`1e${vDecimal.toString()}`).toString()
        let tx = await makeTx(ADDRESS[chainId].presale, presaleContract.methods.updatePrice(denominator, numberator));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    const updateMinMaxTokenPerWallet = useCallback(async (newMin, newMax) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        const vTokenAddress = await presaleContract.methods.vToken().call()
        const vTokenContract = new web3.eth.Contract(Token_abi.abi, vTokenAddress)
        const vDecimal = await vTokenContract.methods.decimals().call()

        let tx = await makeTx(ADDRESS[chainId].presale, 
            presaleContract.methods.updateMinMaxTokenPerWallet(BigNumber(newMin).times(BigNumber(`1e${vDecimal.toString()}`)).toFixed(), BigNumber(newMax).times(BigNumber(`1e${vDecimal.toString()}`)).toFixed()));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    const updateTotalCap = useCallback(async (newTotalCap) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        const vTokenAddress = await presaleContract.methods.vToken().call()
        const vTokenContract = new web3.eth.Contract(Token_abi.abi, vTokenAddress)
        const vDecimal = await vTokenContract.methods.decimals().call()

        let tx = await makeTx(ADDRESS[chainId].presale, 
            presaleContract.methods.updateTotalTokenToSell(BigNumber(newTotalCap).times(BigNumber(`1e${vDecimal.toString()}`)).toFixed()));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    const updateTokens = useCallback(async (newVToken, newCToken) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        let tx = await makeTx(ADDRESS[chainId].presale, 
            presaleContract.methods.updateTokens(newVToken, newCToken));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    const updateCoinReceiver = useCallback(async (newReceiver) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        let tx = await makeTx(ADDRESS[chainId].presale, 
            presaleContract.methods.updateCoinReceiver(newReceiver));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    const transferOwnership = useCallback(async (newOwner) => {
        const web3 = window.web3;

        const presaleContract = new web3.eth.Contract(Presale_abi.abi, ADDRESS[chainId].presale);
        let tx = await makeTx(ADDRESS[chainId].presale, 
            presaleContract.methods.transferOwnership(newOwner));

        return tx;
    }, [makeTx, ADDRESS, chainId])

    return (
        <ContractContext.Provider value={{
            reloadCounter, refreshPages, makeTx, makeTxWithNativeCurrency,
            A2D, D2A, balanceOf, getTokenApprovedAmount, approveToken, 
            getPresaleCoinSymbol, getPresaleOwner, getVTokenAddress,
            getVTokenSymbol, getTokenPrice, getCTokenAddress, getCoinReceiver,
            getStartTimestamp, getEndTimestamp, getTotalSellAmount, getTotalAmountSold,
            getMinAmountPerWallet, getMaxAmountPerWallet, getTokenDistributed, getPresaleCoinBalance,
            getCoinApprovedAmount, approvePresaleCoin, claimPublic, launchPresale, expandPresale,
            updatePrice, updateMinMaxTokenPerWallet, updateTotalCap, updateTokens,
            updateCoinReceiver, transferOwnership, giftToken
        }}>
            {props.children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    const contractManager = useContext(ContractContext)
    return contractManager || [{}, async () => { }]
}
