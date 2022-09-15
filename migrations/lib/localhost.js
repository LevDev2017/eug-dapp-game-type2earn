var fs = require('fs')
const BN = require('bignumber.js')

const { syncDeployInfo, deployContract, deployContractAndProxy } = require('./deploy')
const { addressZero, bytes32Zero, maxUint256,
  WBNB, PancakeRouter, PancakeFactory, PBUSD,
  WorldCupToken, 
  SinglePlayerGym, SinglePlayerGymProxy, MultiPlayerGym, MultiPlayerGymProxy, TournamentGym, TournamentGymProxy,
  RandomUpgradeable, RandomProxy, NumericHelper, NFTManagerUpgradeable, NFTManagerProxy  } = require('./const')

const deploy_localhost = async (web3, deployer, accounts, specialAccounts) => {
    let network = 'localhost'
    const { owner, proxyAdmin, pancakeFeeSetter } = specialAccounts

    let totalRet = []
    try {
      let readInfo = fs.readFileSync(`migrations/deploy-${network}.json`);
      totalRet = JSON.parse(readInfo);
    } catch(err) {
      console.log(`${err.message}`);
    }
    // console.log(totalRet);

    let wbnbInfo = totalRet.find(t => t.name === "WBNB")
    let factoryInfo = totalRet.find(t => t.name === "PancakeFactory")
    let routerInfo = totalRet.find(t => t.name === "PancakeRouter")
    let pbusdInfo = totalRet.find(t => t.name === "PBUSD")

    let wcTokenInfo = totalRet.find(t => t.name === "WorldCupToken")

    let randomInfo = totalRet.find(t => t.name === "RandomUpgradeable")
    let numericInfo = totalRet.find(t => t.name === "NumericHelper")
    let nftInfo = totalRet.find(t => t.name === "NFTManagerUpgradeable")
    let singlePlayerInfo = totalRet.find(t => t.name === "SinglePlayerGym")
    let multiPlayerInfo = totalRet.find(t => t.name === "MultiPlayerGym")
    let tournamentInfo = totalRet.find(t => t.name === "TournamentGym")

    wbnbInfo = await deployContract(deployer, "WBNB", WBNB)
    totalRet = syncDeployInfo(network, "WBNB", wbnbInfo, totalRet)

    factoryInfo = await deployContract(deployer, "PancakeFactory", PancakeFactory, pancakeFeeSetter)
    totalRet = syncDeployInfo(network, "PancakeFactory", factoryInfo, totalRet)

    routerInfo = await deployContract(deployer, "PancakeRouter", PancakeRouter, factoryInfo.imple, wbnbInfo.imple)
    totalRet = syncDeployInfo(network, "PancakeRouter", routerInfo, totalRet)

    pbusdInfo = await deployContract(deployer, "PBUSD", PBUSD)
    totalRet = syncDeployInfo(network, "PBUSD", pbusdInfo, totalRet)

    let pbusdContract = await PBUSD.at(pbusdInfo.imple)
    let tx = await pbusdContract.approve(routerInfo.imple, maxUint256)
    console.log('approved PBUSD for pancake router:', tx.receipt.transactionHash)

    let routerContract = await PancakeRouter.at(routerInfo.imple)

    tx = await routerContract.addLiquidityETH(pbusdInfo.imple, "1000000000000000000000000", 0, 0, addressZero, '0xffffffff',
                    {from: owner, value: "5000000000000000000000"})

    console.log('added BNB/PBUSD pair:', tx.receipt.transactionHash)

    wcTokenInfo = await deployContract(deployer, "WorldCupToken", WorldCupToken,
                                      [accounts[1], accounts[2]],
                                      ["1000000000000000000000", "1000000000000000000000"],
                                      "100000000000000000000",
                                      routerInfo.imple)
    totalRet = syncDeployInfo(network, "WorldCupToken", wcTokenInfo, totalRet)

    randomInfo = await deployContractAndProxy(deployer, "RandomUpgradeable", RandomUpgradeable, RandomProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "RandomUpgradeable", randomInfo, totalRet)

    let rand = await RandomUpgradeable.at(randomInfo.proxy)
    tx = await rand.setRouter(routerInfo.imple)
    console.log("set router for random generator:", tx.receipt.transactionHash)
    tx = await rand.setPair(await routerContract.WETH(), pbusdInfo.imple)
    console.log("set pair for random generator:", tx.receipt.transactionHash)

    numericInfo = await deployContract(deployer, "NumericHelper", NumericHelper, randomInfo.proxy);
    totalRet = syncDeployInfo(network, "NumericHelper", numericInfo, totalRet)

    nftInfo = await deployContractAndProxy(deployer, "NFTManagerUpgradeable", NFTManagerUpgradeable, NFTManagerProxy, proxyAdmin, "initialize", ["address"], [numericInfo.imple]);
    totalRet = syncDeployInfo(network, "NFTManagerUpgradeable", nftInfo, totalRet)

    singlePlayerInfo = await deployContractAndProxy(deployer, "SinglePlayerGym", SinglePlayerGym, SinglePlayerGymProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "SinglePlayerGym", singlePlayerInfo, totalRet)

    multiPlayerInfo = await deployContractAndProxy(deployer, "MultiPlayerGym", MultiPlayerGym, MultiPlayerGymProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "MultiPlayerGym", multiPlayerInfo, totalRet)

    tournamentInfo = await deployContractAndProxy(deployer, "TournamentGym", TournamentGym, TournamentGymProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "TournamentGym", tournamentInfo, totalRet)

    let nftContract = await NFTManagerUpgradeable.at(nftInfo.proxy)
    tx = await nftContract.updateToken(wcTokenInfo.imple)
    console.log("set token to NFT collection", tx.receipt.transactionHash)
    tx = await nftContract.updateSinglePlayerGame(singlePlayerInfo.proxy)
    console.log("set single player game to NFT collection", tx.receipt.transactionHash)
    tx = await nftContract.updateMultiPlayerGame(multiPlayerInfo.proxy)
    console.log("set multi player game to NFT collection", tx.receipt.transactionHash)
    tx = await nftContract.updateTournamentGame(tournamentInfo.proxy)
    console.log("set tournament game to NFT collection", tx.receipt.transactionHash)

    let singlePlayerContract = await SinglePlayerGym.at(singlePlayerInfo.proxy)
    tx = await singlePlayerContract.updatePlayerManager(nftInfo.proxy)
    console.log("set player manager(NFT) to single player game", tx.receipt.transactionHash)
    tx = await singlePlayerContract.updatePaymentToken(wcTokenInfo.imple)
    console.log("set payment token to single player game", tx.receipt.transactionHash)

    let multiPlayerContract = await MultiPlayerGym.at(multiPlayerInfo.proxy)
    tx = await multiPlayerContract.updatePlayerManager(nftInfo.proxy)
    console.log("set player manager(NFT) to multi player game", tx.receipt.transactionHash)
    tx = await multiPlayerContract.updatePaymentToken(wcTokenInfo.imple)
    console.log("set payment token to multi player game", tx.receipt.transactionHash)

    let tournamentContract = await TournamentGym.at(tournamentInfo.proxy)
    tx = await tournamentContract.updatePlayerManager(nftInfo.proxy)
    console.log("set player manager(NFT) to tournament game", tx.receipt.transactionHash)
    tx = await tournamentContract.updatePaymentToken(wcTokenInfo.imple)
    console.log("set payment token to tournament game", tx.receipt.transactionHash)
}

module.exports = { deploy_localhost }
