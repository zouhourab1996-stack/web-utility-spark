import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameLayout from "@/components/GameLayout";

const answers = [
  "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely",
  "You may rely on it", "As I see it, yes", "Most likely", "Outlook good",
  "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later",
  "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
  "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good",
  "Very doubtful"
];

const Magic8Ball = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const shake = () => {
    if (!question.trim()) return;
    
    setShaking(true);
    setAnswer(null);
    
    setTimeout(() => {
      setAnswer(answers[Math.floor(Math.random() * answers.length)]);
      setShaking(false);
    }, 1500);
  };

  return (
    <GameLayout
      title="Magic 8-Ball"
      description="Ask a yes/no question and get a mystical answer!"
      keywords={["magic 8 ball", "fortune", "questions", "answers"]}
      difficulty="easy"
      category="casual"
      gameId="magic-8ball"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && shake()}
          placeholder="Ask a yes/no question..."
          className="max-w-md text-lg"
        />

        <div className={`relative ${shaking ? "animate-bounce" : ""}`}>
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center shadow-2xl">
            <div className="w-32 h-32 rounded-full bg-purple-900 flex items-center justify-center">
              {answer && !shaking && (
                <p className="text-white text-center text-sm font-bold px-4">{answer}</p>
              )}
              {!answer && !shaking && (
                <p className="text-6xl">8</p>
              )}
              {shaking && (
                <p className="text-4xl animate-spin">🔮</p>
              )}
            </div>
          </div>
        </div>

        <Button onClick={shake} disabled={!question.trim() || shaking} size="lg">
          {shaking ? "Thinking..." : "Shake the 8-Ball"}
        </Button>

        {answer && !shaking && (
          <p className="text-sm text-muted-foreground text-center max-w-md">
            The Magic 8-Ball has spoken! Ask another question if you dare...
          </p>
        )}
      </div>
    </GameLayout>
  );
};

export default Magic8Ball;
