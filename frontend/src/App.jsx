import React from 'react';
import InterviewApp from './pages/InterviewApp';
import './index.css'; // Ensure your global Tailwind/CSS file is imported

export default function App() {
  return (
    // Removed the conflicting light-theme Tailwind classes here
    <div className="min-h-screen flex flex-col">
      {/* Tactical Grid Background */}
      <div className="cyber-grid"></div>
      
      {/* Global Header / Navbar */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <div style={styles.logoGroup}>
            <div style={styles.logoIcon}>🤖</div>
            <h1 style={styles.logoText}>AI Cohort 31</h1>
          </div>
          <span style={styles.badge}>Technical Interview Portal</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={styles.main}>
        {/* We render the main interview engine here */}
        <InterviewApp />
      </main>

      {/* Global Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AI Cohort Interview System. Built for AI/ML Track.</p>
      </footer>
    </div>
  );
}

// Inline styles updated for the Cyber-Dark theme
const styles = {
  header: {
    backgroundColor: 'rgba(7, 9, 15, 0.8)', // Matches --bg-dark but slightly transparent
    backdropFilter: 'blur(12px)',           // Glassmorphism effect
    borderBottom: '1px solid var(--border)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  navContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    fontSize: '24px',
    filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))' // Gives the robot a subtle glow
  },
  logoText: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '800',
    color: 'var(--text-main)',
    letterSpacing: '1px'
  },
  badge: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    color: 'var(--neon-blue)',
    border: '1px solid rgba(0, 240, 255, 0.3)',
    padding: '6px 12px',
    borderRadius: '4px', // Squarer edges for a terminal look
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: "'JetBrains Mono', monospace",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 0 10px rgba(0, 240, 255, 0.1) inset'
  },
  main: {
    flex: 1,
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    position: 'relative' // Keeps it above the fixed background grid
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    borderTop: '1px solid var(--border)',
    color: 'var(--text-muted)',
    fontSize: '12px',
    fontFamily: "'JetBrains Mono', monospace",
    backgroundColor: 'rgba(7, 9, 15, 0.95)',
    letterSpacing: '0.5px'
  }
};