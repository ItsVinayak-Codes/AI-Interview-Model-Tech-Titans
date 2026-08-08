import React, { useState } from 'react';

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', padding: '20px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder={disabled ? "PROCESSING_AGENT_RESPONSE..." : "Enter your technical response..."} 
        disabled={disabled}
        className="border-glow font-mono"
        style={{ 
          flex: 1, padding: '16px', borderRadius: '8px', 
          background: 'var(--bg-dark)', color: 'var(--text-main)', 
          outline: 'none', transition: 'all 0.3s ease',
          opacity: disabled ? 0.5 : 1
        }}
      />
      <button 
        type="submit" 
        disabled={disabled || !text.trim()}
        className={(!disabled && text.trim()) ? "border-glow font-mono" : "font-mono"}
        style={{
          padding: '0 30px',
          background: (!disabled && text.trim()) ? 'rgba(0, 240, 255, 0.1)' : 'var(--bg-dark)',
          color: (!disabled && text.trim()) ? 'var(--neon-blue)' : 'var(--text-muted)',
          border: '1px solid var(--border)',
          borderRadius: '8px', fontWeight: 'bold',
          cursor: (!disabled && text.trim()) ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease'
        }}
      >
        TRANSMIT_
      </button>
    </form>
  );
}