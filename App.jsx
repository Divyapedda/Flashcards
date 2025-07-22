 import React, { useState, useEffect } from "react";
import { Questions } from "./Questions";
import Flashcard from "./Flashcard";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("all");

  useEffect(() => {
    const filtered = Questions.filter(
      (q) =>
        (selectedLevel === "all" || q.level === selectedLevel) &&
        (selectedTheme === "all" || q.theme === selectedTheme)
    );
    setShuffledQuestions(shuffleArray(filtered));
    setIndex(0);
    setScore(0);
  }, [selectedLevel, selectedTheme]);

  const handleNext = () => {
    if (index < shuffledQuestions.length - 1) {
      setIndex(index + 1);
    } else {
      alert("No more riddles! Try restarting.");
    }
  };

  const handleFlip = () => {
    setScore((prev) => prev + 1);
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleArray(Questions));
    setIndex(0);
    setScore(0);
  };

  const currentCard = shuffledQuestions[index];

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "50px",
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h1>Flip & Giggle😂🎉</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Level: </label>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Theme: </label>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          <option value="all">All</option>
          <option value="funny">Funny</option>
          <option value="animal">Animal</option>
          <option value="tech">Tech</option>
          <option value="wordplay">Wordplay</option>
          <option value="general">General</option>
        </select>
      </div>

      <h2>Riddle {index + 1} of {shuffledQuestions.length}</h2>
      <h3>Score: {score}</h3>

      {currentCard ? (
        <Flashcard card={currentCard} onFlip={handleFlip} />
      ) : (
        <p>No riddles found for selected filters.</p>
      )}

      <button onClick={handleNext} style={buttonStyle}>Next Riddle</button>
      <br />
      <button
        onClick={handleRestart}
        style={{ ...buttonStyle, backgroundColor: "#ffaaa5" }}
      >
        Restart
      </button>
    </div>
  );
}

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: "#ffde59",
  border: "none",
};
