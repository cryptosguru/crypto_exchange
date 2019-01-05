import { getToListBy24Hours } from './min-api/getTopListBy24Hours';

const registerRoutes = app => {
  app.get('/getTopListBy24Hours', getToListBy24Hours )
}

export { registerRoutes };