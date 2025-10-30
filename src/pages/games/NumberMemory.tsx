import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const NumberMemory = () => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const startLevel = () => {
    const digits = Array.from({ length: level + 2 }, () => Math.floor(Math.random() * 10)).join("");
    setSequence(digits);
    setUserInput("");
    setIsShowing(true);
    setIsPlaying(true);

    setTimeout(() => setIsShowing(false), (level + 2) * 1000);
  };

  const checkAnswer = () => {
    if (userInput === sequence) {
      setLevel(l => l + 1);
      toast({ title: "Correct!", description: `Level ${level + 1}` });
      setTimeout(startLevel, 1000);
    } else {
      setIsPlaying(false);
      toast({ title: "Wrong!", description: `Made it to level ${level}`, variant: "destructive" });
    }
    setUserInput("");
  };

  return (
    <GameLayout
      title="Number Memory"
      description="Remember and type back the sequence of numbers."
      keywords={["number memory", "sequence memory", "digits", "recall"]}
      difficulty="hard"
      category="memory"
      gameId="number-memory"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <h2 className="text-3xl font-bold">Level: {level}</h2>

        {!isPlaying ? (
          <Button onClick={startLevel} size="lg">Start Test</Button>
        ) : isShowing ? (
          <div className="p-12 bg-secondary rounded-lg">
            <p className="text-6xl font-mono font-bold tracking-wider">{sequence}</p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <p className="text-center mb-4">What was the number?</p>
            <div className="flex gap-2">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Type the sequence..."
                className="text-2xl font-mono text-center"
                autoFocus
              />
              <Button onClick={checkAnswer}>✓</Button>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default NumberMemory;
