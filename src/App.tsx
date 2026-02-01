import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import EndScreen from "./components/EndScreen";

function App() {
  const [deck, setDeck] = useState([1, 2, 3, 4, 5, 6]);
  const [displayedCards, setDisplayedCards] = useState(Array(4).fill(null));
  const [selectedCards, setSelectedCards] = useState([]);
  let [result, setResult] = useState("");

  const shuffleCards = (deck: any[]) => {
    const shuffledCards: any[] = [];
    while (shuffledCards.length !== displayedCards.length) {
      const index = Math.floor(Math.random() * deck.length);
      if (!shuffledCards.includes(deck[index])) {
        shuffledCards.push(deck[index]);
      }
    }
    setDisplayedCards(shuffledCards);
  };
  useEffect(() => {
    shuffleCards(deck);
  }, []);

  const selectCard = (card: any) => {
    const newSelectedCards = Array.from(selectedCards);
    if (newSelectedCards.includes(card)) {
      setResult("lost");

      return;
    }
    newSelectedCards.push(card);
    setSelectedCards(newSelectedCards);
  };

  const handleCardClick = (card: any) => {
    shuffleCards(deck);
    selectCard(card);
  };

  return (
    <>
      {result === "lost" && <EndScreen result={result} />}
      {result === "won" && <EndScreen result={result} />}
      <h1>Card amount: {displayedCards.length}</h1>
      <div className="flex flex-row gap-1">
        {displayedCards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
      <h2>Selected Cards:</h2>
      <div className="flex flex-row gap-1">
        {selectedCards.map((card) => (
          <div className="bg-white px-4 py-2 text-black cursor-pointer">
            {card}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
