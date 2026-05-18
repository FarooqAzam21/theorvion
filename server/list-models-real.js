
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function listAllModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error('No key found');
    return;
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    
    if (data.models) {
      console.log('Available Models:');
      data.models.forEach(m => {
        console.log(`- ${m.name} (Methods: ${m.supportedGenerationMethods.join(', ')})`);
      });
    } else {
      console.log('No models found or error:', data);
    }
  } catch (err) {
    console.error('Fetch failed:', err.message);
  }
}

listAllModels();
