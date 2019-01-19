import axios from 'axios';
import { GENERAL_WALLETS, MIN_API_URL, CRYPTOCOMPARE_WEBSITE } from '../../config';

const walletsFilters = {
  coinsIncludes: coin => ({ coins }) => coins.map(supportedCoin => supportedCoin.toLowerCase()).includes(coin.toLowerCase()),
  anonymityIs: walletAnonymity => ({ anonymity }) => anonymity === walletAnonymity
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Supports two filters, coinIncludes and security.
 */
const allWallets = async (req, res) => {
  const { coinsIncludes, anonymity } = req.query;

  const { data: { Data: walletsWithKeyValue }} = await axios.get(`${MIN_API_URL}${GENERAL_WALLETS}?api_key=${process.env.MIN_API_TOKEN}`)
  
  /**
   * The Goal here was not performance, this could be reduced to just one loop.
   */
  const securityFilter = anonymity ? walletsFilters.anonymityIs(anonymity) : () => true;
  const coinsFilter = coinsIncludes ? walletsFilters.coinsIncludes(coinsIncludes) : () => true;

  const allWallets = Object.entries(walletsWithKeyValue)
    .map(([_key, wallet]) => wallet)
    .map(wallet => ({
      id: wallet.Id,
      name: wallet.Name,
      anonymity: wallet.Anonymity,
      security: wallet.Security,
      logoUrl: `${CRYPTOCOMPARE_WEBSITE}${wallet.LogoUrl}`,
      coins: wallet.Coins,
      platforms: wallet.Platforms,
      sourceCodeUrl: wallet.SourceCodeUrl,
      url: wallet.AffiliateURL,
      recommended: wallet.Recommended,
    }));
  
  res.send({ wallets: allWallets.filter(securityFilter).filter(coinsFilter) })
}

export { allWallets }