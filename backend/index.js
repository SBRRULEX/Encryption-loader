const express = require('express');
const bodyParser = require('body-parser');
const startBot = require('./bot');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let isRunning = false;
let stopCode = "";

app.post('/start', async (req, res) => {
  const { token, messageList, delay, uid } = req.body;
  if(isRunning) {
    return res.status(400).json({error: 'Bot already running'});
  }
  stopCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  isRunning = true;

  startBot({ token, messageList, delay, uid, stopCode, isRunning }).then(() => {
    isRunning = false;
  }).catch(() => {
    isRunning = false;
  });

  res.json({ status: 'running', stopCode });
});

app.post('/stop', (req, res) => {
  const { code } = req.body;
  if(code === stopCode) {
    isRunning = false;
    res.json({ status: 'stopped' });
  } else {
    res.status(403).json({ error: 'Invalid stop code' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));
