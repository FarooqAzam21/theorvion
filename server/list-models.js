
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function listModels() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY missing');
    return;
  }
  
  // The SDK doesn't have a direct listModels method on the genAI object usually, 
  // but we can try to fetch it manually or use the underlying client if available.
  // Actually, let's just try some more likely names for 2026.
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const models = [
    'gemini-2.5-flash',
    'text-embedding-004',
    'text-embedding-005',
    'gemini-embedding-001',
    'gemini-embedding-v1'
  ];

  for (const m of models) {
    try {
      console.log(`Testing ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      if (m.includes('embedding')) {
        await model.embedContent('Hi');
      } else {
        await model.generateContent('Hi');
      }
      console.log(`  ${m} SUCCESS`);
    } catch (err) {
      console.log(`  ${m} FAILED: ${err.message}`);
    }
  }
}

listModels();
