import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [deck, setDeck] = useState([1, 2, 3, 4, 5, 6]);
  const [displayedCards, setDisplayedCards] = useState(Array(4).fill(null));
  const [selectedCards, setSelectedCards] = useState([]);

  const shuffleCards = (deck) => {
    const shuffledCards = [];
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

  const selectCard = (card) => {
    const newSelectedCards = Array.from(selectedCards);
    newSelectedCards.push(card);
    setSelectedCards(newSelectedCards);
  };

  const handleCardClick = (e, card, deck) => {
    shuffleCards(deck);
    selectCard(card);
  };

  return (
    <>
      <h1>Card amount: {displayedCards.length}</h1>
      {displayedCards.map((card) => (
        <button
          className="bg-white px-4 py-2 text-black cursor-pointer"
          onClick={(e) => handleCardClick(e, card, deck)}
        >
          {card}
        </button>
      ))}
      <h2>Selected Cards:</h2>
      {selectedCards.map((card) => (
        <div className="bg-white px-4 py-2 text-black cursor-pointer">
          {card}
        </div>
      ))}
    </>
  );
}

export default App;
