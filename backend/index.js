const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve HTML UI

app.post('/send', async (req, res) => {
  const { token, uid, message } = req.body;
  console.log(`[${new Date().toLocaleString()}] Sending message:`, message);
  // Yaha Puppeteer se message bhejne ka logic aayega
  return res.json({ status: 'SBR SUCCESSFULLY SEND' });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
