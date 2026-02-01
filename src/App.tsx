import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import Button from "./components/Button";

function App() {
  const [playing, setPlaying] = useState(false);

  const decks = {
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "("],
  };
  const [selectedDeck, setSelectedDeck] = useState(decks["numbers"]);
  const [roundCount, setRoundCount] = useState(5);

  return (
    <main className="flex flex-col justify-center items-center">
      {!playing && <Button onClick={() => setPlaying(true)}>Play</Button>}

      {!playing && (
        <div className="flex gap-4">
          {Object.keys(decks).map((key) => (
            <label className="flex gap-1">
              <input
                type="radio"
                name="deck"
                value={key}
                onChange={() => {
                  setSelectedDeck(decks[key]);
                }}
              />
              {key[0].toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      )}

      {playing && (
        <Game
          selectedDeck={selectedDeck}
          rounds={roundCount}
          setPlaying={setPlaying}
        />
      )}
    </main>
  );
}
export default App;
