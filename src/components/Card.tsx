import React from "react";

function Card({ card, onClick }) {
  return (
    <button
      className="bg-white px-4 py-2 text-black cursor-pointer w-8 h-8 items-center justify-center text-center"
      onClick={(e) => onClick(card)}
    >
      {card}
    </button>
  );
}

export default Card;
