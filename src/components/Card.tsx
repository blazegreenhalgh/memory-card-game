import React from "react";

function Card({ card, onClick }) {
  return (
    <button
      className="bg-white px-4 py-2 text-black cursor-pointer"
      onClick={(e) => onClick(card)}
    >
      {card}
    </button>
  );
}

export default Card;
