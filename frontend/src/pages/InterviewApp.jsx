import React, { useState } from 'react';
import ProfileSelector from '../components/ProfileSelector';
import CandidateManual from '../components/CandidateManual';
import InterviewHeader from '../components/InterviewHeader';
import ChatWindow from '../components/ChatWindow';
import InputBar from '../components/InputBar';
import EvaluationReport from '../components/EvaluationReport';

// Single, clean import for the data
import rawData from '../data/candidates.json';

// Adapter logic to flatten candidates.json for the UI components
const sampleCandidates = rawData.candidates.map((c) => ({
  id: c.member.id,
  name: c.member.name,
  track: c.member.jobRole,
  rawProfile: c, // Keeps the full original profile object to send to the backend spec
  completedDays: c.missions.filter((m) => m.passed).map((m) => m.day),
  focusTopics: c.missions.filter((m) => m.passed).map((m) => m.title)
}));

export default function InterviewApp() {
  const [stage, setStage] = useState('setup'); // 'setup' | 'manual' | 'active' | 'completed'
  const [candidate, setCandidate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [coveredDays, setCoveredDays] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [isAgentThinking, setIsAgentThinking] = useState(false);

  // Unique session tracker for the tech spec contract
  const [sessionId] = useState(() => 'sess-' + Math.random().toString(36).substring(2, 9));

  // Helper function defined first for speech synthesis
  const speakAgentResponse = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.9;
      utterance.rate = 1.05;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-Speech is not supported in this browser.");
    }
  };

  // Phase 1: Select Profile -> Move to Manual
  const handleProfileSelect = (selectedCandidate) => {
    setCandidate(selectedCandidate);
    setStage('manual');
  };

  // Phase 2: Acknowledge Manual -> Initialize Session via POST /api/interview
  const handleStartInterview = async () => {
    setStage('active');
    setIsAgentThinking(true);

    try {
      const response = await fetch('http://localhost:5000/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          candidate: candidate.rawProfile // Sends the raw candidate.json block per tech specs
        })
      });

      if (!response.ok) {
        throw new Error(`Backend Error: ${response.status}`);
      }

      const data = await response.json();
      setIsAgentThinking(false);

      setQuestionCount(1);
      setCoveredDays([candidate.completedDays[0] || 1]);
      setMessages([
        { sender: 'agent', text: data.reply, day: `Day ${candidate.completedDays[0] || 1}` }
      ]);

      speakAgentResponse(data.reply);

    } catch (err) {
      console.error('Initialization failed:', err);
      setIsAgentThinking(false);
      setMessages([
        { sender: 'agent', text: 'SYSTEM ERROR: Unable to initialize interview session.', day: 'ERROR' }
      ]);
    }
  };

  // Phase 3: Send Candidate Response via POST /api/interview
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: 'candidate', text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsAgentThinking(true);

    try {
      const response = await fetch('http://localhost:5000/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          message: text
        })
      });

      if (!response.ok) {
        throw new Error(`Backend Error: ${response.status}`);
      }

      const data = await response.json();

      setIsAgentThinking(false);
      
      // Append agent reply
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: data.reply, day: `Q${questionCount + 1}` }
      ]);
      setQuestionCount((prev) => prev + 1);

      speakAgentResponse(data.reply);

      // Tech Spec Compliance: If backend returns done: true, route to evaluation scorecard
      if (data.done) {
        setEvaluation(data.feedback);
        setStage('completed');
      }

    } catch (err) {
      console.error('Failed to communicate with AI Agent:', err);
      setIsAgentThinking(false);
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: 'SYSTEM ERROR: Unable to connect to AI core.', day: 'ERROR' }
      ]);
    }
  };

  // Phase 4: Termination Handler matching tech specs
  const handleEndInterview = async () => {
    const terminationText = "The interview has been terminated early. It is your choice.";
    speakAgentResponse(terminationText);
    
    // Send final message to backend to trigger 'done: true' and fetch feedback
    await handleSendMessage("I choose to terminate this interview early.");
  };

  return (
    <div className="app-layout" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>

      {stage === 'setup' && (
        <ProfileSelector
          candidates={sampleCandidates}
          onSelect={handleProfileSelect}
        />
      )}

      {stage === 'manual' && (
        <CandidateManual
          candidate={candidate}
          onAcknowledge={handleStartInterview}
        />
      )}

      {stage === 'active' && (
        <div className="interview-container animate-fade-in" style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <InterviewHeader
            candidate={candidate}
            questionCount={questionCount}
            coveredDays={coveredDays}
            onEnd={handleEndInterview}
          />
          <ChatWindow messages={messages} isThinking={isAgentThinking} />
          <InputBar onSend={handleSendMessage} disabled={isAgentThinking} />
        </div>
      )}

      {stage === 'completed' && evaluation && (
        <EvaluationReport
          candidate={candidate}
          report={evaluation}
          onRestart={() => setStage('setup')}
        />
      )}
    </div>
  );
}