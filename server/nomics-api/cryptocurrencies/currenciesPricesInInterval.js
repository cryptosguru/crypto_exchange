import axios from "axios";
import {
  NOMICS_URL,
  CANDLES
} from '../../config';

const currenciesPricesInInterval = async (req, res) => {
  const date = new Date()
  const startDefault = new Date(date.setMonth(date.getMonth() - 1));
  const {
    start = startDefault.toString(), end, currency, interval
  } = req.query;
  const formattedStart = ISODateString(new Date(start));
  const formattedEnd = end ? ISODateString(new Date(end)) : '';
  const URL = `${NOMICS_URL}${CANDLES}?start=${formattedStart}${formattedEnd ? `&end=${formattedEnd}`: ''}&key=${process.env.NOMICS_TOKEN}&currency=${currency}&interval=${interval}`;
  console.log(URL);
  const {
    data
  } = await axios.get(URL);
  res.send({
    prices: data.map((candle) => ({...candle, avarage: (parseFloat(candle.low) + parseFloat(candle.high)) / 2}))
  });
}

export {
  currenciesPricesInInterval
};

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? '0' + n : n
  }
  return d.getUTCFullYear() + '-' +
    pad(d.getUTCMonth() + 1) + '-' +
    pad(d.getUTCDate()) + 'T' +
    pad(d.getUTCHours()) + ':' +
    pad(d.getUTCMinutes()) + ':' +
    pad(d.getUTCSeconds()) + 'Z'
}