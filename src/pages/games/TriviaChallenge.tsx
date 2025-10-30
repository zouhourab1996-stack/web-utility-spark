import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const questions = [
  { q: "What is the capital of France?", a: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
  { q: "Which planet is known as the Red Planet?", a: ["Mars", "Venus", "Jupiter", "Saturn"], correct: 0 },
  { q: "Who painted the Mona Lisa?", a: ["Da Vinci", "Picasso", "Van Gogh", "Michelangelo"], correct: 0 },
  { q: "What is 2+2?", a: ["4", "5", "3", "6"], correct: 0 },
  { q: "Largest ocean on Earth?", a: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: 0 }
];

const TriviaChallenge = () => {
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
      title="Trivia Challenge"
      description="Test your general knowledge with random trivia questions."
      keywords={["trivia", "quiz", "knowledge test", "questions"]}
      difficulty="medium"
      category="quiz"
      gameId="trivia-challenge"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | Question {current + 1}/{questions.length}</p>
            
            <div className="w-full max-w-2xl p-8 bg-secondary rounded-lg">
              <h3 className="text-2xl font-bold mb-6">{questions[current].q}</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {questions[current].a.map((opt, i) => (
                  <Button key={i} onClick={() => answer(i)} size="lg" variant="outline" className="text-lg">
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl mb-8">Final Score: {score}</p>
            <Button onClick={restart} size="lg">Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default TriviaChallenge;
