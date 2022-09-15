var fs = require('fs')
const BN = require('bignumber.js')

const { syncDeployInfo, getProxyParam, manage } = require('./deploy')
const { addressZero, bytes32Zero, maxUint256, weightsPerNetwork, totalPerNetwork, tokenParams, DISTRIBUTION_MONTHS,
    WBNB, PancakeRouter, PancakeFactory, USDT, DAI, OCEANS,
    OCASH, USDC, BUSD, BTCB, Multicall, MulticallProxy,
    MFI, MFIProxy, Presale, PresaleProxy, Roles, RolesProxy, Admin,
    AdminProxy, MFIStaking, MFIStakingProxy, SpotRouter, SpotRouterProxy,
    Staking, StakingProxy, Fund, FundProxy, Lending, LendingProxy, MarginRouter,
    MarginRouterProxy, LiquidityMiningReward, LiquidityMiningRewardProxy, 
    CrossMarginTrading, CrossMarginTradingProxy, DependencyController, 
    DependencyControllerProxy, DependencyCleaner, DependencyCleanerProxy,
    IncentivizeLending, IncentivizeLendingProxy, TokenActivation,
    TokenActivationProxy, migrateAccounts, MFIStakingRewardPerBlock, LiquidityMiningRewardPerBlock,
    DEPENDENCY_CONTROLLER,
    ADMIN, FEE_CONTROLLER, WITHDRAWER, AUTHORIZED_FUND_TRADER, BORROWER,
    STAKE_PENALIZER, INCENTIVE_REPORTER, MARGIN_TRADER,
    MARGIN_TRADING, PRICE_CONTROLLER, FUND, LENDING, ROUTER } = require('./const')

