
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const CHAT_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:0.5b';
const EMBED_MODEL = process.env.OLLAMA_EMBEDDING_MODEL || 'nomic-embed-text';

async function testOllama() {
  console.log('--- OLLAMA DIAGNOSTIC TEST ---');
  console.log(`Host: ${OLLAMA_HOST}`);
  console.log(`Chat Model: ${CHAT_MODEL}`);
  console.log(`Embed Model: ${EMBED_MODEL}`);
  console.log('------------------------------');

  // 1. Check if Ollama is running
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    console.log('✅ Ollama is running.');
    
    const models = data.models || [];
    const hasChat = models.some(m => m.name.includes(CHAT_MODEL));
    const hasEmbed = models.some(m => m.name.includes(EMBED_MODEL));

    if (hasChat) console.log(`✅ Chat model "${CHAT_MODEL}" is installed.`);
    else console.log(`❌ Chat model "${CHAT_MODEL}" NOT found in Ollama.`);

    if (hasEmbed) console.log(`✅ Embed model "${EMBED_MODEL}" is installed.`);
    else console.log(`❌ Embed model "${EMBED_MODEL}" NOT found in Ollama.`);
    
    if (!hasChat || !hasEmbed) {
        console.log('\nAvailable models:');
        models.forEach(m => console.log(` - ${m.name}`));
    }
  } catch (err) {
    console.error(`❌ Cannot connect to Ollama at ${OLLAMA_HOST}. Is it running?`);
    console.error(`Error: ${err.message}`);
    return;
  }

  // 2. Test Chat Generation
  console.log('\n--- Testing Chat Generation ---');
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [{ role: 'user', content: 'Say hello in 3 words.' }],
        stream: false
      })
    });
    const data = await res.json();
    console.log(`✅ Response: "${data.message?.content?.trim()}"`);
  } catch (err) {
    console.error(`❌ Chat failed: ${err.message}`);
  }

  // 3. Test Embedding
  console.log('\n--- Testing Embeddings ---');
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/embed`, {
      method: 'POST',
      body: JSON.stringify({
        model: EMBED_MODEL,
        input: 'The Orvion is a software house.'
      })
    });
    const data = await res.json();
    if (data.embeddings && data.embeddings[0]) {
      console.log(`✅ Embedding SUCCESS. Dimension: ${data.embeddings[0].length}`);
    } else {
      console.log('❌ Embedding failed: No embeddings returned.');
    }
  } catch (err) {
    console.error(`❌ Embedding failed: ${err.message}`);
  }

  console.log('\n--- DIAGNOSTIC END ---');
}

testOllama();
