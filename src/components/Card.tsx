import React from "react";

function Card({ card, onClick }) {
  return (
    <button
      className="aspect-3/4 min-w-[100px] flex-1 cursor-pointer items-center justify-center rounded-sm bg-white px-4 py-4 text-center text-black hover:bg-gray-200"
      onClick={(e) => onClick(card)}
    >
      {card}
    </button>
  );
}

export default Card;
