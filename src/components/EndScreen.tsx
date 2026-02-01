import Button from "./Button";

function EndScreen({ result, setPlaying }) {
  let classes: string = "";
  let title: string = "";
  if (result === "lost") {
    classes = "bg-red-500/50 border-red-700";
    title = "YOU LOST!";
  }
  if (result === "won") {
    classes = "bg-green-500/50 border-green-700";
    title = "YOU WIN!";
  }
  return (
    <div
      className={`fixed inset-0 flex h-screen w-screen justify-center bg-black/50 backdrop-blur-md`}
    >
      <div
        className={`flex h-full w-full max-w-lg flex-col items-center justify-center gap-4 self-center justify-self-center rounded-2xl border p-4 text-center backdrop-blur-3xl md:h-1/2 md:w-full ${classes}`}
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
    </div>
  );
}

export default EndScreen;
