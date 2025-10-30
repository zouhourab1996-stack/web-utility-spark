import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const words = [
  { word: "react", scrambled: "tecar", hint: "JavaScript library" },
  { word: "computer", scrambled: "remupotc", hint: "Electronic device" },
  { word: "puzzle", scrambled: "lezupz", hint: "Brain teaser" },
  { word: "javascript", scrambled: "aavjcsirpt", hint: "Programming language" },
  { word: "internet", scrambled: "neerintt", hint: "World wide web" },
  { word: "keyboard", scrambled: "ykaobdre", hint: "Typing device" },
  { word: "algorithm", scrambled: "lhigamrot", hint: "Problem solving method" },
  { word: "database", scrambled: "basaated", hint: "Data storage" }
];

const WordScramble = () => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
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
      toast({ title: "Time's up!", description: `Final Score: ${score}` });
    }
  }, [time, score, toast]);

  const startGame = () => {
    setScore(0);
    setTime(60);
    setIsPlaying(true);
    setGuess("");
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  };

  const checkAnswer = () => {
    if (guess.toLowerCase() === currentWord.word) {
      setScore(s => s + 10);
      toast({ title: "Correct!", description: "+10 points" });
      setGuess("");
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    } else {
      toast({ title: "Wrong!", description: "Try again", variant: "destructive" });
    }
  };

  return (
    <GameLayout
      title="Word Scramble"
      description="Unscramble letters to form words. Race against time."
      keywords={["word game", "anagram", "vocabulary", "brain game"]}
      difficulty="medium"
      category="puzzle"
      gameId="word-scramble"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Score: {score}</h2>
          <p className="text-xl">Time: {time}s</p>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Game</Button>
        ) : (
          <>
            <div className="text-center p-8 bg-secondary rounded-lg w-full max-w-md">
              <p className="text-sm text-muted-foreground mb-2">Unscramble:</p>
              <h3 className="text-5xl font-bold tracking-widest mb-4">{currentWord.scrambled}</h3>
              <p className="text-sm italic">Hint: {currentWord.hint}</p>
            </div>

            <div className="flex gap-2 w-full max-w-md">
              <Input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Type your answer..."
                className="text-lg"
              />
              <Button onClick={checkAnswer}>Submit</Button>
            </div>
          </>
        )}
      </div>
    </GameLayout>
  );
};

export default WordScramble;
