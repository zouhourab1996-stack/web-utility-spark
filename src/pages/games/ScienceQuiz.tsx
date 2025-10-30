import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const questions = [
  { q: "What is the chemical symbol for water?", a: ["H2O", "O2", "CO2", "H2"], correct: 0 },
  { q: "What planet is closest to the Sun?", a: ["Mercury", "Venus", "Earth", "Mars"], correct: 0 },
  { q: "What is the speed of light?", a: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"], correct: 0 },
  { q: "What gas do plants absorb from the atmosphere?", a: ["CO2", "O2", "N2", "H2"], correct: 0 },
  { q: "How many bones are in the human body?", a: ["206", "180", "250", "300"], correct: 0 }
];

const ScienceQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const answer = (index: number) => {
    if (index === questions[current].correct) {
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
      title="Science Quiz"
      description="Answer questions about science, nature, and physics."
      keywords={["science quiz", "physics", "biology", "chemistry"]}
      difficulty="hard"
      category="quiz"
      gameId="science-quiz"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | {current + 1}/{questions.length}</p>
            
            <div className="w-full max-w-2xl p-8 bg-secondary rounded-lg">
              <h3 className="text-2xl font-bold mb-6">{questions[current].q}</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {questions[current].a.map((opt, i) => (
                  <Button key={i} onClick={() => answer(i)} size="lg" variant="outline">
                    {opt}
                  </Button>
                ))}
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

export default ScienceQuiz;
