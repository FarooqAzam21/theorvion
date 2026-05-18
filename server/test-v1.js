
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function testV1() {
  const key = process.env.GEMINI_API_KEY;
  // Note: The SDK doesn't easily let you change the version per call,
  // but we can test with fetch.
  
  try {
    console.log('Testing text-embedding-004 on v1...');
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/text-embedding-004:embedContent?key=${key}`, {
      method: 'POST',
      body: JSON.stringify({ content: { parts: [{ text: 'Hi' }] } })
    });
    const data = await res.json();
    console.log('v1 Result:', data);
  } catch (err) {
    console.log('v1 Failed:', err.message);
  }
}

testV1();
