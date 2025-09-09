# 🩺 WellDoc

## 🌐 Overview

**WellDoc** is an **AI-driven Risk Prediction Engine** that forecasts whether a chronic care patient is at risk of deterioration in the next 90 days.  

Chronic conditions such as **diabetes, obesity, and heart failure** require continuous monitoring and proactive care. Despite access to vitals, labs, and adherence data, predicting patient deterioration remains a challenge.  

WellDoc empowers clinicians with **explainable, actionable, and reliable AI predictions** to intervene earlier, improve health outcomes, and reduce hospitalization risks.

---

## ✨ Features

- **AI Risk Prediction**  
  Forecasts patient deterioration risk using vitals, lab results, medication adherence, and lifestyle logs.

- **Explainable AI (XAI)**  
  Uses SHAP/LIME to explain *why* a patient is at high risk in a clinician-friendly manner.

- **Actionable Dashboards**  
  Risk scores, graphs, and factor contributions presented in a clear and usable interface.

- **React + Vite Frontend**  
  Modern, fast, and minimal setup with Hot Module Replacement (HMR).

- **Custom Uploads**  
  - 📑 [PowerPoint](#)  
  - 🎥 [Watch Demo Video](#)  
  

---

## 📊 Problem Statement

Chronic conditions require long-term monitoring, yet clinicians struggle to predict when patients may deteriorate.  
By leveraging **AI models** trained on patient health data, WellDoc provides:  

- Early warnings for at-risk patients  
- Transparency in predictions through explainability  
- Decision support tools to improve proactive care  

---

## 🚀 Getting Started

### 1️⃣ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/WellDoc.git
cd WellDoc

Install dependencies:
npm install

Run Development Server
npm run dev

Visit: http://localhost:5173

Build for Production
npm run build
npm run preview
```
Tech Stack

Frontend: React + Vite

Backend (AI models): Sklearn,numpy, pandas, matplotlib

Explainability: SHAP / LIME

Visualization: Chart.js / Recharts

Deployment: Vercel / Netlify (Frontend), Flask/FastAPI (Backend)

Project Structure
```
WellDoc/
│── src/
│   ├── components/    # UI components (charts, tables, alerts)
│   ├── pages/         # Application pages (Dashboard, Patient Profile, etc.)
│   ├── services/      # API calls to backend ML models
│   └── assets/        # Icons, images, static assets
│
│── public/            # Public static files
│── package.json       # Dependencies & scripts
│── vite.config.js     # Vite configuration
│── README.md          # Project documentation
```
