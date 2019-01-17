import axios from 'axios';
import { MIN_API_URL, COIN_LIST } from '../../config';

export const allCurrencies = async (_req, res) => {

  const { data : { Data }} = await axios.get(`${MIN_API_URL}${COIN_LIST}?api_key=${process.env.MIN_API_TOKEN}`);
  res.send({ coins:Object.entries(Data).map(([_key, value]) => {
    return {
      name: value.Name,
      displayName: value.FullName
    }
  }) });
}