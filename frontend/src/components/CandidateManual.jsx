import React from 'react';

export default function CandidateManual({ candidate, onAcknowledge }) {
  return (
    <div className="glass-panel animate-slide-up" style={{ maxWidth: '800px', margin: '20px auto', padding: '40px' }}>
      
      {/* Header Section */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '30px' }}>
        <h2 className="text-glow font-mono" style={{ margin: '0 0 10px 0', fontSize: '24px', color: 'var(--neon-purple)' }}>
           OPERATION: COHORT_EVALUATION
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>
          Welcome to the automated technical screening portal. This system is designed to rigorously assess your proficiency across the 31-Day AI Curriculum.
        </p>
      </div>

      {/* Grid Layout for Information */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        
        {/* Left Column: Organization & Mission */}
        <div>
          <h3 className="font-mono" style={{ color: 'var(--neon-blue)', fontSize: '14px', marginBottom: '15px' }}>
            [01] ORGANIZATION_OVERVIEW
          </h3>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px', borderLeft: '2px solid var(--neon-blue)', color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong>Target Track:</strong> AIML Core<br/>
              <strong>Objective:</strong> Validate theoretical knowledge and architectural reasoning for production AI systems.
            </p>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              This AI agent does not evaluate simple definitions. It tests your ability to synthesize concepts like Vector Embeddings, Agentic Tools, and Latency Optimization under pressure.
            </p>
          </div>
        </div>

        {/* Right Column: The Process */}
        <div>
          <h3 className="font-mono" style={{ color: 'var(--success)', fontSize: '14px', marginBottom: '15px' }}>
            [02] ENGAGEMENT_PROTOCOL
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.8' }}>
            <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--success)' }}>»</span>
              <span><strong>Dynamic Adaptation:</strong> The AI will ask exactly 8 questions, adapting to the depth of your previous answers.</span>
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--success)' }}>»</span>
              <span><strong>Module Coverage:</strong> You must demonstrate competence across a minimum of 4 distinct curriculum days.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--success)' }}>»</span>
              <span><strong>Input Modes:</strong> You may type your responses or use the secure voice uplink.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Acknowledge Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p className="font-mono" style={{ color: 'var(--danger)', fontSize: '12px', marginBottom: '15px', letterSpacing: '1px' }}>
          WARNING: ONCE INITIATED, THE SESSION CANNOT BE PAUSED.
        </p>
        <button 
          onClick={onAcknowledge}
          className="border-glow font-mono"
          style={{
            padding: '16px 40px',
            background: 'rgba(0, 240, 255, 0.1)',
            color: 'var(--neon-blue)',
            border: '1px solid var(--neon-blue)',
            borderRadius: '8px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          ACKNOWLEDGE & INITIATE_UPLINK
        </button>
      </div>

    </div>
  );
}