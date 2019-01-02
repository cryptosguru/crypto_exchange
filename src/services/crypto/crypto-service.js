import axios from "axios";
import {
  MIN_API_URL,
  TOP_LIST_24H,
  IMAGE_URL
} from '../constants';


/**
 * @returns {Array<{id: string, name: string, displayName: string, imageUrl: string, price: number, lastUpdate: Date }>}
 */
export const getTopListBy24Hours = () => {
  return axios.get(`${MIN_API_URL}/${TOP_LIST_24H}`).then(({
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
      imageUrl: `${IMAGE_URL}/${CoinInfo.ImageUrl}`,
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
  return axios.get(`https://min-api.cryptocompare.com/data/top/exchanges?fsym=${symbol}&tsym=USD&limit=${limit}`)
    .then(({exchange}) => exchange);

}