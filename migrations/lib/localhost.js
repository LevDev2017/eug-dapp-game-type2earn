var fs = require('fs')
const BN = require('bignumber.js')

const { syncDeployInfo, deployContract, deployContractAndProxy } = require('./deploy')
const { addressZero, bytes32Zero, maxUint256,
  WBNB, PancakeRouter, PancakeFactory, PBUSD,
  PVE, PVEProxy, PVP, PVPProxy, RandomUpgradeable, RandomProxy, NumericHelper,
  NFTManagerUpgradeable, NFTManagerProxy, Tournament, TournamentProxy,
  LeaderBoard, LeaderBoardProxy, UserGradeManage, UserGradeManageProxy } = require('./const')

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

    let pveInfo = totalRet.find(t => t.name === "PVE")
    let pvpInfo = totalRet.find(t => t.name === "PVP")
    let tournamentInfo = totalRet.find(t => t.name === "Tournament")
    let leaderBoardInfo = totalRet.find(t => t.name === "LeaderBoard")
    let userGradeManageInfo = totalRet.find(t => t.name === "UserGradeManage")

    let randomInfo = totalRet.find(t => t.name === "RandomUpgradeable")
    let numericInfo = totalRet.find(t => t.name === "NumericHelper")
    let nftInfo = totalRet.find(t => t.name === "NFTManagerUpgradeable")

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

    pveInfo = await deployContractAndProxy(deployer, "PVE", PVE, PVEProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "PVE", pveInfo, totalRet)

    pvpInfo = await deployContractAndProxy(deployer, "PVP", PVP, PVPProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "PVP", pvpInfo, totalRet)

    randomInfo = await deployContractAndProxy(deployer, "RandomUpgradeable", RandomUpgradeable, RandomProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "RandomUpgradeable", randomInfo, totalRet)

    let rand = await RandomUpgradeable.at(randomInfo.proxy)
    tx = await rand.setRouter(routerInfo.imple)
    console.log("set router for random generator:", tx.receipt.transactionHash)
    tx = await rand.setPair(await routerContract.WETH(), pbusdInfo.imple)
    console.log("set pair for random generator:", tx.receipt.transactionHash)

    numericInfo = await deployContract(deployer, "NumericHelper", NumericHelper, randomInfo.proxy);
    totalRet = syncDeployInfo(network, "NumericHelper", numericInfo, totalRet)

    leaderBoardInfo = await deployContractAndProxy(deployer, "LeaderBoard", LeaderBoard, LeaderBoardProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "LeaderBoard", leaderBoardInfo, totalRet)

    tournamentInfo = await deployContractAndProxy(deployer, "Tournament", Tournament, TournamentProxy, proxyAdmin, "initialize", ["address", "address"], [numericInfo.imple, leaderBoardInfo.proxy]);
    totalRet = syncDeployInfo(network, "Tournament", tournamentInfo, totalRet)

    nftInfo = await deployContractAndProxy(deployer, "NFTManagerUpgradeable", NFTManagerUpgradeable, NFTManagerProxy, proxyAdmin, "initialize", ["address"], [numericInfo.imple]);
    totalRet = syncDeployInfo(network, "NFTManagerUpgradeable", nftInfo, totalRet)

    userGradeManageInfo = await deployContractAndProxy(deployer, "UserGradeManage", UserGradeManage, UserGradeManageProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "UserGradeManage", userGradeManageInfo, totalRet)
}

module.exports = { deploy_localhost }
