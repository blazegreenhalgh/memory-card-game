import { useState, useEffect, useMemo } from "react";
import "./App.css";
import Game from "./components/Game";
import Button from "./components/Button";

function App() {
  const difficulties = {
    easy: 4,
    medium: 8,
    hard: 12,
  };
  const [playing, setPlaying] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState("cats");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [decks, setDecks] = useState({
    cats: [],
    "Cute Cats": [],
  });

  useEffect(() => {
    async function getGifs() {
      const apiKey = "SRXwB3dfb5dsPEpgX28wsgr08oUwzV4F";
      const apiRoot = "https://api.giphy.com/v1/gifs/search";

      const terms = Object.keys(decks);
      const fetches = terms.map((term) =>
        fetch(`${apiRoot}?q=${term}&limit=20&api_key=${apiKey}`),
      );
      const responses = await Promise.all(fetches);
      const jsonPromises = responses.map((response) => response.json());
      const results = await Promise.all(jsonPromises);
      console.log(results);

      const newDecks = Object.fromEntries(
        terms.map((term, index) => [
          term,
          results[index].data.map((gif) => gif.images.preview_gif.url),
        ]),
      );
      setDecks(newDecks);
    }
    getGifs();
  }, []);

  return (
    <main className="px-gutter flex w-full max-w-lg flex-col items-center justify-center gap-4">
      {!playing && <Button onClick={() => setPlaying(true)}>Play</Button>}
      {!playing && (
        <>
          <div className="options flex gap-4">
            {Object.keys(decks).map((key) => (
              <label key={key} className="flex gap-1">
                <input
                  type="radio"
                  name="deck"
                  value={key}
                  checked={selectedDeck === key}
                  onChange={() => {
                    setSelectedDeck(key);
                  }}
                />
                {key[0].toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
          <div className="options flex gap-2">
            {Object.keys(difficulties).map((opt) => (
              <label key={opt} className="cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  value={opt}
                  checked={selectedDifficulty === opt}
                  onChange={(e) => setSelectedDifficulty(opt)}
                  className="peer sr-only"
                />

                <span className="inline-flex items-center justify-center rounded-md border border-white/30 px-4 py-2 text-sm transition peer-checked:bg-white peer-checked:text-black hover:bg-gray-100 hover:text-black">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
      {playing && (
        <Game
          selectedDeck={decks[selectedDeck]}
          rounds={difficulties[selectedDifficulty]}
          setPlaying={setPlaying}
        />
      )}
    </main>
  );
}
export default App;
