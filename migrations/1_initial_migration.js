const { setWeb3 } = require('./lib/deploy')
const { deploy_localhost } = require('./lib/localhost')

module.exports = function (deployer, network, accounts) {

  let owner = accounts[0]
  let admin = '0xF5d4A60Cf4D64cc75944E3b07fdB1286c0B3a969'
  let pancakeFeeSetter = accounts[2]

  deployer.then(async () => {
    setWeb3(web3)
    
    if (network === 'development') {
      await deploy_localhost(web3, deployer, accounts, {
        owner: owner,
        proxyAdmin: admin,
        pancakeFeeSetter: pancakeFeeSetter
      })
    }
  })
};
