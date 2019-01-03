import axios from "axios";
import {
  MIN_API_URL,
  TOP_LIST_24H,
  TOP_EXCHANGES,
  GENERAL_WALLETS,
  CRYPTOCOMPARE_WEBSITE
} from '../constants';


/**
 * @returns {Array<{id: string, name: string, displayName: string, imageUrl: string, price: number, lastUpdate: Date }>}
 */
export const getTopListBy24Hours = ({limit = 10, symbol = 'USD', page = 0}) => {
  return axios.get(`${MIN_API_URL}/${TOP_LIST_24H}?limit=${limit}&tsym=${symbol}&page=${page}`).then(({
    data: info
  }) => {
    return info.Data.map(({
      CoinInfo,
      RAW: { USD: { LASTUPDATE } },
      DISPLAY: { USD: { PRICE } }
    }) => ({
      id: CoinInfo.Id,
      name: CoinInfo.Name,
      displayName: CoinInfo.FullName,
      imageUrl: `${CRYPTOCOMPARE_WEBSITE}/${CoinInfo.ImageUrl}`,
      price: PRICE,
      lastUpdate: new Date(LASTUPDATE)
    }))
  });
}

/**
 * 
 * @param {string} symbol - Symbol of the crypto currency to be searched for, such as "BTC" for BitCoin, "ETC"for Ethereum...
 * @param {number} limit - Length of the array to be searched for.
 * 
 * @returns {Array<string>} a array with the names of the top exchanges
 */
export const getTopExchanges = (symbol = "BTC", limit = 10) => {
  return axios.get(`${MIN_API_URL}${TOP_EXCHANGES}?fsym=${symbol}&tsym=USD&limit=${limit}`)
    .then(({data: { Data: { Exchanges }}}) => Exchanges);
}


/**
 * 
 */
export const getCryptoInfoAndExchanges = (crypto, symbol, limit = 10) => {
  return axios.get(`${MIN_API_URL}${TOP_EXCHANGES}/full?fsym=${crypto}&tsym=${symbol}&limit=${limit}`)
    .then(({data: { Data }}) => Data);
}


/**
 * @returns {Array<wallets>}
 */
export const getAllWallets = () => {
  return axios.get(`${MIN_API_URL}${GENERAL_WALLETS}`)
    .then(({data: { Data }}) => Data)
    .then(wallets => wallets.map(wallet => {
      return {
        id: wallet.Id,
        name: wallet.Name,
        anonymity: wallet.Anonymity,
        secuiry: wallet.Security,
        logoUrl: `${CRYPTOCOMPARE_WEBSITE}${wallet.LogoUrl}`,
        coins: wallet.Coins,
        platforms: wallet.Platforms,
        sourceCodeUrl: wallet.SourceCodeUrl,
        url: wallet.AffiliateURL
      }
    }))
}
