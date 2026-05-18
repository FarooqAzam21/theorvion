// ─────────────────────────────────────────────────────────────
//  ChatWidget.jsx  —  Floating launcher button + chat window
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import ChatWindow from './ChatWindow';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show attention tooltip after 5 seconds if not opened
  useEffect(() => {
    const t = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Hide tooltip after 4 more seconds
  useEffect(() => {
    if (showTooltip) {
      const t = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(t);
    }
  }, [showTooltip]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowPulse(false);
    setShowTooltip(false);
  };

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <div className="chat-widget-launcher" aria-label="Chat with Orion AI">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="chat-tooltip"
            >
              <div className="chat-tooltip-dot" />
              <span>👋 Hi! Ask me anything about The Orvion</span>
              <div className="chat-tooltip-arrow" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {showPulse && !isOpen && (
          <span className="chat-pulse-ring" aria-hidden="true" />
        )}

        {/* Main button */}
        <motion.button
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="chat-fab"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="chat-fab-icon"
              >
                <img
                  src="/assets/logo.png"
                  alt="Orion AI"
                  className="w-7 h-7 object-contain"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
