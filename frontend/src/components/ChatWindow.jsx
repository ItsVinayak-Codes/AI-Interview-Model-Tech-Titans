import React, { useEffect, useRef } from 'react';

export default function ChatWindow({ messages, isThinking }) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div 
      ref={scrollRef}
      style={{ height: '450px', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      {messages.map((msg, idx) => {
        const isAgent = msg.sender === 'agent';
        return (
          <div key={idx} className="animate-fade-in" style={{
            alignSelf: isAgent ? 'flex-start' : 'flex-end',
            maxWidth: '85%',
            borderLeft: isAgent ? '3px solid var(--neon-blue)' : '3px solid var(--neon-purple)',
            background: isAgent ? 'rgba(0, 240, 255, 0.05)' : 'rgba(138, 43, 226, 0.05)',
            padding: '16px',
            borderRadius: '0 8px 8px 0',
            backdropFilter: 'blur(4px)'
          }}>
            <div className="font-mono" style={{ 
              fontSize: '11px', 
              color: isAgent ? 'var(--neon-blue)' : 'var(--neon-purple)', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {isAgent ? `[ SYS.AGENT // TOPIC: ${msg.day || 'INIT'} ]` : '[ CANDIDATE.UPLINK ]'}
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '15px', lineHeight: '1.6' }}>
              {msg.text}
            </div>
          </div>
        );
      })}

      {isThinking && (
        <div style={{ alignSelf: 'flex-start', padding: '16px', borderLeft: '3px solid var(--text-muted)' }}>
          <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
             AGENT_PROCESSING_RESPONSE <span className="cursor-blink"></span>
          </div>
        </div>
      )}
    </div>
  );
}