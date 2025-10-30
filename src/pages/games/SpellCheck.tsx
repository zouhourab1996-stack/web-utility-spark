import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const words = [
  { correct: "Beautiful", options: ["Beautiful", "Beautifull", "Beutiful", "Beatiful"] },
  { correct: "Necessary", options: ["Necessary", "Neccessary", "Neccesary", "Necesary"] },
  { correct: "Accommodate", options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"] },
  { correct: "Definitely", options: ["Definitely", "Definately", "Definitly", "Definetly"] },
  { correct: "Separate", options: ["Separate", "Seperate", "Separete", "Seprate"] }
];

const SpellCheck = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const answer = (selected: string) => {
    if (selected === words[current].correct) {
      setScore(s => s + 10);
      toast({ title: "Correct!", description: "+10 points" });
    } else {
      toast({ title: "Wrong!", description: `Correct: ${words[current].correct}`, variant: "destructive" });
    }

    if (current < words.length - 1) {
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
      title="Spell Check"
      description="Find the correctly spelled word from the options."
      keywords={["spelling", "vocabulary", "word quiz", "language"]}
      difficulty="medium"
      category="quiz"
      gameId="spell-check"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | {current + 1}/{words.length}</p>
            
            <div className="w-full max-w-2xl p-8 bg-secondary rounded-lg text-center">
              <p className="text-lg text-muted-foreground mb-4">Which spelling is correct?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {words[current].options.map((opt, i) => (
                  <Button key={i} onClick={() => answer(opt)} size="lg" variant="outline" className="text-xl">
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl mb-8">Score: {score}/{words.length * 10}</p>
            <Button onClick={restart} size="lg">Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default SpellCheck;
