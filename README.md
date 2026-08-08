# 🧠 Neural Interface Evaluation Platform

> **An AI-powered technical interviewer and candidate evaluation engine built for the ABTALKS AI Cohort.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TailwindCSS-00F0FF?style=flat&logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-009688?style=flat&logo=fastapi)
![LangChain](https://img.shields.io/badge/AI Engine-LangChain%20%7C%20Mistral%20AI-A855F7?style=flat)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20%2B%20Render-black?style=flat)

---

## 📌 Overview

The **Neural Interface Evaluation Platform** is a full-stack, AI-driven assessment tool that simulates a multi-turn, adaptive technical interview. Powered by **Mistral AI** via **LangChain**, the platform evaluates candidates against a 31-day AI Cohort curriculum, testing architectural reasoning, technical depth, and problem-solving capabilities in real-time.

At the end of each session, the engine generates a structured evaluation scorecard detailing overall performance scores, hiring verdicts, key technical strengths, signal gaps, and actionable next steps.

---

## ✨ Key Features

* **🤖 Adaptive AI Lead Interviewer:** Evaluates candidates through progressive question escalation (Warmup → Deep-dive → System Architecture).
* **🎯 Curriculum-Aligned (31-Day Roadmap):** Dynamically tracks and probes candidate knowledge across specific curriculum modules.
* **📊 Real-Time Evaluation Scorecards:** Automatically parses interview transcripts to produce structured hiring verdicts, overall scores, strengths, and signal gaps.
* **🎙️ Integrated Voice Synthesis (TTS):** Real-time text-to-speech feedback using the browser's Web Speech API with automatic overlap cancellation.
* **🚨 Early Termination Failsafe:** Allows candidates or evaluators to end sessions on demand while still generating a comprehensive evaluation report.
* **🎨 Cyberpunk / "Neural" UI Aesthetics:** Feature-rich interface featuring smooth text gradient flows, entry animations, responsive layouts, and Dark/Light theme toggles.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS (v4), Custom Keyframe Animations
* **Icons:** Lucide React
* **Speech Synthesis:** Native Web Speech API (`SpeechSynthesisUtterance`)

### Backend
* **Framework:** FastAPI (Python 3.10+)
* **Server:** Uvicorn
* **AI Framework:** LangChain (`langchain-mistralai`, `langchain-core`)
* **LLM Model:** Mistral AI (`ChatMistralAI`)
* **Data Validation:** Pydantic

### Infrastructure & Deployment
* **Frontend Hosting:** Vercel
* **Backend Hosting:** Render
* **Version Control:** Git & GitHub

---

## 🏗️ System Architecture