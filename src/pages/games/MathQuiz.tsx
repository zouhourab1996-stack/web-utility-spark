import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const MathQuiz = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [op, setOp] = useState("+");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPlaying || time <= 0) return;
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, time]);

  useEffect(() => {
    if (time === 0) {
      setIsPlaying(false);
      toast({ title: "Time's Up!", description: `Final Score: ${score}` });
    }
  }, [time, score, toast]);

  const generateProblem = () => {
    const ops = ["+", "-", "×"];
    const newOp = ops[Math.floor(Math.random() * ops.length)];
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
    setOp(newOp);
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTime(60);
    setIsPlaying(true);
    generateProblem();
  };

  const checkAnswer = () => {
    let correct = 0;
    if (op === "+") correct = num1 + num2;
    if (op === "-") correct = num1 - num2;
    if (op === "×") correct = num1 * num2;

    if (parseInt(answer) === correct) {
      const points = 5 + streak;
      setScore(s => s + points);
      setStreak(s => s + 1);
      toast({ title: "Correct!", description: `+${points} points` });
      generateProblem();
    } else {
      setStreak(0);
      toast({ title: "Wrong!", description: `Answer: ${correct}`, variant: "destructive" });
    }
    setAnswer("");
  };

  return (
    <GameLayout
      title="Math Quiz"
      description="Solve math problems quickly and improve your skills."
      keywords={["math quiz", "arithmetic", "calculation", "numbers"]}
      difficulty="medium"
      category="quiz"
      gameId="math-quiz"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Score</p>
            <p className="text-3xl font-bold">{score}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="text-3xl font-bold">{time}s</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Streak</p>
            <p className="text-3xl font-bold">{streak}🔥</p>
          </div>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Quiz</Button>
        ) : (
          <>
            <div className="p-12 bg-secondary rounded-lg text-center">
              <p className="text-6xl font-bold">
                {num1} {op} {num2} = ?
              </p>
            </div>

            <div className="flex gap-2 w-full max-w-md">
              <Input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Answer..."
                className="text-2xl text-center"
                autoFocus
              />
              <Button onClick={checkAnswer} size="lg">✓</Button>
            </div>
          </>
        )}
      </div>
    </GameLayout>
  );
};

export default MathQuiz;
