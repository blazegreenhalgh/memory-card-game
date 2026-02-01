import React from "react";
import Button from "./Button";

function EndScreen({ result, setPlaying }) {
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
      className={`fixed inset-0 self-center justify-self-center w-1/2 h-1/2 rounded-2xl p-4 flex flex-col text-center gap-4 justify-center ${classes}`}
    >
      {title}
      <Button
        onClick={() => {
          setPlaying((prev) => !prev);
        }}
      >
        Home
      </Button>
    </div>
  );
}

export default EndScreen;
