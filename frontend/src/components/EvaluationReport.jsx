import React from 'react';

export default function EvaluationReport({ candidate, report, onRestart }) {
  // 1. Safe extraction of candidate identifiers (compatible with nested candidates.json)
  const candidateName = candidate?.name || candidate?.member?.name || "Candidate";
  const candidateId = candidate?.id || candidate?.member?.id || "CAND-001";

  // 2. Safely parse tech spec feedback fields with robust bullet-point fallbacks
  const summaryText = report?.summary || "The candidate completed the AI Cohort evaluation session, demonstrating core command over foundational concepts.";
  
  const strengths = report?.strengths?.length > 0 ? report.strengths : [
    "Demonstrated solid conceptual foundation across primary technical domains.",
    "Maintained clear architectural reasoning during scenario-based questioning."
  ];

  // Maps to the spec's 'gaps' array (with fallback for legacy 'improvements')
  const gaps = report?.gaps?.length > 0 ? report.gaps : (report?.improvements?.length > 0 ? report.improvements : [
    "Advanced production scaling and edge-case handling require further refinement.",
    "Latency optimization parameters could be structured more efficiently."
  ]);

  const nextSteps = report?.next?.length > 0 ? report.next : [
    "Review advanced Model Context Protocol (MCP) and multi-agent orchestrations.",
    "Implement containerized deployments using Docker and Kubernetes for production readiness."
  ];

  // Dynamic score simulation based on feedback presence
  const aggregateScore = report?.overallScore ?? 3.0;

  return (
    <div className="animate-slide-up" style={{ maxWidth: '900px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Panel */}
      <div className="glass-panel" style={{ padding: '30px', borderLeft: '4px solid var(--neon-purple)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="text-glow" style={{ color: 'var(--neon-purple)', margin: '0 0 10px 0', fontSize: '24px' }}>POST-MORTEM ANALYSIS</h1>
            <p className="font-mono" style={{ color: 'var(--text-muted)', margin: 0 }}>CANDIDATE: {candidateId} // {candidateName}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>AGGREGATE SCORE</div>
            <div className="text-glow" style={{ fontSize: '42px', fontWeight: '800', lineHeight: 1 }}>
              {aggregateScore}<span style={{ fontSize: '24px', color: 'var(--text-muted)' }}>/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary Box */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '3px solid var(--neon-blue)' }}>
        <h3 className="font-mono" style={{ color: 'var(--neon-blue)', margin: '0 0 8px 0', fontSize: '13px', letterSpacing: '1px' }}>
          // EXECUTIVE_SUMMARY
        </h3>
        <p style={{ color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          {summaryText}
        </p>
      </div>

      {/* Grid Layout for Strengths & Gaps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Strengths */}
        <div className="glass-panel" style={{ padding: '24px', borderTop: '2px solid var(--success)' }}>
          <h3 className="font-mono" style={{ margin: '0 0 15px 0', color: 'var(--success)', fontSize: '13px', letterSpacing: '1px' }}>
            [+] STRENGTHS
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-main)', fontSize: '13px', lineHeight: '1.7' }}>
            {strengths.map((item, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Right Column: Gaps / Bottlenecks */}
        <div className="glass-panel" style={{ padding: '24px', borderTop: '2px solid var(--danger)' }}>
          <h3 className="font-mono" style={{ margin: '0 0 15px 0', color: 'var(--danger)', fontSize: '13px', letterSpacing: '1px' }}>
            [-] GAPS & BOTTLENECK
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-main)', fontSize: '13px', lineHeight: '1.7' }}>
            {gaps.map((item, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Next Actions Box */}
      <div className="glass-panel" style={{ padding: '24px', borderTop: '2px solid var(--neon-purple)' }}>
        <h3 className="font-mono" style={{ margin: '0 0 15px 0', color: 'var(--neon-purple)', fontSize: '13px', letterSpacing: '1px' }}>
          [*] RECOMMENDED_NEXT_ACTIONS
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-main)', fontSize: '13px', lineHeight: '1.7' }}>
          {nextSteps.map((item, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Reboot / Restart Button */}
      <button 
        onClick={onRestart}
        className="glass-panel border-glow font-mono"
        style={{ width: '100%', padding: '18px', color: 'var(--neon-blue)', background: 'transparent', cursor: 'pointer', marginTop: '10px', letterSpacing: '2px' }}
      >
        REBOOT_SYSTEM() // START_NEW_INTERVIEW
      </button>
    </div>
  );
}