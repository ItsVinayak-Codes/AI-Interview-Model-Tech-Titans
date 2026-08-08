import React from 'react';

export default function InterviewHeader({ candidate, questionCount, coveredDays, onEnd }) {
  const minQuestions = 8;
  
  return (
    <div className="glass-panel" style={{ borderBottom: '1px solid var(--border)', borderRadius: '12px 12px 0 0', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left: Blinking Live Status & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%', animation: 'blink 1.5s infinite' }}></div>
            <span className="font-mono" style={{ color: 'var(--danger)', fontSize: '11px', fontWeight: 'bold' }}>SESSION_LIVE</span>
          </div>
          <div>
            <h3 className="font-mono text-glow" style={{ margin: 0, fontSize: '16px', color: 'var(--text-main)' }}>
              CANDIDATE: {candidate?.name || 'UNKNOWN'}
            </h3>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              MODULES_VERIFIED: [{coveredDays.join(', ')}]
            </span>
          </div>
        </div>

        {/* Right: Tracker & End Button */}
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          
          {/* Terminate Button */}
          <button 
            onClick={onEnd}
            className="font-mono"
            style={{
              background: 'rgba(239, 68, 68, 0.05)',
              color: 'var(--danger)',
              border: '1px solid var(--danger)',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            [ TERMINATE_UPLINK ]
          </button>

          {/* Segmented Progress Tracker */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {[...Array(minQuestions)].map((_, i) => (
              <div key={i} style={{
                width: '12px', height: '4px',
                backgroundColor: i < questionCount ? 'var(--neon-blue)' : 'var(--border)',
                boxShadow: i < questionCount ? '0 0 8px rgba(0,240,255,0.4)' : 'none',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}