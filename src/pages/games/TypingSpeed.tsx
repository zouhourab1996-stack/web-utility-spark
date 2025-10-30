import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";

const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "TypeScript makes JavaScript development better",
  "Practice makes perfect in typing speed",
  "React is a popular JavaScript library",
  "Gaming improves hand-eye coordination"
];

const TypingSpeed = () => {
  const [text, setText] = useState(sentences[0]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleInput = (value: string) => {
    if (!isRunning && value.length > 0) setIsRunning(true);
    setInput(value);

    if (value === text) {
      setIsRunning(false);
      const words = text.split(" ").length;
      const minutes = time / 60;
      setWpm(Math.round(words / minutes));
    }
  };

  const restart = () => {
    setText(sentences[Math.floor(Math.random() * sentences.length)]);
    setInput("");
    setTime(0);
    setIsRunning(false);
    setWpm(0);
  };

  return (
    <GameLayout
      title="Typing Speed Race"
      description="Type the words as fast as you can. Improve your WPM!"
      keywords={["typing test", "WPM", "keyboard game", "speed typing"]}
      difficulty="medium"
      category="arcade"
      gameId="typing-speed"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="text-3xl font-bold">{time}s</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">WPM</p>
            <p className="text-3xl font-bold">{wpm || "-"}</p>
          </div>
        </div>

        <div className="w-full max-w-2xl p-6 bg-secondary rounded-lg">
          <p className="text-xl mb-4 font-mono">{text}</p>
          <Input
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Start typing..."
            className="text-lg font-mono"
            disabled={wpm > 0}
          />
        </div>

        <Button onClick={restart} size="lg">New Text</Button>
      </div>
    </GameLayout>
  );
};

export default TypingSpeed;
