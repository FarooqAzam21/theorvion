// ─────────────────────────────────────────────────────────────
//  ChatInput.jsx  —  Message input with send button
// ─────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSend, isLoading, disabled }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    autoResize();
  };

  const handleSend = () => {
    const msg = value.trim();
    if (!msg || isLoading || disabled) return;
    onSend(msg);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-container">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about The Orvion…"
          disabled={isLoading || disabled}
          rows={1}
          maxLength={1000}
          className="chat-textarea"
          aria-label="Chat message input"
        />
        <motion.button
          onClick={handleSend}
          disabled={!canSend}
          whileHover={canSend ? { scale: 1.08 } : {}}
          whileTap={canSend ? { scale: 0.92 } : {}}
          className={`chat-send-btn ${canSend ? 'active' : 'inactive'}`}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </motion.button>
      </div>
      <p className="chat-input-hint">
        Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
};

export default ChatInput;
