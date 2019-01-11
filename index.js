import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotEnv from "dotenv";
import { registerRoutes } from "./server/index";
import { apiTokenValidator } from './server/middleware/apiTokenValidator/apiTokenValidor';


dotEnv.config();

const app = express();

registerRoutes(app);

const port = process.env.PORT || process.env.port || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(apiTokenValidator);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  })    

}  

app.listen(port, () => console.log('Server started'));
