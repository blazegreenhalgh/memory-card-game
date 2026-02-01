import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 w-full hover:bg-blue-600 px-12 py-2 rounded-xl cursor-pointer"
    >
      {children}
    </button>
  );
}

export default Button;
