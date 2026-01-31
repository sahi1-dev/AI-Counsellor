# AI Counsellor – Study Abroad 🎓

This project is an AI-powered study abroad counsellor built as part of the Humanity Founders Hackathon.

The idea was simple:  
Students planning to study abroad often feel confused about profiles, universities, and application steps.  
This app tries to solve that by guiding them step by step using an AI counsellor.

---

## 🔗 Live Project
- *Live App:* https://ai-counsellor-9pu6.onrender.com  
- *Demo Video:* (Add Loom link here)

---

## 💡 What does this project do?
The AI counsellor guides a student through a *structured journey*, instead of random chat.

The flow is divided into clear stages:
1. Understanding the student’s academic profile  
2. Discovering suitable universities  
3. Locking one final university  
4. Showing an application checklist (SOP, LORs, exams, etc.)

This keeps the conversation focused and practical.

---

## ✨ Key Highlights
- Mandatory onboarding before chat starts  
- Stage-based counselling flow  
- University shortlisting (Dream / Target / Safe)  
- Application readiness checklist  
- Real AI responses powered by Groq LLM  
- Manual stage control for demo stability

---

## 🛠 Tech Stack
- *Frontend:* React (Vite) + Tailwind CSS  
- *Backend:* Node.js + Express  
- *AI:* Groq (LLaMA 3.1 model)  
- *Deployment:* Render

---

## 🧠 Why manual stage control?
During a live demo, AI-controlled state transitions can sometimes behave unpredictably.

To ensure a smooth and reliable demo experience, stage changes are controlled manually.  
This keeps the focus on *logic, flow, and AI quality* rather than edge-case failures.

---

## ⚙️ Environment Setup
Create a .env file inside the backend folder:

```env
GROQ_API_KEY=your_groq_api_key_here
