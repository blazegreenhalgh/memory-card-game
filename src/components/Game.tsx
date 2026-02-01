import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import EndScreen from "./EndScreen";

function Game({ selectedDeck, rounds, setPlaying }) {
  const deck = selectedDeck.slice(0, Math.floor(rounds * 1.5));
  const [displayedCards, setDisplayedCards] = useState(
    Array(rounds).fill(null),
  );
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

  useEffect(() => {
    if (selectedCards.length === displayedCards.length) {
      setResult("won");
    }
  }, [selectedCards]);

  const handleCardClick = (card: any) => {
    shuffleCards(deck);
    selectCard(card);
  };

  return (
    <div className="game w-full items-center">
      <div className="game-stats mb-4 flex justify-center gap-4">
        <h1>
          Round: {selectedCards.length} / {rounds}
        </h1>
      </div>
      <div className="cards-wrapper mx-auto flex h-fit w-full max-w-lg flex-row flex-wrap items-center justify-start gap-1">
        {displayedCards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
      <div className="fixed bottom-4 flex flex-col items-center">
        <h2>Selected Cards:</h2>
        <div className="flex gap-1">
          {selectedCards.map((card) => (
            <div className="cursor-pointer bg-white px-4 py-2 text-black">
              {card}
            </div>
          ))}
        </div>
      </div>
      {result === "lost" && (
        <EndScreen result={result} setPlaying={setPlaying} />
      )}
      {result === "won" && (
        <EndScreen result={result} setPlaying={setPlaying} />
      )}
    </div>
  );
}

export default Game;
