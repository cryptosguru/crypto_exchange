const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (_req, res) => {
      res.send(path.join(__dirname, 'client/build', 'index.html'));
  })

}

const port = process.env.PORT || process.env.port || 5000;

app.listen(port, () => console.log('server started'));

app.get('/test', (req, res) => {
  res.send({express: 'express working'})
})