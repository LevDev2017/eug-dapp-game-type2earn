const { setWeb3 } = require('./lib/deploy')
const { deploy_localhost } = require('./lib/localhost')
const { deploy_bsctestnet } = require('./lib/bsctestnet')

module.exports = function (deployer, network, accounts) {

  let owner = accounts[0]
  let admin = '0xc2c5abE63bb45101f6aE48bd46404D998aFA51aD'
  let pancakeFeeSetter = accounts[2]

  deployer.then(async () => {
    setWeb3(web3)
    
    if (network === 'development') {
      await deploy_localhost(web3, deployer, accounts, {
        owner: owner,
        proxyAdmin: admin,
        pancakeFeeSetter: pancakeFeeSetter
      })
    } else if (network === 'bsctestnet') {
      await deploy_bsctestnet(web3, deployer, [accounts[0], '0x21b3b2B236aF0F6Ba274B810276cB9cD566044eB'], {
        owner: owner,
        proxyAdmin: admin
      })
    }
  })
};
