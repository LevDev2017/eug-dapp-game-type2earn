const { setWeb3 } = require('./lib/deploy')
const { deploy_localhost } = require('./lib/localhost')
const  { deploy_bsctestnet } = require('./lib/bsctestnet')
const  { deploy_bscmainnet } = require('./lib/bscmainnet')

module.exports = function (deployer, network, accounts) {

  let owner = accounts[0]
  let admin = '0xF5d4A60Cf4D64cc75944E3b07fdB1286c0B3a969'
  let pancakeFeeSetter = accounts[2]

  if (network !== 'development') {
    owner = '0x380716dC77DAD0FbAC7E3488D4772111Fb974Ab0'
    admin = '0xF5d4A60Cf4D64cc75944E3b07fdB1286c0B3a969'
    pancakeFeeSetter = '0x991b186C3F860e571E3b74b80FbBB4B97cC59F2e'
  }

  deployer.then(async () => {
    setWeb3(web3)
    
    if (network === 'development') {
      await deploy_localhost(web3, deployer, accounts, {
        owner: owner,
        proxyAdmin: admin,
        pancakeFeeSetter: pancakeFeeSetter
      })
    } else if (network === 'bsctestnet') {
      await deploy_bsctestnet(web3, deployer, {
        owner: owner,
        proxyAdmin: admin
      })
    } else if (network === 'bscmainnet') {
      await deploy_bscmainnet(web3, deployer, {
        owner: owner,
        proxyAdmin: admin
      })
    }
  })
};
