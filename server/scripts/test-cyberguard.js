import dotenv from 'dotenv';
import { sendCyberGuardEvent } from '../services/cyberguardService.js';

dotenv.config();

const result = await sendCyberGuardEvent('url', 'https://example.com');

// Deliberately omit request headers and environment values: this command is
// safe to run in CI or a terminal without exposing the server API key.
console.log(JSON.stringify({
  ok: result.ok,
  status: result.status,
  verdict: result.verdict ?? null,
  score: result.score ?? null,
  error: result.error ?? null,
}));

if (!result.ok) process.exitCode = 1;
