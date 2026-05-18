// ─────────────────────────────────────────────────────────────
//  useChat.js  —  Custom hook for chatbot state management
// ─────────────────────────────────────────────────────────────
import { useState, useCallback, useRef, useEffect } from 'react';
import { sendMessage } from '../services/chatApi';
import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'orvion_chat_history';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: "Hello! I'm **Orion**, The Orvion's AI assistant. 👋\n\nI can help you learn about our services, pricing, technologies, and how we can help bring your project to life.\n\nWhat would you like to know?",
  sources: [],
  confidence: 100,
  timestamp: new Date().toISOString(),
  isWelcome: true,
};

export const useChat = () => {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastUserMessageRef = useRef(null);

  // Restore session from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 1) {
          // Mark all restored messages as fromHistory to prevent re-typing
          const historical = parsed.map(m => ({ ...m, fromHistory: true }));
          setMessages(historical);
        }
      }
    } catch { /* ignore */ }
  }, []);

  // Persist session to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch { /* ignore */ }
  }, [messages]);

  // Build history array for backend (exclude welcome message)
  const buildHistory = useCallback((msgs) => {
    return msgs
      .filter((m) => !m.isWelcome && !m.isError && m.role !== 'typing')
      .slice(-16) // last 8 turns (16 messages)
      .map((m) => ({ role: m.role, content: m.content }));
  }, []);

  const sendMsg = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    lastUserMessageRef.current = content;

    const userMsg = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    const typingMsg = {
      id: 'typing',
      role: 'typing',
      content: '',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setIsLoading(true);

    try {
      const history = buildHistory([...messages, userMsg]);
      const result = await sendMessage(content.trim(), history);

      const assistantMsg = {
        id: uuidv4(),
        role: 'assistant',
        content: result.answer,
        sources: result.sources || [],
        confidence: result.confidence || 0,
        latencyMs: result.latencyMs,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== 'typing'),
        assistantMsg,
      ]);
    } catch (err) {
      const errorMsg = {
        id: uuidv4(),
        role: 'assistant',
        content: `I'm sorry, I encountered an issue: *${err.message}*\n\nPlease try again or contact us at **hello@theorvion.com**.`,
        sources: [],
        confidence: 0,
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== 'typing'),
        errorMsg,
      ]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, buildHistory]);

  const retryLast = useCallback(() => {
    if (lastUserMessageRef.current) {
      sendMsg(lastUserMessageRef.current);
    }
  }, [sendMsg]);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMsg,
    retryLast,
    clearChat,
  };
};
