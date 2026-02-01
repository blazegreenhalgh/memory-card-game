import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import Button from "./components/Button";

function App() {
  const [playing, setPlaying] = useState(false);
  const [highscore, setHighscore] = useState(0);

  const decks = {
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "("],
  };

  const settings = {
    selectedDeck: decks.numbers,
    roundCount: 5,
  };

  return (
    <>
      {!playing && <Button onClick={() => setPlaying(true)}>Play</Button>}
      <h2>Highscore: {highscore}</h2>
      {playing && (
        <Game
          selectedDeck={settings.selectedDeck}
          rounds={settings.roundCount}
          setPlaying={setPlaying}
          highscore={highscore}
          setHighscore={setHighscore}
        />
      )}
    </>
  );
}
export default App;
