import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./flashcards.css";

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load flashcards JSON (works on both localhost and GitHub Pages)
  useEffect(() => {
    const base =
      import.meta.env.MODE === "development"
        ? "/flashcards.json"
        : "https://cityofsmiles.github.io/multiplying-monomials-flashcards/flashcards.json";

    fetch(base)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setFlashcards(shuffled);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (value) =>
    setAnswers({ ...answers, [currentIndex]: value });

  // --- Normalization for fair checking ---
  const normalize = (expr) => {
    return expr
      .replace(/\s+/g, "")
      .replace(/\*\*/g, "^")
      .replace(/\*/g, "")
      .replace(/\(([^)]+)\)/g, "$1");
  };

  const checkAnswer = (userInput, correct) =>
    normalize(userInput) === normalize(correct);

  const nextCard = () =>
    setCurrentIndex((prev) =>
      prev === flashcards.length - 1 ? prev : prev + 1
    );

  const prevCard = () =>
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));

  const restart = () => {
    const base =
      import.meta.env.MODE === "development"
        ? "/flashcards.json"
        : "https://cityofsmiles.github.io/multiplying-monomials-flashcards/flashcards.json";

    fetch(base)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setFlashcards(shuffled);
        setCurrentIndex(0);
        setAnswers({});
        setShowResults(false);
      });
  };

  if (loading) return <p>Loading flashcards...</p>;

  if (showResults) {
    const score = flashcards.filter((card, i) =>
      checkAnswer(answers[i] || "", card.answer)
    ).length;

    return (
      <div className="answer-key-screen">
        <h1 className="score">
          Score: {score}/{flashcards.length}
        </h1>
        <h3 style={{ marginBottom: "1rem", color: "#555" }}>Answer Key</h3>

        <div className="answer-key">
          {flashcards.map((card, i) => {
            const correct = checkAnswer(answers[i] || "", card.answer);
            return (
              <div key={i} className="answer-item">
                <p>
                  <strong>Q{i + 1}:</strong> {card.question} <br />
                  Your Answer: {answers[i] || "(none)"}{" "}
                  <span className={correct ? "correct" : "incorrect"}>
                    {correct ? "✓" : "✗"}
                  </span>
                  <br />
                  Correct Answer: {card.answer}
                </p>
              </div>
            );
          })}
        </div>

        <div className="button-group">
          <button className="btn-primary" onClick={restart}>
            Try Another Set
          </button>
          <button className="btn-submit" onClick={() => setShowResults(false)}>
            Back to Cards
          </button>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flashcards-container">
      <h1>Multiplying Monomials Flashcards</h1>
      <h3 style={{ fontWeight: "normal", marginBottom: "1rem" }}>
        by Jonathan R. Bacolod, LPT
      </h3>
      <h2>
        Flashcard {currentIndex + 1} of {flashcards.length}
      </h2>
      <div className="flashcard-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flashcard"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentCard.question}
          </motion.div>
        </AnimatePresence>
      </div>
      <input
        type="text"
        className="input-answer"
        placeholder="Your answer"
        value={answers[currentIndex] || ""}
        onChange={(e) => handleAnswer(e.target.value)}
      />
      <div className="button-group">
        <button className="btn-primary" onClick={prevCard}>
          Previous
        </button>
        <button className="btn-primary" onClick={nextCard}>
          Next
        </button>
        <button className="btn-submit" onClick={() => setShowResults(true)}>
          Submit
        </button>
      </div>
    </div>
  );
}