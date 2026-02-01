import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  const decks = {
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  };

  const settings = {
    selectedDeck: decks.numbers,
  };

  return (
    <>
      <Game selectedDeck={settings.selectedDeck} />
    </>
  );
}
export default App;
