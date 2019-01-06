import axios from "axios";
import { MIN_API_URL, TOP_EXCHANGES } from '../../config';

const topExchanges = (req, res) => {
  const { crypto = 'BTC', limit = 10 } = req.query;
  return axios
    .get(`${MIN_API_URL}${TOP_EXCHANGES}?fsym=${crypto}&tsym=USD&limit=${limit}&api_key=${process.env.MIN_API_TOKEN}`)
      .then(({data: { Data: { Exchanges }}}) => (res.send({exchanges: Exchanges})));
}

export { topExchanges }

