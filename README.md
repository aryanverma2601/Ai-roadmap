# ProjectPath AI

ProjectPath AI is a full-stack web application that generates detailed, step-by-step project roadmaps for any idea using advanced AI. The backend leverages GroqCloud's LLM via the `groq-sdk`, while the frontend provides a clean, modern user experience.

---

## Live Demo

- **Frontend:** [https://project-path-ai-ngxp.vercel.app/](https://project-path-ai-ngxp.vercel.app/)
- **Backend API:** [https://projectpath-ai.onrender.com](https://projectpath-ai.onrender.com)

---

## Features

- **AI-Powered Roadmaps:** Instantly generate actionable project plans for any idea.
- **Modern UI:** Responsive, intuitive frontend built with React and Vite.
- **Seamless Integration:** Fast, reliable backend using Express and GroqCloud LLM.
- **Open Source:** Easily customizable and extensible for your needs.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS (optional)
- **Backend:** Node.js, Express, [groq-sdk](https://www.npmjs.com/package/groq-sdk)
- **AI:** [GroqCloud LLM](https://groq.com/)
- **Deployment:** Vercel (frontend), Render (backend)

---

## Project Structure

```
.
├── backend/
│   ├── index.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    ├── public/
    ├── index.html
    ├── package.json
    └── ...
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

---

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd <repo-folder>
```

---

### 2. Backend Setup

```sh
cd backend
npm install
npm install --save groq-sdk
```

Create a `.env` file in the `backend/` directory:

```
GROQ_API_KEY=<your-api-key-here>
```

Start the backend server locally:

```sh
npm run dev
```

> The backend runs at [http://localhost:5000](http://localhost:5000) by default.

---

### 3. Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

> The frontend runs at [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

1. Open the [live frontend](https://project-path-ai-ngxp.vercel.app/) or your local frontend.
2. Enter any project idea (e.g., "Build a personal finance app").
3. Click **Generate Roadmap** to receive a detailed, step-by-step plan powered by AI.

---

## API Endpoint

The frontend communicates with the backend API at:

```
https://projectpath-ai.onrender.com/api/generate-roadmap
```

For local development, update the API endpoint in your frontend code (e.g., `App.jsx`) to:

```
http://localhost:5000/api/generate-roadmap
```

---

## Environment Variables

The backend requires a GroqCloud API key. Set it in your `.env` file:

```
GROQ_API_KEY=<your-api-key-here>
```

---

## Deployment

- **Frontend:** Deploy to [Vercel](https://vercel.com/)
- **Backend:** Deploy to [Render](https://render.com/)

---

## Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [GroqCloud](https://groq.com/)
- [groq-sdk](https://www.npmjs.com/package/groq-sdk)
