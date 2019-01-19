import axios from "axios";

/**
 * @returns {Array<{id: string, name: string, displayName: string, imageUrl: string, price: number, lastUpdate: Date }>}
 */
export const getTopListBy24Hours = ({limit = 10, symbol = 'USD', page = 0}) => {
  return axios
    .get(`/topListBy24Hours?limit=${limit}&symbol=${symbol}&page=${page}`)
    .then(({data }) => data.cryptos);
}

/**
 * 
 * @param {string} symbol - Symbol of the crypto currency to be searched for, such as "BTC" for BitCoin, "ETC"for Ethereum...
 * @param {number} limit - Length of the array to be searched for.
 * 
 * @returns {Array<string>} a array with the names of the top exchanges
 */
export const getTopExchanges = (crypto = "BTC", limit = 10) => {
  return axios.get(`/topExchanges?crypto=${crypto}&limit=${limit}`);
}

/**
 * 
 */
export const getCryptoInfoAndExchanges = (crypto, symbol, limit = 10) => {
  return axios.get(`/cryptoInfoAndExchanges?crypto=${crypto}&symbol=${symbol}&limit=${limit}`).then(({data}) => data)
}

/**
 * @returns {Array<wallets>}
 */
export const getAllWallets = (coinsIncludes = "", security = "") => {
  return axios.get(`/allWallets?coinsInclude=${coinsIncludes}&security=${security}`)
    .then(({data}) => data.wallets);
}

/**
 * 
 * @param {Date} start 
 * @param {string} currency 
 * @param {Date} end 
 * @param {Enumerator} interval - example: '1d' for 1 Day.
 */
export const getPricesForCharts = (start = new Date(), currency, end, interval = '1d') => {
  return axios.get(`/currenciesPricesInInterval?start=${start.toISOString()}${end ? `&end=${end.toISOString()}`: ''}&currency=${currency}&interval=${interval}`)
    .then(({ data }) => data);
}

export const getAllCoins = () => {
  return axios.get('/allCoins').then(({data}) => data.coins);
}