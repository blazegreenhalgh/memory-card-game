import React from "react";

function Card({ card, onClick }) {
  return (
    <button
      className="aspect-3/4 flex-1 cursor-pointer items-center justify-center rounded-sm bg-white px-4 py-4 text-center text-black duration-200 hover:-translate-y-1 hover:bg-gray-200"
      onClick={() => onClick(card)}
    >
      {card}
    </button>
  );
}

export default Card;
