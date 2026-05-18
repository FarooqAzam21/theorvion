
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load .env using absolute path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function test() {
  let log = '';
  const append = (msg, meta = '') => {
    const line = msg + (meta ? ' ' + JSON.stringify(meta) : '');
    console.log(line);
    log += line + '\n';
  };

  append('--- DIAGNOSTIC TEST START ---');
  
  if (!process.env.GEMINI_API_KEY) {
    append('ERROR: GEMINI_API_KEY missing');
    return;
  }
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const modelsToTest = [
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-2.5-flash'
  ];

  for (const m of modelsToTest) {
    try {
      append(`Testing ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent('Hi');
      append(`${m} SUCCESS: ${result.response.text().trim().substring(0, 20)}...`);
    } catch (err) {
      append(`${m} FAILED: ${err.message}`);
    }
  }

  const embedModelsToTest = [
    'text-embedding-004',
    'text-embedding-005',
    'embedding-001'
  ];

  for (const m of embedModelsToTest) {
    try {
      append(`Testing ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.embedContent('Hi');
      append(`${m} SUCCESS!`);
    } catch (err) {
      append(`${m} FAILED: ${err.message}`);
    }
  }

  append('--- DIAGNOSTIC TEST END ---');
  fs.writeFileSync('test-log-v4.txt', log);
}

test();
