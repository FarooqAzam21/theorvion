import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const result = await genAI.listModels();
    console.log("Available models:");
    result.models.forEach(m => {
      if (m.supportedGenerationMethods.includes('embedContent')) {
        console.log(`- ${m.name} (Supports embedding)`);
      } else {
        console.log(`- ${m.name}`);
      }
    });
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
