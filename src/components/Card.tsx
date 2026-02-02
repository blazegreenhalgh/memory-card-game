import React from "react";

function Card({ card, onClick }) {
  return (
    <button
      className="aspect-3/4 flex-1 cursor-pointer items-center justify-center rounded-sm border border-white/10 bg-white/10 bg-cover bg-center px-4 py-4 text-center text-white backdrop-blur-md duration-200 hover:-translate-y-1 hover:bg-white/30"
      style={{
        backgroundImage: `url(${card})`,
      }}
      onClick={() => onClick(card)}
    ></button>
  );
}

export default Card;
