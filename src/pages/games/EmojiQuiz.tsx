import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const puzzles = [
  { emoji: "🌟⚔️", answer: "Star Wars", hint: "Sci-fi movie series" },
  { emoji: "🦁👑", answer: "Lion King", hint: "Disney animated film" },
  { emoji: "⚡👓", answer: "Harry Potter", hint: "Wizard boy" },
  { emoji: "🕷️👨", answer: "Spider-Man", hint: "Marvel superhero" },
  { emoji: "🧊👸", answer: "Frozen", hint: "Let it go..." }
];

const EmojiQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const checkAnswer = () => {
    if (answer.toLowerCase().replace(/\s/g, "") === puzzles[current].answer.toLowerCase().replace(/\s/g, "")) {
      setScore(s => s + 10);
      toast({ title: "Correct!", description: "+10 points" });
    } else {
      toast({ title: "Wrong!", description: `It was ${puzzles[current].answer}`, variant: "destructive" });
    }

    if (current < puzzles.length - 1) {
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
      title="Emoji Quiz"
      description="Guess the movie, phrase, or object from emojis!"
      keywords={["emoji quiz", "guessing game", "visual quiz", "emoji"]}
      difficulty="medium"
      category="quiz"
      gameId="emoji-quiz"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        {!showResult ? (
          <>
            <p className="text-xl">Score: {score} | {current + 1}/{puzzles.length}</p>
            
            <div className="w-full max-w-md p-12 bg-secondary rounded-lg text-center">
              <p className="text-8xl mb-6">{puzzles[current].emoji}</p>
              <p className="text-sm text-muted-foreground mb-6">Hint: {puzzles[current].hint}</p>
              
              <div className="flex gap-2">
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Your guess..."
                  className="text-lg"
                />
                <Button onClick={checkAnswer}>Submit</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl mb-8">Score: {score}/{puzzles.length * 10}</p>
            <Button onClick={restart} size="lg">Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default EmojiQuiz;
