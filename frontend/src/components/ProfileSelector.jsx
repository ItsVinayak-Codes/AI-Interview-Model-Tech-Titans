import React, { useState } from 'react';

export default function ProfileSelector({ candidates, onSelect }) {
  const [selectedId, setSelectedId] = useState('');
  const activeCandidate = candidates.find((c) => c.id === selectedId);

  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '40px', maxWidth: '700px', margin: '40px auto' }}>
      <h2 className="text-glow" style={{ margin: '0 0 10px 0', fontSize: '28px' }}>SYSTEM.INITIALIZE_INTERVIEW()</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '15px' }}>
        Awaiting candidate selection for localized cohort evaluation.
      </p>

      <div style={{ marginBottom: '24px' }}>
        <select 
          value={selectedId} 
          onChange={(e) => setSelectedId(e.target.value)}
          className="glass-panel font-mono border-glow"
          style={{ width: '100%', padding: '16px', color: '#fff', outline: 'none', cursor: 'pointer', appearance: 'none' }}
        >
          <option value="" style={{ color: '#000' }}>[ SELECT_CANDIDATE_PROFILE ]</option>
          {candidates.map((c) => (
            <option key={c.id} value={c.id} style={{ color: '#000' }}>{c.id} - {c.name}</option>
          ))}
        </select>
      </div>

      {activeCandidate && (
        <div className="animate-fade-in font-mono" style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--neon-blue)', marginBottom: '30px' }}>
          <div style={{ color: 'var(--neon-blue)', fontSize: '12px', marginBottom: '10px' }}>// CANDIDATE_DOSSIER_LOADED</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>NAME:</span> {activeCandidate.name}</div>
            <div><span style={{ color: 'var(--text-muted)' }}>TRACK:</span> {activeCandidate.track}</div>
            <div><span style={{ color: 'var(--text-muted)' }}>CURRICULUM_DAYS:</span> [{activeCandidate.completedDays.join(', ')}]</div>
            <div><span style={{ color: 'var(--text-muted)' }}>STATUS:</span> <span style={{ color: 'var(--success)' }}>READY</span></div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <span style={{ color: 'var(--text-muted)' }}>FOCUS_VECTORS:</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {activeCandidate.focusTopics.map(topic => (
                <span key={topic} style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--neon-blue)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => onSelect(activeCandidate)} 
        disabled={!activeCandidate}
        className={activeCandidate ? "border-glow" : ""}
        style={{
          width: '100%', padding: '16px', 
          background: activeCandidate ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.05)',
          color: activeCandidate ? 'var(--neon-blue)' : 'var(--text-muted)',
          border: 'none', borderRadius: '8px', fontWeight: 'bold', letterSpacing: '2px',
          cursor: activeCandidate ? 'pointer' : 'not-allowed', transition: 'all 0.3s ease'
        }}
      >
        {activeCandidate ? 'EXECUTE_INTERVIEW_SEQUENCE' : 'WAITING_FOR_INPUT...'}
      </button>
    </div>
  );
}