# FlashMind

FlashMind is an AI-powered study platform designed to help students learn more effectively through flashcards, multiple-choice quizzes, and true-or-false assessments. Users can create study decks manually, upload PDFs for AI processing, or generate structured learning materials using AI.

It also includes an AI study assistant chatbot that explains concepts, answers questions, and helps simplify complex topics in real time.

Built with Firebase for authentication and data storage, Gemini AI for content generation, and optional Cloudinary integration for file and PDF management.

---

## ✨ Features

### 📚 Learning System
- Create and manage flashcard decks
- Multiple-choice quizzes for active recall practice
- True or False assessments for quick testing
- Structured review system for better retention

### 🤖 AI-Powered Tools
- Generate flashcards from prompts or notes
- Upload PDFs and extract key ideas automatically
- AI-generated quiz questions (MCQ & T/F)
- Study assistant chatbot for explanations and tutoring

### 📂 Content Management
- Manual deck creation and editing
- PDF upload and processing
- Organized per-user deck storage
- Save and reuse generated study materials

### 🔐 Authentication
- Firebase email/password authentication
- Email verification support
- Secure user-based data access

---

## 🧠 AI Workflow

1. User uploads text or PDF
2. Content is cleaned and processed
3. Gemini AI generates:
   - Flashcards (Q&A format)
   - Quiz questions (MCQ / True-False)
4. Data is stored in Firebase for future review

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend / BaaS:** Firebase (Auth, Firestore, Storage)  
- **AI Engine:** Google Gemini API  
- **File Handling (optional):** Cloudinary  
- **Deployment:** Vercel / Firebase Hosting  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/flashmind.git
cd flashmind