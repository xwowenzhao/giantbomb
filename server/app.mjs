import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/games', (req, res) => {
  const endpoint = `https://www.giantbomb.com${req.url}`;
  console.log(`Request URL: ${endpoint}`);
  fetch(endpoint)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => console.log(error));
});

app.get('/api/game/:id', (req, res) => {
  const endpoint = `https://www.giantbomb.com${req.url}`;
  console.log(`Request URL: ${endpoint}`);
  fetch(endpoint)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => console.log(error));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
