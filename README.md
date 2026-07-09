# 🎙️ Voice-First Homework Helper (NextLeap Capstone)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://homework-helper-voice.vercel.app/)
[![Role](https://img.shields.io/badge/Role-Product_Manager-blue?style=for-the-badge)](https://linkedin.com/in/rahulbangle)

> **Context:** This project was developed as a Product Management Capstone for the **NextLeap PM Fellowship (Cohort 46)**. It explores how Agentic AI and Voice interfaces can solve educational accessibility for non-English medium parents in Tier 2/3 India.

## 📱 The Problem
For parents in Tier 2/3 cities who studied in vernacular mediums, helping their children with English-medium homework is a massive friction point. Text-based AI tutors (like standard ChatGPT) fail because the parents themselves face a language and typing barrier.

## 🎯 The Solution: Voice-First Native UI
Instead of a chat interface, I designed and prototyped a mobile-first, voice-centric AI application. The user speaks their query in their native language (e.g., Hindi/Telugu mixed with English), and the LLM agent processes the intent, solves the homework query, and responds via voice in an easy-to-understand format.

### Key Product Decisions:
1. **Zero-Typing Philosophy:** The primary CTA is a persistent mic button. Text input is secondary.
2. **LLM Persona:** Configured the agent to act as a "Co-teacher" rather than an encyclopedia, providing hints instead of just direct answers to encourage actual learning.
3. **Multilingual Processing:** Utilizing advanced Whisper/Speech-to-Text models capable of handling code-switching (Hinglish/Tanglish).

## 🛠️ The Prototype (What is built here)
This repository contains the functional React/Vite prototype used for initial user validation. 
* **Tech Stack:** React, Vite, Framer Motion (for smooth voice state animations).
* **State Management:** Custom hooks for managing voice recording states (idle, listening, processing, speaking).
* **UI/UX:** High-fidelity mobile layout optimized for single-handed use.

## 📊 Product Management Lifecycle Executed

### 1. User Research
Conducted 15+ primary user interviews with parents from non-English medium backgrounds. 
* *Key Insight:* The barrier was not knowledge; it was confidence in typing and framing the prompt in English. Voice bypassed this entirely.

### 2. PRD and Specs (Jobs to be Done)
* **JTBD:** "When my child brings home English homework, I want to quickly understand the concept in my own language, so I can confidently teach it to them without feeling inadequate."

### 3. Prototyping and Validation
Built this React prototype in 3 days to test the "Voice-First" thesis. 

---
*Built by [Rahul Bangle](https://github.com/rahul-bangle) - AI Product Manager*