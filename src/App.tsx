import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6]);
  const [displayedCards, setDisplayedCards] = useState(Array(4).fill(null));

  const shuffleCards = (cards) => {
    const shuffledCards = [];
    while (shuffledCards.length !== displayedCards.length) {
      const index = Math.floor(Math.random() * cards.length);
      if (!shuffledCards.includes(cards[index])) {
        shuffledCards.push(cards[index]);
      }
    }
    setDisplayedCards(shuffledCards);
  };

  useEffect(() => {
    shuffleCards(cards);
  }, []);
  return (
    <>
      <h1>Card amount: {displayedCards.length}</h1>
      {displayedCards.map((card) => (
        <button
          className="bg-white px-4 py-2 text-black cursor-pointer"
          onClick={() => shuffleCards(cards)}
        >
          {card}
        </button>
      ))}
    </>
  );
}

export default App;
