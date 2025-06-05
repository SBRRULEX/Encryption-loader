import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [delay, setDelay] = useState(5000);
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [stopCode, setStopCode] = useState('');
  const [stopInput, setStopInput] = useState('');
  const [fileUploading, setFileUploading] = useState(false);

  const appendLog = (text) => {
    setLogs(prev => [...prev, text]);
  };

  const handleStart = async () => {
    if(!token || !uid || messageList.length === 0) {
      alert('Please fill token, uid and messages');
      return;
    }
    setRunning(true);
    setLogs([]);
    try {
      const res = await axios.post('http://localhost:3000/start', {
        token,
        uid,
        messageList,
        delay,
      });
      setStopCode(res.data.stopCode);
      appendLog(`Bot started. Stop code: ${res.data.stopCode}`);
    } catch(e) {
      appendLog('Error starting bot: ' + e.message);
      setRunning(false);
    }
  };

  const handleStop = async () => {
    if(!stopInput) {
      alert('Enter stop code');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/stop', { code: stopInput });
      appendLog('Bot stopped');
      setRunning(false);
      setStopCode('');
      setStopInput('');
    } catch(e) {
      appendLog('Invalid stop code');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setFileUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = ev.target.result.split('\\n').map(l => l.trim()).filter(Boolean);
      setMessageList(lines);
      setFileUploading(false);
    };
    reader.readAsText(file);
  };

  const addMessage = () => {
    if(message.trim()) {
      setMessageList(prev => [...prev, message.trim()]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-5 text-white font-sans">
      <h1 className="text-3xl font-bold mb-4">Facebook Messenger Auto Bot</h1>
      <div className="space-y-3">
        <label>Facebook Cookie / Token (paste here):</label>
        <textarea
          rows={3}
          value={token}
          onChange={e => setToken(e.target.value)}
          className="w-full p-2 rounded text-black"
          placeholder="Paste your cookie or token"
          disabled={running}
        />
        <label>Group/Profile UID:</label>
        <input
          type="text"
          value={uid}
          onChange={e => setUid(e.target.value)}
          placeholder="Facebook group or user ID"
          className="w-full p-2 rounded text-black"
          disabled={running}
        />
        <label>Messages (type one and add or upload file):</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-grow p-2 rounded text-black"
            disabled={running}
          />
          <button
            onClick={addMessage}
            disabled={running}
            className="bg-green-500 px-3 rounded disabled:opacity-50"
          >
            Add
          </button>
        </div>
        <input type="file" accept=".txt" onChange={handleFileUpload} disabled={running || fileUploading} />
        <label>Delay between messages (ms):</label>
        <input
          type="number"
          value={delay}
          onChange={e => setDelay(Number(e.target.value))}
          min={1000}
          step={500}
          className="w-full p-2 rounded text-black"
          disabled={running}
        />
        <div>
          <button
            onClick={handleStart}
            disabled={running}
            className="bg-blue-600 px-4 py-2 rounded w-full mb-2 disabled:opacity-50"
          >
            Run Bot
          </button>
          <div className="text-center mb-2">{running && `Stop Code: ${stopCode}`}</div>
          <input
            type="text"
            placeholder="Enter stop code"
            value={stopInput}
            onChange={e => setStopInput(e.target.value)}
            className="w-full p-2 rounded text-black mb-2"
            disabled={!running}
          />
          <button
            onClick={handleStop}
            disabled={!running}
            className="bg-red-600 px-4 py-2 rounded w-full disabled:opacity-50"
          >
            Stop Bot
          </button>
        </div>
        <label>Logs:</label>
        <div className="h-48 overflow-auto bg-black bg-opacity-50 rounded p-2 text-sm font-mono">
          {logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
