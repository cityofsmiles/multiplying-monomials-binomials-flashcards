# Multiplying Monomials and Binomials Flashcards

An interactive flashcards web app for practicing multiplication of monomials and binomials.  

**Author:** Jonathan R. Bacolod, LPT  

---

## ✨ Features
- **200 pre-generated flashcards** covering four algebraic cases:
  1. \((a)(bx^p \pm c)\)
  2. \((a)(bx^p \pm cy^q)\)
  3. \((ax^m)(bx^p \pm c)\)
  4. \((ax^m)(bx^p \pm cy^q)\)
- Python backend (Sympy) generates questions and simplifies answers → exported as `flashcards.json`.
- React frontend randomly selects 10 flashcards per session.
- Smooth animations via Framer Motion.
- User input checking with normalization (ignores spacing and `*`).
- Score report + full answer key at the end.

---

## 🛠 Tech Stack
- **Backend:** Python + Sympy (for math logic & flashcard generation)  
- **Frontend:** React + Vite + Framer Motion  
- **Deployment:** GitHub Pages  

---

## 📂 Project Structure