import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const patterns = [
  { sequence: [2, 4, 6, 8], next: 10, rule: "Add 2" },
  { sequence: [3, 6, 9, 12], next: 15, rule: "Add 3" },
  { sequence: [5, 10, 15, 20], next: 25, rule: "Add 5" },
  { sequence: [1, 2, 4, 8], next: 16, rule: "Multiply by 2" },
  { sequence: [1, 3, 9, 27], next: 81, rule: "Multiply by 3" }
];

const PatternFinder = () => {
  const [current, setCurrent] = useState(patterns[0]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  const checkAnswer = () => {
    if (parseInt(answer) === current.next) {
      const points = 10 + streak * 5;
      setScore(s => s + points);
      setStreak(s => s + 1);
      toast({ title: "Correct!", description: `+${points} points! Streak: ${streak + 1}` });
      nextPattern();
    } else {
      setStreak(0);
      toast({ title: "Wrong!", description: `The answer was ${current.next}`, variant: "destructive" });
    }
    setAnswer("");
  };

  const nextPattern = () => {
    setCurrent(patterns[Math.floor(Math.random() * patterns.length)]);
  };

  return (
    <GameLayout
      title="Pattern Finder"
      description="Find and continue the pattern in the sequence."
      keywords={["pattern recognition", "logic game", "brain teaser"]}
      difficulty="hard"
      category="puzzle"
      gameId="pattern-finder"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Score: {score}</h2>
          <p className="text-lg">Streak: {streak} 🔥</p>
        </div>

        <div className="p-8 bg-secondary rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-4">What comes next?</p>
          <div className="flex gap-4 justify-center text-4xl font-bold mb-4">
            {current.sequence.map((num, i) => (
              <span key={i} className="w-16">{num}</span>
            ))}
            <span className="w-16">?</span>
          </div>
        </div>

        <div className="flex gap-2 w-full max-w-md">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
            placeholder="Your answer..."
            className="flex-1 px-4 py-2 text-lg rounded border bg-background"
          />
          <Button onClick={checkAnswer}>Submit</Button>
        </div>

        <Button onClick={nextPattern} variant="outline">Skip</Button>
      </div>
    </GameLayout>
  );
};

export default PatternFinder;
