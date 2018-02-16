export function config() {return {
    app: {
        name_full: 'MC Wallet',
        name_1: 'MC ',
        name_2: 'Wallet',
        default_lang: 'EN'
    },
    dev: {
        mode: 1
    },
    currencies: [
        {
            symbol: 'BTC',
            networks: ['testnet', 'livenet'],
            img: './assets/images/bitcoin.png'
        },
        {
            symbol: 'ETH',
            networks: ['ropsten', 'livenet'],
            img: './assets/images/bitcoin.png'
        },
        {
            symbol: 'BCH',
            networks: ['testnet', 'livenet'],
            img: './assets/images/bitcoin.png'
        },
        {
            symbol: 'LTC',
            networks: ['testnet', 'livenet'],
            img: './assets/images/bitcoin.png'
        },
        {
            symbol: 'BTG',
            networks: ['testnet', 'livenet'],
            img: './assets/images/bitcoin.png'
        },
        {
            symbol: 'ETH',
            networks: ['ropsten', 'livenet'],
            img: './assets/images/bitcoin.png'
        }
    ]
};
}
