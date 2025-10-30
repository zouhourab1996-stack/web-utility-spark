import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const questions = [
  { q: "In which year did World War II end?", a: ["1945", "1944", "1946", "1943"], correct: 0 },
  { q: "Who was the first president of the USA?", a: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], correct: 0 },
  { q: "When did the Berlin Wall fall?", a: ["1989", "1990", "1988", "1991"], correct: 0 },
  { q: "Who discovered America?", a: ["Christopher Columbus", "Vasco da Gama", "Marco Polo", "Ferdinand Magellan"], correct: 0 }
];

const HistoryQuiz = () => {
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
      title="History Quiz"
      description="Test your knowledge of historical events and figures."
      keywords={["history quiz", "historical facts", "timeline", "events"]}
      difficulty="hard"
      category="quiz"
      gameId="history-quiz"
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

export default HistoryQuiz;
