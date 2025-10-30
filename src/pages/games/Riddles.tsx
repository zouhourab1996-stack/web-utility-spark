import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const riddles = [
  { q: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", a: "echo", hint: "Sound reflection" },
  { q: "The more you take, the more you leave behind. What am I?", a: "footsteps", hint: "Walking leaves these" },
  { q: "What has keys but no locks, space but no room, and you can enter but can't go inside?", a: "keyboard", hint: "Computer device" },
  { q: "I'm tall when I'm young, and I'm short when I'm old. What am I?", a: "candle", hint: "Burns down" },
  { q: "What has hands but cannot clap?", a: "clock", hint: "Tells time" }
];

const Riddles = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  const checkAnswer = () => {
    if (answer.toLowerCase().replace(/\s/g, "") === riddles[current].a.toLowerCase()) {
      const points = showHint ? 5 : 10;
      setScore(s => s + points);
      toast({ title: "Correct!", description: `+${points} points` });
    } else {
      toast({ title: "Wrong!", description: `Answer: ${riddles[current].a}`, variant: "destructive" });
    }

    if (current < riddles.length - 1) {
      setCurrent(c => c + 1);
      setAnswer("");
      setShowHint(false);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setAnswer("");
    setShowResult(false);
    setShowHint(false);
  };

  return (
    <GameLayout
      title="Brain Riddles"
      description="Solve tricky riddles and brain teasers."
      keywords={["riddles", "brain teasers", "logic puzzles", "thinking"]}
      difficulty="hard"
      category="quiz"
      gameId="riddles"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | {current + 1}/{riddles.length}</p>
            
            <div className="w-full max-w-2xl p-8 bg-secondary rounded-lg">
              <h3 className="text-xl mb-6 leading-relaxed">{riddles[current].q}</h3>
              
              {showHint && (
                <p className="text-sm text-muted-foreground mb-4 italic">
                  Hint: {riddles[current].hint}
                </p>
              )}

              <div className="flex gap-2 mb-4">
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Your answer..."
                  className="text-lg"
                />
                <Button onClick={checkAnswer}>Submit</Button>
              </div>

              {!showHint && (
                <Button onClick={() => setShowHint(true)} variant="outline" size="sm">
                  Show Hint (-5 points)
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Complete!</h2>
            <p className="text-3xl mb-8">Score: {score}</p>
            <Button onClick={restart} size="lg">Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default Riddles;
