import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import EndScreen from "./EndScreen";

function Game({ selectedDeck, rounds, setPlaying, highscore, setHighscore }) {
  const [score, setScore] = useState(0);
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
    setScore((prev) => prev + 1);
  };

  useEffect(() => {
    if (selectedCards.length === displayedCards.length) {
      setResult("won");
    }
  }, [selectedCards]);

  useEffect(() => {
    if (score > highscore) {
      setHighscore(score);
    }
  }, [score]);

  const handleCardClick = (card: any) => {
    shuffleCards(deck);
    selectCard(card);
  };

  return (
    <>
      <div className="game-stats flex gap-4 mb-4 justify-center">
        <h1>
          Round: {selectedCards.length} / {rounds}
        </h1>
        <h2>Score: {score}</h2>
      </div>
      <div className="flex flex-row gap-1">
        {displayedCards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
      <div className="fixed bottom-4 items-center flex flex-col">
        <h2>Selected Cards:</h2>
        <div className="flex gap-1">
          {selectedCards.map((card) => (
            <div className="bg-white px-4 py-2 text-black cursor-pointer">
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
    </>
  );
}

export default Game;
