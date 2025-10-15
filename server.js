const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const root = __dirname;
const site = path.join(root, 'site');
const card = path.join(root, 'aster-card');

app.use('/site', express.static(site, { extensions: ['html'] }));
app.use('/aster-card', express.static(card, { extensions: ['html'] }));
app.use('/', express.static(site, { extensions: ['html'] }));

app.get('*', (req, res) => {
  // Fallback: try site index, then card index
  const siteIndex = path.join(site, 'index.html');
  const cardIndex = path.join(card, 'index.html');
  try { return res.sendFile(siteIndex); } catch(e) {}
  try { return res.sendFile(cardIndex); } catch(e) {}
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`ZeroEdge portfolio running on http://localhost:${PORT}`);
});
