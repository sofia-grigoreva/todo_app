const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get('/', (_, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(2727, () => {
  console.log('Server running on port 2727');
});