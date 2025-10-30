import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const capitals = [
  { country: "France", capital: "Paris" },
  { country: "Germany", capital: "Berlin" },
  { country: "Japan", capital: "Tokyo" },
  { country: "Australia", capital: "Canberra" },
  { country: "Canada", capital: "Ottawa" },
  { country: "Brazil", capital: "Brasilia" }
];

const CapitalQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const checkAnswer = () => {
    if (answer.toLowerCase() === capitals[current].capital.toLowerCase()) {
      setScore(s => s + 10);
      toast({ title: "Correct!", description: "+10 points" });
    } else {
      toast({ title: "Wrong!", description: `It was ${capitals[current].capital}`, variant: "destructive" });
    }

    if (current < capitals.length - 1) {
      setCurrent(c => c + 1);
      setAnswer("");
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setAnswer("");
    setShowResult(false);
  };

  return (
    <GameLayout
      title="Capital Cities Quiz"
      description="Name the capital cities of different countries."
      keywords={["capital quiz", "geography", "cities", "countries"]}
      difficulty="hard"
      category="quiz"
      gameId="capital-quiz"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | {current + 1}/{capitals.length}</p>
            
            <div className="w-full max-w-md p-8 bg-secondary rounded-lg text-center">
              <p className="text-lg text-muted-foreground mb-2">What is the capital of</p>
              <h3 className="text-4xl font-bold mb-6">{capitals[current].country}?</h3>
              
              <div className="flex gap-2">
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Type capital city..."
                  className="text-lg"
                />
                <Button onClick={checkAnswer}>Submit</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl mb-8">Score: {score}/{capitals.length * 10}</p>
            <Button onClick={restart} size="lg">Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default CapitalQuiz;
