// ─────────────────────────────────────────────────────────────
//  ChatWindow.jsx  —  Main glassmorphism chat panel
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Sparkles } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const QUICK_PROMPTS = [
  { label: '⚡ Our Services', text: 'What services does The Orvion offer?' },
  { label: '🤖 AI Chatbots', text: 'Do you build AI chatbots?' },
  { label: '🛒 E-Commerce Cost', text: 'How much does an e-commerce website cost?' },
  { label: '🏢 About Orvion', text: 'Tell me about The Orvion' },
];

const ChatWindow = ({ onClose }) => {
  const { messages, isLoading, sendMsg, clearChat } = useChat();
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const hasOnlyWelcome = messages.length === 1 && messages[0].isWelcome;

  return (
    <motion.div
      key="chat-window"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="chat-window"
      role="dialog"
      aria-label="Orvion AI Chat"
    >
      {/* ── Header ── */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-header-avatar">
            <img src="/assets/logo.png" alt="Orion AI" className="w-full h-full object-contain p-1" />
            <span className="chat-online-dot" />
          </div>
          <div>
            <p className="chat-header-name">Orion</p>
            <p className="chat-header-sub">
              <Sparkles className="w-2.5 h-2.5 inline mr-1" />
              AI Assistant · The Orvion
            </p>
          </div>
        </div>
        <div className="chat-header-actions">
          <button
            onClick={clearChat}
            title="Clear conversation"
            className="chat-icon-btn"
            aria-label="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            title="Close chat"
            className="chat-icon-btn close"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Shimmer divider ── */}
      <div className="shimmer-line" />

      {/* ── Messages ── */}
      <div ref={scrollRef} className="chat-messages" aria-live="polite">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Quick prompts — shown only on fresh chat */}
        <AnimatePresence>
          {hasOnlyWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="quick-prompts"
            >
              <p className="quick-prompts-label">Try asking:</p>
              <div className="quick-prompts-grid">
                {QUICK_PROMPTS.map((p) => (
                  <motion.button
                    key={p.text}
                    onClick={() => sendMsg(p.text)}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="quick-prompt-btn"
                    disabled={isLoading}
                  >
                    {p.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} className="h-2" />
      </div>

      {/* ── Shimmer divider ── */}
      <div className="shimmer-line" />

      {/* ── Input ── */}
      <div className="chat-input-area">
        <ChatInput onSend={sendMsg} isLoading={isLoading} />
      </div>

      {/* ── Footer ── */}
      <div className="chat-footer">
        <span>Powered by</span>
        <span className="chat-footer-brand">The Orvion</span>
        <span>· AI</span>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
