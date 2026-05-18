// ─────────────────────────────────────────────────────────────
//  ChatMessage.jsx  —  Individual message bubble with citations
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Zap, BookOpen } from 'lucide-react';

// ── Simple inline Markdown renderer ──────────────────────────
const renderMarkdown = (text) => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      elements.push(<br key={i} />);
      i++;
      continue;
    }

    // Bullet points
    if (line.match(/^[\s]*[-•*]\s/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[\s]*[-•*]\s/)) {
        items.push(
          <li key={i} className="chat-list-item">
            {renderInline(lines[i].replace(/^[\s]*[-•*]\s/, ''))}
          </li>
        );
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="chat-list">{items}</ul>);
      continue;
    }

    elements.push(<p key={i} className="chat-para">{renderInline(line)}</p>);
    i++;
  }

  return elements;
};

const renderInline = (text) => {
  // **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={idx}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={idx} className="chat-inline-code">{part.slice(1, -1)}</code>;
    return part;
  });
};

// ── Typing dots indicator ─────────────────────────────────────
const TypingDots = () => (
  <div className="typing-dots" aria-label="AI is thinking">
    <span /><span /><span />
  </div>
);

// ── Confidence badge ──────────────────────────────────────────
const ConfidenceBadge = ({ score }) => {
  if (!score || score === 0) return null;
  const color = score >= 70 ? '#22d3ee' : score >= 45 ? '#a78bfa' : '#f59e0b';
  return (
    <span className="confidence-badge" style={{ borderColor: color, color }}>
      <Zap className="w-2.5 h-2.5" />
      {score}% match
    </span>
  );
};

// ── Source citations ──────────────────────────────────────────
const Citations = ({ sources }) => {
  const [open, setOpen] = useState(false);
  if (!sources || sources.length === 0) return null;

  return (
    <div className="citations-wrapper">
      <button
        onClick={() => setOpen((o) => !o)}
        className="citations-toggle"
        aria-expanded={open}
      >
        <BookOpen className="w-3 h-3" />
        {sources.length} source{sources.length > 1 ? 's' : ''}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="citations-list"
          >
            {sources.map((src, i) => (
              <div key={i} className="citation-item">
                <span className="citation-dot" />
                <span className="citation-text">
                  <strong>{src.title}</strong> — {src.section}
                  <span className="citation-score">{src.score}%</span>
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Typewriter Effect for "streaming" feel ─────────────────────
const Typewriter = ({ text, speed = 10, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <>{renderMarkdown(displayedText)}</>;
};

// ── Main ChatMessage ──────────────────────────────────────────
const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  const isTyping = message.role === 'typing';
  const isAssistant = message.role === 'assistant';

  // Only use typewriter for fresh assistant messages (not welcome or history)
  const shouldType = isAssistant && !message.isWelcome && !message.fromHistory;

  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  if (isTyping) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="chat-msg-row assistant"
      >
        <div className="chat-avatar ai">
          <img src="/assets/logo.png" alt="Orion" className="w-full h-full object-contain p-0.5" />
        </div>
        <div className="chat-bubble ai typing-bubble">
          <TypingDots />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`chat-msg-row ${isUser ? 'user' : 'assistant'}`}
    >
      {/* AI Avatar */}
      {isAssistant && (
        <div className="chat-avatar ai">
          <img src="/assets/logo.png" alt="Orion" className="w-full h-full object-contain p-0.5" />
        </div>
      )}

      {/* Message bubble */}
      <div className={`chat-bubble-wrapper ${isUser ? 'user' : 'ai'}`}>
        <div className={`chat-bubble ${isUser ? 'user' : 'ai'} ${message.isError ? 'error' : ''}`}>
          <div className="chat-content">
            {isAssistant ? (
              shouldType ? <Typewriter text={message.content} /> : renderMarkdown(message.content)
            ) : (
              <p>{message.content}</p>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className={`chat-meta ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="chat-time">{time}</span>
          {isAssistant && <ConfidenceBadge score={message.confidence} />}
        </div>

        {/* Source citations */}
        {isAssistant && <Citations sources={message.sources} />}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="chat-avatar user">
          <span>U</span>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
