import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/src', express.static('src'));
app.use('/public', express.static('public'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(2727, () => {
  console.log('Server running on port 2727');
});