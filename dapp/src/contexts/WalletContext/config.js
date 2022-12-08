const walletConfig =
{
    97: {
        chainId: '0x61',
        networkName: 'Binance Smart Chain Testnet',
        mainnet: false,
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockUrls: ['https://testnet.bscscan.com/'],
    },
    1: {
        chainId: '0x1',
        networkName: 'Ethereum Mainnet',
        mainnet: true,
        network: "mainnet",
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://mainnet.infura.io/v3/7535811d19b1410e98c261fbb638651a'],
        blockUrls: ['https://etherscan.io/'],
    }
}

export default walletConfig
