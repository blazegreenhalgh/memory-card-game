import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import Button from "./components/Button";

function App() {
  const decks = {
    cats: [],
  };
  const difficulties = {
    easy: 4,
    medium: 8,
    hard: 12,
  };
  const [playing, setPlaying] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState("numbers");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [gifs, setGifs] = useState();

  useEffect(() => {
    async function getGifs() {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const apiRoot = "https://api.giphy.com/v1/gifs/search";
      const res = await fetch(`${apiRoot}?q=cats&limit=20&api_key=${apiKey}`);
      const result = await res.json();
      setGifs(result.data);
    }
    getGifs();
    (gifs ?? []).forEach((gif, index) => {
      decks.cats.push(gif.images.preview_gif.url);
      console.log(gifs);
    });
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
