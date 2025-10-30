import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const questions = [
  { q: "The Earth is flat", a: false },
  { q: "Water boils at 100°C at sea level", a: true },
  { q: "Humans can breathe underwater", a: false },
  { q: "The sun rises in the east", a: true },
  { q: "Penguins can fly", a: false },
  { q: "A week has 7 days", a: true }
];

const TrueFalse = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const answer = (isTrue: boolean) => {
    if (isTrue === questions[current].a) {
      setScore(s => s + 10);
      toast({ title: "Correct!", description: "+10 points" });
    } else {
      toast({ title: "Wrong!", variant: "destructive" });
    }

    if (current < questions.length - 1) {
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
      title="True or False"
      description="Quick true or false questions on various topics."
      keywords={["true false", "quiz", "quick quiz", "facts"]}
      difficulty="easy"
      category="quiz"
      gameId="true-false"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | {current + 1}/{questions.length}</p>
            
            <div className="w-full max-w-2xl p-12 bg-secondary rounded-lg text-center">
              <h3 className="text-3xl font-bold mb-12">{questions[current].q}</h3>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={() => answer(true)} size="lg" className="w-40 h-20 text-xl">
                  <Check className="w-6 h-6 mr-2" />
                  TRUE
                </Button>
                <Button onClick={() => answer(false)} size="lg" variant="destructive" className="w-40 h-20 text-xl">
                  <X className="w-6 h-6 mr-2" />
                  FALSE
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl mb-8">Score: {score}/{questions.length * 10}</p>
            <Button onClick={restart} size="lg">Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default TrueFalse;
