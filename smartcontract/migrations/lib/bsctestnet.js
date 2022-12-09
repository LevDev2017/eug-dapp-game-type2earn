var fs = require('fs')
const BN = require('bignumber.js')

const { syncDeployInfo, deployContract, deployContractAndProxy } = require('./deploy')
const { addressZero, bytes32Zero, maxUint256,
  WBNB, PancakeRouter, PancakeFactory, PBUSD,
  PVE, PVEProxy, PVP, PVPProxy, RandomUpgradeable, RandomProxy, NumericHelper,
  NFTManagerUpgradeable, NFTManagerProxy, Tournament, TournamentProxy,
  LeaderBoard, LeaderBoardProxy, UserGradeManage, UserGradeManageProxy, Type2EarnToken } = require('./const')

const deploy_bsctestnet = async (web3, deployer, accounts, specialAccounts) => {
    let network = 'bsctestnet'
    const { owner, proxyAdmin } = specialAccounts

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
    let tokenInfo = totalRet.find(t => t.name === "Type2EarnToken")

    wbnbInfo = {
      name: "WBNB",
      imple: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    }
    totalRet = syncDeployInfo(network, "WBNB", wbnbInfo, totalRet)

    factoryInfo = {
      name: "PancakeFactory",
      imple: "0x41939fe2547f3140b90e056fb42af81d423435ad"
    }
    totalRet = syncDeployInfo(network, "PancakeFactory", factoryInfo, totalRet)

    routerInfo = {
      name: "PancakeRouter",
      imple: "0x1Ed675D5e63314B760162A3D1Cae1803DCFC87C7"
    }
    totalRet = syncDeployInfo(network, "PancakeRouter", routerInfo, totalRet)

    // pbusdInfo = await deployContract(deployer, "PBUSD", PBUSD)
    // totalRet = syncDeployInfo(network, "PBUSD", pbusdInfo, totalRet)

    // let pbusdContract = await PBUSD.at(pbusdInfo.imple)
    // let tx = await pbusdContract.approve(routerInfo.imple, maxUint256)
    // console.log('approved PBUSD for pancake router:', tx.receipt.transactionHash)

    tokenInfo = await deployContract(deployer, "Type2EarnToken", Type2EarnToken, 
            accounts,
            ['100000000000000000000000', '10000000000000000000000'],
            '100000000000000000000',
            routerInfo.imple)
    totalRet = syncDeployInfo(network, "Type2EarnToken", tokenInfo, totalRet)

    pveInfo = await deployContractAndProxy(deployer, "PVE", PVE, PVEProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "PVE", pveInfo, totalRet)

    pvpInfo = await deployContractAndProxy(deployer, "PVP", PVP, PVPProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "PVP", pvpInfo, totalRet)

    randomInfo = await deployContractAndProxy(deployer, "RandomUpgradeable", RandomUpgradeable, RandomProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "RandomUpgradeable", randomInfo, totalRet)

    let randContract = await RandomUpgradeable.at(randomInfo.proxy)
    await randContract.updateChainlink(addressZero)

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

    /**
     * Initial configuration after deploy
     */
    let tokenContract = await Type2EarnToken.at(tokenInfo.imple)
    let pveContract = await PVE.at(pveInfo.proxy)
    let pvpContract = await PVP.at(pvpInfo.proxy)
    // let randContract = await RandomUpgradeable.at(randomInfo.proxy)
    let numericContract = await NumericHelper.at(numericInfo.imple)
    let leaderBoardContract = await LeaderBoard.at(leaderBoardInfo.proxy)
    let tournamentContract = await Tournament.at(tournamentInfo.proxy)
    let nftContract = await NFTManagerUpgradeable.at(nftInfo.proxy)
    let userGradeManageContract = await UserGradeManage.at(userGradeManageInfo.proxy)

    let txTable = [
      {
        promise: tokenContract.transfer(pveContract.address, '10000000000000000000000'),
        label: "Charge 10000 token to PVE contract",
        network: "bsctestnet"
      },
      {
        promise: pveContract.updatePaymentToken(tokenContract.address),
        label: "Update token of PVE contract",
        network: "bsctestnet"
      },
      {
        promise: pveContract.updateGradeManager(userGradeManageContract.address),
        label: "Update grade manager of PVE contract",
        network: "bsctestnet"
      },
      {
        promise: pveContract.enableReferee(owner, true),
        label: "Enable owner to be a referee of PVE contract",
        network: "bsctestnet"
      },
      {
        promise: pvpContract.updatePaymentToken(tokenContract.address),
        label: "Update token of PVP contract",
        network: "bsctestnet"
      },
      {
        promise: pvpContract.updateGradeManager(userGradeManageContract.address),
        label: "Update grade manager of PVP contract",
        network: "bsctestnet"
      },
      {
        promise: userGradeManageContract.setUpgradeRole(pvpContract.address, true),
        label: "Enable PVP contract to be an upgrade role",
        network: "bsctestnet"
      },
      {
        promise: userGradeManageContract.setDowngradeRole(pvpContract.address, true),
        label: "Enable PVP contract to be a downgrade role",
        network: "bsctestnet"
      },
      {
        promise: pvpContract.enableReferee(owner, true),
        label: "Enable owner to be a referee of PVP contract",
        network: "bsctestnet"
      },
      {
        promise: tournamentContract.updatePaymentToken(tokenContract.address),
        label: "Update token of tournament contract",
        network: "bsctestnet"
      },
      {
        promise: tournamentContract.enableReferee(owner, true),
        label: "Enable owner to be a referee of tournament contract",
        network: "bsctestnet"
      },
      {
        promise: leaderBoardContract.setUpdater(tournamentContract.address, true),
        label: "Update updater of leaderboard to be a tournament contract",
        network: "bsctestnet"
      },
      {
        promise: tokenContract.transfer(tournamentContract.address, '10000000000000000000000'),
        label: "Charge 10000 token to tournament contract",
        network: "bsctestnet"
      },
    ]

    for (let txItem of txTable) {
      if (txItem.network.includes(network)) {
        console.log("****** " + txItem.label + " ******")
        try {
          let tx = await txItem.promise;
          console.log(tx.receipt.transactionHash)
        } catch(err) {
          console.log(err)
        }
      }
    }
}

module.exports = { deploy_bsctestnet }
