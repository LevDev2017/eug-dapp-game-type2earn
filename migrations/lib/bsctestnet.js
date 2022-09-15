var fs = require('fs')
const BN = require('bignumber.js')

const { syncDeployInfo, deployContract, deployContractAndProxy, manage } = require('./deploy')
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

const deploy_bsctestnet = async (web3, deployer, accounts) => {
    let network = 'bsctestnet'
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

    // wbnbInfo = await deployContract(deployer, "WBNB", WBNB);
    // totalRet = syncDeployInfo(network, "WBNB", wbnbInfo, totalRet)
    wbnbInfo = {
      name: "WBNB",
      imple: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    }
    totalRet = syncDeployInfo(network, "WBNB", wbnbInfo, totalRet)

    // factoryInfo = await deployContract(deployer, "PancakeFactory", PancakeFactory);
    // totalRet = syncDeployInfo(network, "PancakeFactory", factoryInfo, totalRet)
    factoryInfo = {
      name: "PancakeFactory",
      imple: "0x41939fe2547f3140b90e056fb42af81d423435ad"
    }
    totalRet = syncDeployInfo(network, "PancakeFactory", factoryInfo, totalRet)

    // routerInfo = await deployContract(deployer, "PancakeRouter", PancakeRouter);
    // totalRet = syncDeployInfo(network, "PancakeRouter", routerInfo, totalRet)
    routerInfo = {
      name: "PancakeRouter",
      imple: "0x1Ed675D5e63314B760162A3D1Cae1803DCFC87C7"
    }
    totalRet = syncDeployInfo(network, "PancakeRouter", routerInfo, totalRet)

    // apeFactoryInfo = await deployContract(deployer, "ApeFactory", ApeFactory);
    // totalRet = syncDeployInfo(network, "ApeFactory", apeFactoryInfo, totalRet)
    apeFactoryInfo = {
      name: "ApeFactory",
      imple: "0xC0Ad5465130F81F0ca8246ee216b7203320F6d03"
    }
    totalRet = syncDeployInfo(network, "ApeFactory", apeFactoryInfo, totalRet)

    // apeRouterInfo = await deployContract(deployer, "ApeRouter", ApeRouter);
    // totalRet = syncDeployInfo(network, "ApeRouter", apeRouterInfo, totalRet)
    apeRouterInfo = {
      name: "ApeRouter",
      imple: "0x57a330bB9430e286177370e6aFe3CA24Cce4421C"
    }
    totalRet = syncDeployInfo(network, "ApeRouter", apeRouterInfo, totalRet)

    usdtInfo = await deployContract(deployer, "USDT", USDT);
    totalRet = syncDeployInfo(network, "USDT", usdtInfo, totalRet)

    daiInfo = await deployContract(deployer, "DAI", DAI);
    totalRet = syncDeployInfo(network, "DAI", daiInfo, totalRet)

    oceansInfo = await deployContract(deployer, "OCEANS", OCEANS);
    totalRet = syncDeployInfo(network, "OCEANS", oceansInfo, totalRet)

    ocashInfo = await deployContract(deployer, "OCASH", OCASH);
    totalRet = syncDeployInfo(network, "OCASH", ocashInfo, totalRet)

    busdInfo = await deployContract(deployer, "BUSD", BUSD);
    totalRet = syncDeployInfo(network, "BUSD", busdInfo, totalRet)

    usdcInfo = await deployContract(deployer, "USDC", USDC);
    totalRet = syncDeployInfo(network, "USDC", usdcInfo, totalRet)

    btcbInfo = await deployContract(deployer, "BTCB", BTCB);
    totalRet = syncDeployInfo(network, "BTCB", btcbInfo, totalRet)

    multicallInfo = await deployContractAndProxy(deployer, "Multicall", Multicall, MulticallProxy, proxyAdmin, "initialize", [], []);
    totalRet = syncDeployInfo(network, "Multicall", multicallInfo, totalRet)

    mfiInfo = await deployContractAndProxy(deployer, "MFI", MFI, MFIProxy, proxyAdmin, "initialize", ["address"], [owner]);
    totalRet = syncDeployInfo(network, "MFI", mfiInfo, totalRet)

    let pairInfo = {
        DAI: {
            name: 'DAI/WBNB',
            left: daiInfo.imple,
            right: wbnbInfo.imple,
            rightAmount: BN(`1e16`).toFixed(0),
            rate: '25000000000'
        },
        OCEANS: {
            name: 'OCEANS/WBNB',
            left: oceansInfo.imple,
            right: wbnbInfo.imple,
            rightAmount: BN(`1e16`).toFixed(0),
            rate: '34000000000'
        },
        OCASH: {
            name: 'OCASH/WBNB',
            left: ocashInfo.imple,
            right: wbnbInfo.imple,
            rightAmount: BN(`1e16`).toFixed(0),
            rate: '25000000000'
        },
        USDT: {
            name: 'USDT/WBNB',
            left: usdtInfo.imple,
            right: wbnbInfo.imple,
            rightAmount: BN(`1e16`).toFixed(0),
            rate: '25000000000'
        },
        BUSD: {
            name: 'BUSD/WBNB',
            left: busdInfo.imple,
            right: wbnbInfo.imple,
            rightAmount: BN(`1e16`).toFixed(0),
            rate: '25000000000'
        },
        USDC: {
            name: 'USDC/WBNB',
            left: usdcInfo.imple,
            right: wbnbInfo.imple,
            rightAmount: BN(`1e16`).toFixed(0),
            rate: '25000000000'
        },
        BTCB: {
            name: 'BTCB/WBNB',
            left: btcbInfo.imple,
            right: wbnbInfo.imple,
            rightAmount: BN(`1e16`).toFixed(0),
            rate: '1181000'
        },
        MFI: {
            name: 'MFI/BUSD',
            left: mfiInfo.proxy,
            right: busdInfo.imple,
            rightAmount: BN(`1000000e18`).toFixed(0),
            rate: '0.8'
        }
    }

    let dexInfo = [
        {
            name: 'Pancakeswap',
            router: routerInfo.imple,
            factory: factoryInfo.imple
        },
        {
            name: 'Apeswap',
            router: apeRouterInfo.imple,
            factory: apeFactoryInfo.imple
        }
    ]

    for (const dex of dexInfo) {
      // LP offerings to tokens
      console.log(`Creating ${dex.name} pools...`)
      let routerContract = await PancakeRouter.at(dex.router)
      let factoryContract = await PancakeFactory.at(dex.factory)

      const pairKeys = Object.keys(pairInfo)
      let i
      for (i = 0; i < pairKeys.length; i ++) {
        let tx;

        const p = pairInfo[pairKeys[i]]
        try {
          tx = await factoryContract.createPair(p.left, p.right)
        } catch(e) {
          console.log(e.message)
        }

        if (p.left !== wbnbInfo.imple) {
          const erc20 = await DAI.at(p.left)
          tx = await erc20.approve(routerContract.address, maxUint256, {from: owner})
        }

        if (p.right !== wbnbInfo.imple) {
          const erc20 = await DAI.at(p.right)
          tx = await erc20.approve(routerContract.address, maxUint256, {from: owner})
        }

        if (p.right === wbnbInfo.imple) {
          const leftAmount = BN(p.rightAmount).times(BN(p.rate)).toFixed(0)
          tx = await routerContract.addLiquidityETH(p.left, leftAmount, 0, 0, addressZero, '0xffffffff',
                          {from: owner, value: p.rightAmount})
        } else {
          const leftAmount = BN(p.rightAmount).times(BN(p.rate)).toFixed(0)
          tx = await routerContract.addLiquidity(p.left, p.right, leftAmount, p.rightAmount, 0, 0, addressZero, '0xffffffff',
                          {from: owner})
        }
        console.log(p.name, tx.receipt.transactionHash)
      }

      if (dex.name === 'Pancakeswap') {
        let t = await factoryContract.getPair(mfiInfo.proxy, busdInfo.imple)

        mfiBusdInfo = {
          name: "MFI/BUSD",
          imple: t
        }
        totalRet = syncDeployInfo(network, "MFI/BUSD", mfiBusdInfo, totalRet)
      }

      console.log(`Finished listing tokens on ${dex.name}`)
    }

    lockedMftInfo = await deployContractAndProxy(deployer, "Presale", Presale, PresaleProxy, proxyAdmin, "initialize",
                    ["address", "uint256", "address"],
                    [mfiInfo.proxy, 19563877, lockedMfiTreasury])
    totalRet = syncDeployInfo(network, "Presale", lockedMftInfo, totalRet)

    rolesInfo = await deployContractAndProxy(deployer, "Roles", Roles, RolesProxy, proxyAdmin, "initialize", [], [])
    totalRet = syncDeployInfo(network, "Roles", rolesInfo, totalRet)

    adminInfo = await deployContractAndProxy(deployer, "Admin", Admin, AdminProxy, proxyAdmin, "initialize", ["address", "address", "address", "address"], [mfiInfo.proxy, lockedMftInfo.proxy, lockedMfiDelegate, rolesInfo.proxy])
    totalRet = syncDeployInfo(network, "Admin", adminInfo, totalRet)

    // 15k per month
    {
      mfiStakingInfo = await deployContractAndProxy(deployer, "MFIStaking", MFIStaking, MFIStakingProxy, proxyAdmin, "initialize", ["address", "uint256", "address"], [mfiInfo.proxy, MFIStakingRewardPerBlock, rolesInfo.proxy])
      totalRet = syncDeployInfo(network, "MFIStaking", mfiStakingInfo, totalRet)
    }

    let factoryContract = await PancakeFactory.at(factoryInfo.imple)
    console.log("Pancake Factory INIT_CODE_PAIR_HASH", await factoryContract.INIT_CODE_PAIR_HASH())

    let apeFactoryContract = await PancakeFactory.at(apeFactoryInfo.imple)
    console.log("Ape Factory INIT_CODE_PAIR_HASH", await apeFactoryContract.INIT_CODE_PAIR_HASH())

    spotRouterInfo = await deployContractAndProxy(deployer, "SpotRouter", SpotRouter, SpotRouterProxy, proxyAdmin, "initialize",
            ["address", "address", "address", "address", "bytes32", "bytes32", "bytes32", "uint256"],
            [wbnbInfo.imple, factoryInfo.imple, apeFactoryInfo.imple, addressZero, await factoryContract.INIT_CODE_PAIR_HASH(), await apeFactoryContract.INIT_CODE_PAIR_HASH(), bytes32Zero, 9975])
    totalRet = syncDeployInfo(network, "SpotRouter", spotRouterInfo, totalRet)

    {
      stakingInfo = await deployContractAndProxy(deployer, "Staking", Staking, StakingProxy, proxyAdmin, "initialize",
                ["address", "address", "address"], [mfiInfo.proxy, mfiInfo.proxy, mfiStakingInfo.proxy])
      totalRet = syncDeployInfo(network, "Staking", stakingInfo, totalRet)

      try {
        let stakingContract = await Staking.at(stakingInfo.proxy)
        await stakingContract.migrate(migrateAccounts)
      } catch(e) {
         console.log(e.message)
      }
    }

    fundInfo = await deployContractAndProxy(deployer, "Fund", Fund, FundProxy, proxyAdmin, "initialize", ["address", "address"], [wbnbInfo.imple, rolesInfo.proxy])
    totalRet = syncDeployInfo(network, "Fund", fundInfo, totalRet)

    lendingInfo = await deployContractAndProxy(deployer, "Lending", Lending, LendingProxy, proxyAdmin, "initialize", ["address", "address"], [mfiInfo.proxy, rolesInfo.proxy])
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

    marginRouterInfo = await deployContractAndProxy(deployer, "MarginRouter", MarginRouter, MarginRouterProxy, proxyAdmin, "initialize",
            ["address", "address", "address", "address", "bytes32", "bytes32", "bytes32", "uint256", "address", "address"],
            [wbnbInfo.imple, factoryInfo.imple, apeFactoryInfo.imple, addressZero, await factoryContract.INIT_CODE_PAIR_HASH(), await apeFactoryContract.INIT_CODE_PAIR_HASH(), bytes32Zero, 9975, owner, rolesInfo.proxy])
    totalRet = syncDeployInfo(network, "MarginRouter", marginRouterInfo, totalRet)

    {
      liquidityMiningRewardInfo = await deployContractAndProxy(deployer, "LiquidityMiningReward", LiquidityMiningReward, LiquidityMiningRewardProxy, proxyAdmin, "initialize",
            ["address", "address", "uint256", "address"], [mfiInfo.proxy, liquidityTokenInfo.imple, LiquidityMiningRewardPerBlock, rolesInfo.proxy])
      totalRet = syncDeployInfo(network, "LiquidityMiningReward", liquidityMiningRewardInfo, totalRet)
    }

    crossMarginTradingInfo = await deployContractAndProxy(deployer, "CrossMarginTrading", CrossMarginTrading, CrossMarginTradingProxy, proxyAdmin, "initialize",
              ["address", "address", "address", "address", "bytes32", "bytes32", "bytes32", "uint256", "address"],
              [usdtInfo.imple, factoryInfo.imple, apeFactoryInfo.imple, addressZero, await factoryContract.INIT_CODE_PAIR_HASH(), await apeFactoryContract.INIT_CODE_PAIR_HASH(), bytes32Zero, 9975, rolesInfo.proxy])
    totalRet = syncDeployInfo(network, "CrossMarginTrading", crossMarginTradingInfo, totalRet)

    {
      dependencyControllerInfo = await deployContractAndProxy(deployer, "DependencyController", DependencyController, DependencyControllerProxy, proxyAdmin, "initialize",
            ["address"], [rolesInfo.proxy])
      totalRet = syncDeployInfo(network, "DependencyController", dependencyControllerInfo, totalRet)

      const rolesContract = await Roles.at(rolesInfo.proxy);

      if ((await rolesContract.mainCharacters(DEPENDENCY_CONTROLLER)) != dependencyControllerInfo.proxy) {
        const givingRole = await rolesContract.setMainCharacter(DEPENDENCY_CONTROLLER, dependencyControllerInfo.proxy, {from: owner});
        console.log('Giving dependency controller role:', givingRole.receipt.transactionHash);
      }

      managedContracts = [
        {
          contract: await Admin.at(adminInfo.proxy),
          charactersPlayed: [ADMIN, FEE_CONTROLLER],
          rolesPlayed: []
        },
        {
          contract: await CrossMarginTrading.at(crossMarginTradingInfo.proxy),
          charactersPlayed: [MARGIN_TRADING, PRICE_CONTROLLER],
          rolesPlayed: [WITHDRAWER, AUTHORIZED_FUND_TRADER, BORROWER, STAKE_PENALIZER]
        },
        { contract: await Fund.at(fundInfo.proxy), charactersPlayed: [FUND], rolesPlayed: [] },
        {
          contract: await Lending.at(lendingInfo.proxy),
          charactersPlayed: [LENDING],
          rolesPlayed: [WITHDRAWER, INCENTIVE_REPORTER]
        },
        {
          contract: await MarginRouter.at(marginRouterInfo.proxy),
          charactersPlayed: [ROUTER],
          rolesPlayed: [WITHDRAWER, MARGIN_TRADER, BORROWER, INCENTIVE_REPORTER]
        }
      ];

      for (const mC of managedContracts) {
        await manage(dependencyControllerInfo.proxy, mC, owner);
      }
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
        dependencyCleanerInfo = await deployContractAndProxy(deployer, "DependencyCleaner", DependencyCleaner, DependencyCleanerProxy, proxyAdmin, "initialize", 
                    ["address[]", "uint256[]", "address"], trashContracts, trashRoles, rolesInfo.proxy)
        totalRet = syncDeployInfo(network, "DependencyCleaner", dependencyCleanerInfo, totalRet)

          // run if it hasn't self-destructed yet
          if ((await web3.eth.getCode(dependencyCleanerInfo.proxy)) !== '0x') {
              console.log(`Executing dependency cleaner ${dependencyCleanerInfo.proxy} via dependency controller ${dc.address}`);
              const tx = await dc.executeAsOwner(dependencyCleanerInfo.proxy, { from: owner });
              console.log(`ran ${dependencyCleanerInfo.proxy} as owner, tx: ${tx.receipt.transactionHash}`);
          }      
      }
    }

    tokensPerNetwork = {
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

      incentivizeLendingInfo = await deployContractAndProxy(deployer, "IncentivizeLending", IncentivizeLending, IncentivizeLendingProxy, proxyAdmin, "initialize", 
                ["address[]", "uint256[]", "uint256", "address"], [...args])
      totalRet = syncDeployInfo(network, "IncentivizeLending", incentivizeLendingInfo, totalRet)

      // run if it hasn't self-destructed yet
      if ((await web3.eth.getCode(incentivizeLendingInfo.proxy)) !== '0x') {
          console.log(`Executing lending incentive ${incentivizeLendingInfo.proxy} via dependency controller ${dc.address}`);
          const tx = await dc.executeAsOwner(incentivizeLendingInfo.proxy, { from: owner });
          console.log(`ran ${incentivizeLendingInfo.proxy} as owner, tx: ${tx.receipt.transactionHash}`);
      }
    }

    {
      const dc = await DependencyController.at(dependencyControllerInfo.proxy)

      const tokens = tokensPerNetwork;
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

      for (const args of argLists) {
        // console.log('args', args)
        tokenActivationInfo = await deployContractAndProxy(deployer, "TokenActivation", TokenActivation, TokenActivationProxy, proxyAdmin, "initialize", 
                            ["address", "address[]", "uint256[]", "bytes32[]", "address[][]"], [...args])
        totalRet = syncDeployInfo(network, "TokenActivation", tokenActivationInfo, totalRet)
   
        // run if it hasn't self-destructed yet
        if ((await web3.eth.getCode(tokenActivationInfo.proxy)) !== '0x') {
          console.log(`Executing token activation ${tokenActivationInfo.proxy} via dependency controller ${dc.address}`);
          const tx = await dc.executeAsOwner(tokenActivationInfo.proxy, { from: owner });
          console.log(`ran ${tokenActivationInfo.proxy} as owner, tx: `, tx.receipt.transactionHash);
        }
      }
    }
}

module.exports = { deploy_bsctestnet }
