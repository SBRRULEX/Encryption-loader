const puppeteer = require('puppeteer');

module.exports = async function startBot({ token, messageList, delay, uid, stopCode, isRunning }) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ cookie: token });

  await page.goto(`https://www.facebook.com/messages/t/${uid}`, { waitUntil: 'networkidle2' });

  for (let i = 0; i < messageList.length && isRunning; i++) {
    try {
      await page.waitForSelector('[contenteditable="true"]', { timeout: 15000 });
      await page.focus('[contenteditable="true"]');
      await page.keyboard.type(messageList[i]);
      await page.keyboard.press('Enter');

      console.log(`[${new Date().toLocaleString()}] - SBR SUCCESSFULLY SEND: ${messageList[i]}`);

      let waitTime = 0;
      while (waitTime < delay && isRunning) {
        await new Promise(r => setTimeout(r, 500));
        waitTime += 500;
      }
      if(!isRunning) break;
    } catch(e) {
      console.log('Error sending message:', e.message);
      break;
    }
  }

  await browser.close();
};
