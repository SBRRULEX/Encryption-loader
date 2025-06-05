# Facebook Messenger Auto Bot

## Features
- Send automated messages on Facebook Messenger even after end-to-end encryption.
- Use Facebook cookie/token (paste it directly).
- Specify recipient by Facebook User or Group UID.
- Add messages manually or upload a .txt file with one message per line.
- Set custom delay between messages.
- Start/Stop bot with a random 6-character stop code for security.
- View logs with timestamps and success confirmation.

## Setup

### Backend
1. Requires Node.js installed.
2. Navigate to `/backend`.
3. Run `npm install express body-parser cors puppeteer`.
4. Run `node index.js` to start the backend server.

### Frontend
1. Navigate to `/frontend`.
2. Run `npm install`.
3. Run `npm start` to start the React app.

## Usage
- Paste your Facebook cookie/token in the textarea.
- Enter the Facebook User or Group UID.
- Add messages manually or upload a text file (.txt).
- Set delay between messages in milliseconds (minimum 1000 ms).
- Click "Run Bot" to start sending messages.
- A stop code will be generated and shown.
- To stop the bot, enter the stop code and click "Stop Bot".
- Logs will show message sending progress and errors.

## Notes
- This bot runs Puppeteer headless on the backend to simulate the Facebook web messenger.
- Use responsibly and at your own risk.
- Ensure the token you provide is valid and has permissions.
