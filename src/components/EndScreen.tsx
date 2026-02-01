import React from "react";

function EndScreen({ result }) {
  let classes: string = "";
  let title: string = "";
  if (result === "lost") {
    classes = "bg-red-500";
    title = "YOU LOST!";
  }
  if (result === "won") {
    classes = "bg-green-500";
    title = "YOU WIN!";
  }
  return (
    <div
      className={`fixed inset-0 self-center justify-self-center w-1/2 h-1/2 ${classes}`}
    >
      {title}
    </div>
  );
}

export default EndScreen;
