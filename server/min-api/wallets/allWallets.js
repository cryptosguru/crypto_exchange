import axios from 'axios';
import { GENERAL_WALLETS, MIN_API_URL, CRYPTOCOMPARE_WEBSITE } from '../../config';

const allWallets = async (_req, res) => {
  const { data: { Data: wallets }} = await axios.get(`${MIN_API_URL}${GENERAL_WALLETS}?api_key=${process.env.MIN_API_TOKEN}`)
  res.send({ wallets: 
    wallets.map(wallet => ({
      id: wallet.Id,
      name: wallet.Name,
      anonymity: wallet.Anonymity,
      secuiry: wallet.Security,
      logoUrl: `${CRYPTOCOMPARE_WEBSITE}${wallet.LogoUrl}`,
      coins: wallet.Coins,
      platforms: wallet.Platforms,
      sourceCodeUrl: wallet.SourceCodeUrl,
      url: wallet.AffiliateURL
    }))
  })
}

export { allWallets }