export function config () { return {
    app: {
        name_full: 'MC Wallet',
        name_1: 'MC ',
        name_2: 'Wallet'
    },
    dev: {
        mode: 1
    },
    currencies: [
        {
            symbol: 'ETH',
            networks: ['ropsten', 'livenet']
        },
        {
            symbol: 'BTC',
            networks: ['testnet', 'livenet']
        },
        {
            symbol: 'LTC',
            networks: ['testnet', 'livenet']
        },
        {
            symbol: 'BTG',
            networks: ['testnet', 'livenet']
        },
        {
            symbol: 'BCH',
            networks: ['testnet', 'livenet']
        }
    ]
}; }
