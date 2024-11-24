import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const apiKey = process.env.FOOTBALL_DATA_API_KEY;
const footballApiUrl = process.env.FOOTBALL_API_URL || 'https://api.football-data.org/v4/matches';

const cache = new NodeCache({ stdTTL: 600 });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/matches', async (req, res) => {
  try {
      const type = req.query.type;
      const cacheKey = `matches-${type}`;
      const cachedData = cache.get(cacheKey);

      if (cachedData) {
          return res.json({ matches: cachedData });
      }

      let status = '';
      if (type === 'recent') status = 'FINISHED';
      else if (type === 'upcoming') status = 'SCHEDULED';

      const apiUrl = `${footballApiUrl}?status=${status}`;

      const response = await fetch(apiUrl, {
          headers: {
              'X-Auth-Token': apiKey
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const matches = await response.json();
      cache.set(cacheKey, matches.matches);
      res.json({ matches: matches.matches });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send(`Error fetching data from Football API: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});