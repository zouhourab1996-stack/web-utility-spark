import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const countries = [
  { flag: "🇺🇸", name: "United States", options: ["United States", "Canada", "Mexico", "Brazil"] },
  { flag: "🇫🇷", name: "France", options: ["France", "Italy", "Spain", "Germany"] },
  { flag: "🇯🇵", name: "Japan", options: ["Japan", "China", "South Korea", "Thailand"] },
  { flag: "🇦🇺", name: "Australia", options: ["Australia", "New Zealand", "Fiji", "Samoa"] },
  { flag: "🇮🇹", name: "Italy", options: ["Italy", "Mexico", "Ireland", "Hungary"] }
];

const FlagQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const answer = (selected: string) => {
    if (selected === countries[current].name) {
      setScore(s => s + 10);
      toast({ title: "Correct!", description: "+10 points" });
    } else {
      toast({ title: "Wrong!", description: `It was ${countries[current].name}`, variant: "destructive" });
    }

    if (current < countries.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <GameLayout
      title="Flag Quiz"
      description="Can you identify countries by their flags?"
      keywords={["flag quiz", "geography", "countries", "world"]}
      difficulty="medium"
      category="quiz"
      gameId="flag-quiz"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | {current + 1}/{countries.length}</p>
            
            <div className="text-center p-12 bg-secondary rounded-lg">
              <p className="text-9xl mb-8">{countries[current].flag}</p>
              <p className="text-xl text-muted-foreground">Which country?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {countries[current].options.map((opt, i) => (
                <Button key={i} onClick={() => answer(opt)} size="lg" variant="outline">
                  {opt}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl mb-8">Score: {score}/{countries.length * 10}</p>
            <Button onClick={restart} size="lg">Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default FlagQuiz;
