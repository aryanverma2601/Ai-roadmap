import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const generateRoadmap = async () => {
    setLoading(true);
    setRoadmap([]);
    try {
      const response = await fetch(
        "https://projectpath-ai.onrender.com/api/generate-roadmap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic }),
        }
      );

      const data = await response.json();
      setRoadmap(data);
      setLoading(false);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  //   fetch()	Talks to the server
  // "http://localhost:3000/generate-roadmap"	Where you're sending the request
  // method: "POST"	You're sending data
  // headers	You're sending JSON
  // body: JSON.stringify({ topic })	This is the data you're sending
  // await	Wait for the server to respond

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">🧠 ProjectPath AI</h1>
        <p className="app-subtitle">
          Generate a step-by-step roadmap to complete any project idea
        </p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your project idea (e.g., Chat App using MERN)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-field"
          />
          <button onClick={generateRoadmap} className="generate-button">
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </div>

        {roadmap.length > 0 && (
          <div className="roadmap-container">
            {roadmap.map((step, index) => (
              <div key={step.id || index} className="roadmap-card">
                <h3 className="roadmap-title">
                  {step.id}. {step.title}
                </h3>
                <p className="roadmap-description">{step.description}</p>
                <p className="roadmap-time">⏱️ {step.estimated_time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
