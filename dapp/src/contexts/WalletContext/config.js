const walletConfig =
{
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
    },
    56: {
        chainId: '0x38',
        networkName: 'Binance Smart Chain',
        mainnet: true,
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        // rpcUrls: ['https://speedy-nodes-nyc.moralis.io/129fb60c557f500721cfea1f/bsc/mainnet'],
        blockUrls: ['https://bscscan.com/'],
    }
}

export default walletConfig