const deploy_bscmainnet = async (web3, deployer, accounts) => {
    let network = 'bscmainnet'
    const { owner, proxyAdmin, lockedMfiTreasury, pancakeFeeSetter } = accounts
    const lockedMfiDelegate = owner

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
    let apeFactoryInfo = totalRet.find(t => t.name === "ApeFactory")
    let apeRouterInfo = totalRet.find(t => t.name === "ApeRouter")
    let usdtInfo = totalRet.find(t => t.name === "USDT")
    let daiInfo = totalRet.find(t => t.name === "DAI")
    let oceansInfo = totalRet.find(t => t.name === "OCEANS")
    let ocashInfo = totalRet.find(t => t.name === "OCASH")
    let busdInfo = totalRet.find(t => t.name === "BUSD")
    let usdcInfo = totalRet.find(t => t.name === "USDC")
    let btcbInfo = totalRet.find(t => t.name === "BTCB")
    let mfiBusdInfo = totalRet.find(t => t.name === "MFI/BUSD")

    let multicallInfo = totalRet.find(t => t.name === "Multicall")

    let mfiInfo = totalRet.find(t => t.name === "MFI")
    let lockedMftInfo = totalRet.find(t => t.name === "Presale")

    let rolesInfo = totalRet.find(t => t.name === "Roles")
    let adminInfo = totalRet.find(t => t.name === "Admin")
    let mfiStakingInfo = totalRet.find(t => t.name === "MFIStaking")
    let spotRouterInfo = totalRet.find(t => t.name === "SpotRouter")
    let stakingInfo = totalRet.find(t => t.name === "Staking")
    let fundInfo = totalRet.find(t => t.name === "Fund")
    let lendingInfo = totalRet.find(t => t.name === "Lending")
    let marginRouterInfo = totalRet.find(t => t.name === "MarginRouter")
    let liquidityTokenInfo = totalRet.find(t => t.name === "LiquidityToken")
    let liquidityMiningRewardInfo = totalRet.find(t => t.name === "LiquidityMiningReward")
    let crossMarginTradingInfo = totalRet.find(t => t.name === "CrossMarginTrading")
    let dependencyControllerInfo = totalRet.find(t => t.name === "DependencyController")
    let dependencyCleanerInfo = totalRet.find(t => t.name === "DependencyCleaner")
    let incentivizeLendingInfo = totalRet.find(t => t.name === "IncentivizeLending")
    let tokenActivationInfo = totalRet.find(t => t.name === "TokenActivation")

    wbnbInfo = {
      name: "WBNB",
      imple: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    }
    totalRet = syncDeployInfo(network, "WBNB", wbnbInfo, totalRet)

    factoryInfo = {
      name: "PancakeFactory",
      imple: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
    }
    totalRet = syncDeployInfo(network, "PancakeFactory", factoryInfo, totalRet)

    // routerInfo = await deployContract(deployer, "PancakeRouter", PancakeRouter);
    // totalRet = syncDeployInfo(network, "PancakeRouter", routerInfo, totalRet)
    routerInfo = {
      name: "PancakeRouter",
      imple: "0x10ED43C718714eb63d5aA57B78B54704E256024E"
    }
    totalRet = syncDeployInfo(network, "PancakeRouter", routerInfo, totalRet)

    // apeFactoryInfo = await deployContract(deployer, "ApeFactory", ApeFactory);
    // totalRet = syncDeployInfo(network, "ApeFactory", apeFactoryInfo, totalRet)
    apeFactoryInfo = {
      name: "ApeFactory",
      imple: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6"
    }
    totalRet = syncDeployInfo(network, "ApeFactory", apeFactoryInfo, totalRet)

    // apeRouterInfo = await deployContract(deployer, "ApeRouter", ApeRouter);
    // totalRet = syncDeployInfo(network, "ApeRouter", apeRouterInfo, totalRet)
    apeRouterInfo = {
      name: "ApeRouter",
      imple: "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7"
    }
    totalRet = syncDeployInfo(network, "ApeRouter", apeRouterInfo, totalRet)

    usdtInfo = {
      name: "USDT",
      imple: "0x55d398326f99059fF775485246999027B3197955"
    }
    totalRet = syncDeployInfo(network, "USDT", usdtInfo, totalRet)

    daiInfo = {
      name: "DAI",
      imple: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
    }
    totalRet = syncDeployInfo(network, "DAI", daiInfo, totalRet)

    oceansInfo = {
      name: "OCEANS",
      imple: "0xD55d69dc69969673458124913B86F7b7e7e98055"
    }
    totalRet = syncDeployInfo(network, "OCEANS", oceansInfo, totalRet)

    ocashInfo = {
      name: "OCASH",
      imple: "0x0491118884BB7Dc7b1e5dC1DE4E8e491Fd47032b"
    }
    totalRet = syncDeployInfo(network, "OCASH", ocashInfo, totalRet)

    busdInfo = {
      name: "BUSD",
      imple: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    }
    totalRet = syncDeployInfo(network, "BUSD", busdInfo, totalRet)

    usdcInfo = {
      name: "USDC",
      imple: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    }
    totalRet = syncDeployInfo(network, "USDC", usdcInfo, totalRet)

    btcbInfo = {
      name: "BTCB",
      imple: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    }
    totalRet = syncDeployInfo(network, "BTCB", btcbInfo, totalRet)

    multicallInfo = {...multicallInfo, ...await getProxyParam("Multicall", "initialize", [], [])}
    totalRet = syncDeployInfo(network, "Multicall", multicallInfo, totalRet)

    mfiInfo = {...mfiInfo, ...await getProxyParam("MFI", "initialize", ["address"], [owner])};
    totalRet = syncDeployInfo(network, "MFI", mfiInfo, totalRet)

    // create pair on pancakeswap/apeswap

    lockedMftInfo = {...lockedMftInfo, ...await getProxyParam("Presale", "initialize",
                    ["address", "uint256", "address"],
                    [mfiInfo.proxy, 19953100, lockedMfiTreasury])}
    totalRet = syncDeployInfo(network, "Presale", lockedMftInfo, totalRet)

    rolesInfo = {...rolesInfo, ...await getProxyParam("Roles", "initialize", [], [])}
    totalRet = syncDeployInfo(network, "Roles", rolesInfo, totalRet)

    adminInfo = {...adminInfo, ...await getProxyParam("Admin", "initialize", ["address", "address", "address", "address"], [mfiInfo.proxy, lockedMftInfo.proxy, lockedMfiDelegate, rolesInfo.proxy])}
    totalRet = syncDeployInfo(network, "Admin", adminInfo, totalRet)

    // 15k per month
    {
      mfiStakingInfo = {...mfiStakingInfo, ...await getProxyParam("MFIStaking", "initialize", ["address", "uint256", "address"], [mfiInfo.proxy, MFIStakingRewardPerBlock, rolesInfo.proxy])}
      totalRet = syncDeployInfo(network, "MFIStaking", mfiStakingInfo, totalRet)
    }

    let factoryContract = await PancakeFactory.at(factoryInfo.imple)
    console.log("Pancake Factory INIT_CODE_PAIR_HASH", await factoryContract.INIT_CODE_PAIR_HASH())

    let apeFactoryContract = await PancakeFactory.at(apeFactoryInfo.imple)
    console.log("Ape Factory INIT_CODE_PAIR_HASH", await apeFactoryContract.INIT_CODE_PAIR_HASH())

    spotRouterInfo = {...spotRouterInfo, ...await getProxyParam("SpotRouter", "initialize",
            ["address", "address", "address", "address", "bytes32", "bytes32", "bytes32", "uint256"],
            [wbnbInfo.imple, factoryInfo.imple, apeFactoryInfo.imple, addressZero, await factoryContract.INIT_CODE_PAIR_HASH(), await apeFactoryContract.INIT_CODE_PAIR_HASH(), bytes32Zero, 9975])}
    totalRet = syncDeployInfo(network, "SpotRouter", spotRouterInfo, totalRet)

    {
      stakingInfo = {...stakingInfo, ...await getProxyParam("Staking", "initialize",
                ["address", "address", "address"], [mfiInfo.proxy, mfiInfo.proxy, mfiStakingInfo.proxy])}
      totalRet = syncDeployInfo(network, "Staking", stakingInfo, totalRet)

      /// migrate accounts
    }

    fundInfo = {...fundInfo, ...await getProxyParam("Fund", "initialize", ["address", "address"], [wbnbInfo.imple, rolesInfo.proxy])}
    totalRet = syncDeployInfo(network, "Fund", fundInfo, totalRet)

    lendingInfo = {...lendingInfo, ...await getProxyParam("Lending", "initialize", ["address", "address"], [mfiInfo.proxy, rolesInfo.proxy])}
    totalRet = syncDeployInfo(network, "Lending", lendingInfo, totalRet)

    try {
      let pairAddress = await factoryContract.getPair(mfiInfo.proxy, busdInfo.imple)

      liquidityTokenInfo = {
        name: "LiquidityToken",
        imple: pairAddress
      }
      totalRet = syncDeployInfo(network, "LiquidityToken", liquidityTokenInfo, totalRet)
    } catch (err) {
      console.log(err.message)
    }

    marginRouterInfo = {...marginRouterInfo, ...await getProxyParam("MarginRouter", "initialize",
            ["address", "address", "address", "address", "bytes32", "bytes32", "bytes32", "uint256", "address", "address"],
            [wbnbInfo.imple, factoryInfo.imple, apeFactoryInfo.imple, addressZero, await factoryContract.INIT_CODE_PAIR_HASH(), await apeFactoryContract.INIT_CODE_PAIR_HASH(), bytes32Zero, 9975, owner, rolesInfo.proxy])}
    totalRet = syncDeployInfo(network, "MarginRouter", marginRouterInfo, totalRet)

    {
      liquidityMiningRewardInfo = {...liquidityMiningRewardInfo, ...await getProxyParam("LiquidityMiningReward", "initialize",
            ["address", "address", "uint256", "address"], [mfiInfo.proxy, liquidityTokenInfo.imple, LiquidityMiningRewardPerBlock, rolesInfo.proxy])}
      totalRet = syncDeployInfo(network, "LiquidityMiningReward", liquidityMiningRewardInfo, totalRet)
    }

    crossMarginTradingInfo = {...crossMarginTradingInfo, ...await getProxyParam("CrossMarginTrading", "initialize",
              ["address", "address", "address", "address", "bytes32", "bytes32", "bytes32", "uint256", "address"],
              [usdtInfo.imple, factoryInfo.imple, apeFactoryInfo.imple, addressZero, await factoryContract.INIT_CODE_PAIR_HASH(), await apeFactoryContract.INIT_CODE_PAIR_HASH(), bytes32Zero, 9975, rolesInfo.proxy])}
    totalRet = syncDeployInfo(network, "CrossMarginTrading", crossMarginTradingInfo, totalRet)

    {
      dependencyControllerInfo = {...dependencyControllerInfo, ...await getProxyParam("DependencyController", "initialize",
            ["address"], [rolesInfo.proxy])}
      totalRet = syncDeployInfo(network, "DependencyController", dependencyControllerInfo, totalRet)

      // const rolesContract = await Roles.at(rolesInfo.proxy);

      // if ((await rolesContract.mainCharacters(DEPENDENCY_CONTROLLER)) != dependencyControllerInfo.proxy) {
      //   const givingRole = await rolesContract.setMainCharacter(DEPENDENCY_CONTROLLER, dependencyControllerInfo.proxy, {from: owner});
      //   console.log('Giving dependency controller role:', givingRole.receipt.transactionHash);
      // }

      // let managedContracts = [
      //   {
      //     contract: await Admin.at(adminInfo.proxy),
      //     charactersPlayed: [ADMIN, FEE_CONTROLLER],
      //     rolesPlayed: []
      //   },
      //   {
      //     contract: await CrossMarginTrading.at(crossMarginTradingInfo.proxy),
      //     charactersPlayed: [MARGIN_TRADING, PRICE_CONTROLLER],
      //     rolesPlayed: [WITHDRAWER, AUTHORIZED_FUND_TRADER, BORROWER, STAKE_PENALIZER]
      //   },
      //   { contract: await Fund.at(fundInfo.proxy), charactersPlayed: [FUND], rolesPlayed: [] },
      //   {
      //     contract: await Lending.at(lendingInfo.proxy),
      //     charactersPlayed: [LENDING],
      //     rolesPlayed: [WITHDRAWER, INCENTIVE_REPORTER]
      //   },
      //   {
      //     contract: await MarginRouter.at(marginRouterInfo.proxy),
      //     charactersPlayed: [ROUTER],
      //     rolesPlayed: [WITHDRAWER, MARGIN_TRADER, BORROWER, INCENTIVE_REPORTER]
      //   }
      // ];

      // for (const mC of managedContracts) {
      //   await manage(dependencyControllerInfo.proxy, mC, owner);
      // }
    }

    {
      const dc = await DependencyController.at(dependencyControllerInfo.proxy)
      let managedContracts = [];

      const currentAddresses = totalRet.map(t => t.proxy? t.proxy: t.imple)
    
      for (let i = 0; 1000 > i; i++) {
          try {
              managedContracts.push(await dc.managedContracts(i));
          } catch(e) {
              break;
          }
      }

      console.log(managedContracts)
      console.log(currentAddresses)

      const knownRoles = []
      for (let i = 0; 1000 > i; i++) {
          try {
              knownRoles.push((await dc.allRoles(i)).toString())
          } catch(e) {
              break;
          }
      }
      console.log(knownRoles)

      const excessContracts = managedContracts.filter((addr) => !currentAddresses.includes(addr));
      console.log('excess contracts:');
      console.log(excessContracts);

      let trashContracts = [];
      let trashRoles = [];

      let roles = await Roles.at(rolesInfo.proxy)

      for (let contract of excessContracts) {
          for (let kr of knownRoles) {
              if (await roles.getRole(kr, contract)) {
                  trashContracts.push(contract);
                  trashRoles.push(kr);
              }
          }
      }

      console.log('DependencyCleaner args:');
      console.log(trashContracts);
      console.log(trashRoles);

      if (trashContracts.length > 0) {
        dependencyCleanerInfo = {...dependencyCleanerInfo, ...await getProxyParam("DependencyCleaner", "initialize", 
                    ["address[]", "uint256[]", "address"], trashContracts, trashRoles, rolesInfo.proxy)}
        totalRet = syncDeployInfo(network, "DependencyCleaner", dependencyCleanerInfo, totalRet)

          // // run if it hasn't self-destructed yet
          // if ((await web3.eth.getCode(dependencyCleanerInfo.proxy)) !== '0x') {
          //     console.log(`Executing dependency cleaner ${dependencyCleanerInfo.proxy} via dependency controller ${dc.address}`);
          //     const tx = await dc.executeAsOwner(dependencyCleanerInfo.proxy, { from: owner });
          //     console.log(`ran ${dependencyCleanerInfo.proxy} as owner, tx: ${tx.receipt.transactionHash}`);
          // }
      }
    }

    let tokensPerNetwork = {
      DAI: daiInfo.imple,
      WBNB: wbnbInfo.imple,
      OCEANS: oceansInfo.imple,
      OCASH: ocashInfo.imple,
      USDT: usdtInfo.imple,
      BUSD: busdInfo.imple,
      USDC: usdcInfo.imple,
      BTCB: btcbInfo.imple
    };

    {
      const dc = await DependencyController.at(dependencyControllerInfo.proxy)

      const weights = weightsPerNetwork;
      const total = totalPerNetwork;

      const tokens = Object.keys(weights).map((k) => tokensPerNetwork[k]);
      const totalWeights = Object.values(weights).reduce((a, b) => a + b);
      const amounts = Object.keys(weights).map((k) => total.times(weights[k]).div(totalWeights).toFixed(0));
      const endTimestamp = Math.floor(Date.now() / 1000) + (DISTRIBUTION_MONTHS * 30 * 24 * 60 * 60)

      const keys = Object.keys(weights);
      for (let i = 0; amounts.length > i; i++) {
          console.log(`${keys[i]}: ${BN(amounts[i]).div(BN('1e18')).toString()}`);
      }

      console.log("Incentivize lending args:")
      const args = [tokens, amounts, endTimestamp, rolesInfo.proxy];
      console.log(args);

      incentivizeLendingInfo = {...incentivizeLendingInfo, ...await getProxyParam("IncentivizeLending", "initialize", 
                ["address[]", "uint256[]", "uint256", "address"], [...args])}
      totalRet = syncDeployInfo(network, "IncentivizeLending", incentivizeLendingInfo, totalRet)

      // // run if it hasn't self-destructed yet
      // if ((await web3.eth.getCode(incentivizeLendingInfo.proxy)) !== '0x') {
      //     console.log(`Executing lending incentive ${incentivizeLendingInfo.proxy} via dependency controller ${dc.address}`);
      //     const tx = await dc.executeAsOwner(incentivizeLendingInfo.proxy, { from: owner });
      //     console.log(`ran ${incentivizeLendingInfo.proxy} as owner, tx: ${tx.receipt.transactionHash}`);
      // }
    }

    {
      const dc = await DependencyController.at(dependencyControllerInfo.proxy)

      let tokens = tokensPerNetwork;
      delete tokens["OCASH"]
      const tokenNames = Object.keys(tokens);
      const tokenAddresses = Object.values(tokens);

      const prepArgs = async (
        tokenNames,
        tokenAddresses,
        tokens,
        peg,
        baseCurrencyName
      ) => {
        const exposureCaps = tokenNames.map(name => {
          return BN(tokenParams[name].exposureCap).times(BN(`1e${tokenParams[name].decimals}`)).toFixed(0);
        });
      
        const liquidationTokens = tokenNames.map(name => {
          const tokenPath = tokenParams[name].liquidationTokenPath;
          return tokenPath
            ? [...tokenPath.map(tName => (tName == 'BASE' ? tokens[baseCurrencyName] : tokens[tName])), peg]
            : [tokens[name], tokens[baseCurrencyName], peg];
        });
      
        const liquidationAmms = tokenNames.map(name =>
          bytes32Zero
        );
      
        const args = [
          rolesInfo.proxy,
          tokenAddresses,
          exposureCaps,
          liquidationAmms,
          liquidationTokens
        ];
        return args;
      }

      let argLists = [await prepArgs(tokenNames.slice(0, 5), tokenAddresses.slice(0, 5), tokens, usdtInfo.imple, 'WBNB')]
    
      if (tokenNames.length > 5) {
        argLists.push(
          await prepArgs(tokenNames.slice(5, 8), tokenAddresses.slice(5, 8), tokens, usdtInfo.imple, 'WBNB')
        );
        if (tokenNames.length > 8) {
          argLists.push(
            await prepArgs(tokenNames.slice(8), tokenAddresses.slice(8), tokens, usdtInfo.imple, 'WBNB')
          );
        }
      }

      let i = 1;
      for (const args of argLists) {
        // console.log('args', args)
        tokenActivationInfo = {...tokenActivationInfo, ...await getProxyParam(`TokenActivation${i}`, "initialize", 
                            ["address", "address[]", "uint256[]", "bytes32[]", "address[][]"], [...args])}
        totalRet = syncDeployInfo(network, `TokenActivation${i}`, tokenActivationInfo, totalRet)
        i ++;
   
        // // run if it hasn't self-destructed yet
        // if ((await web3.eth.getCode(tokenActivationInfo.proxy)) !== '0x') {
        //   console.log(`Executing token activation ${tokenActivationInfo.proxy} via dependency controller ${dc.address}`);
        //   const tx = await dc.executeAsOwner(tokenActivationInfo.proxy, { from: owner });
        //   console.log(`ran ${tokenActivationInfo.proxy} as owner, tx: `, tx.receipt.transactionHash);
        // }
      }
    }
}

module.exports = { deploy_bscmainnet }
