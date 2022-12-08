// --------------------- bsc testnet -----------------------

// export const NODE_MANAGER_ADDRESS = '0x62b6D3BF29c29dB250De2FF1F1F642a13dA10004'
// export const TOKEN_ADDRESS = '0x87f86ceC59C69b8a5E7c13b6c86871b257C13968'
// export const PRICE_STABILIZER_ADDRESS = '0xFE037fFA42Fe050029648685fa340c02786Cf163'
// export const VTOKEN_ADDRESS = '0xE37ECC2f30d03475a29cb21ee7FD50Bd218470dA'
// export const PRESALE_ADDRESS = '0xa3997F415FD955D091CA00EB59b56207af422368'

// export const ROUTER_ADDRESS = '0x1Ed675D5e63314B760162A3D1Cae1803DCFC87C7'
// export const BUSD_ADDRESS = '0xF7F728a59820943fD9Bd37848377e184F9cFBDbc'

// export const REWARD_POOL_ADDRESS = '0xaa06eEC241B7d805ab4e0C796915c2920d9f2F7A'
// export const FEE_DISTRIBUTOR_ADDRESS = '0x7Ee53bAD7767CDB3eA2F6077B492C3EEBE3BE74c'

// -------------------------- bsc mainnet --------------------------------
const ContractAddresses = {
    1: {
        token: '0xDd466DC98E0a008fADCE6EEE3f362e180214946F',
        presale: '0x10f6d4846058bF65c6af643a2C1cA4bD27e506CC',
        coin: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC
    },
    56: {
        token: '0x540b490DF54F1275fB5ab1B0013b83e3DDb4f320',
        presale: '0xDd466DC98E0a008fADCE6EEE3f362e180214946F',
        coin: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' // BUSD
    }
}

export default ContractAddresses
