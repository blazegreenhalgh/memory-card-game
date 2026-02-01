import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-fit cursor-pointer rounded-xl bg-blue-500 px-12 py-2 hover:bg-blue-600"
    >
      {children}
    </button>
  );
}

export default Button;
