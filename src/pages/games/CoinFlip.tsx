import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";

const CoinFlip = () => {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const flip = () => {
    setFlipping(true);
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "heads" : "tails";
      setResult(outcome);
      setStats(s => ({ ...s, [outcome]: s[outcome] + 1 }));
      setFlipping(false);
    }, 1000);
  };

  return (
    <GameLayout
      title="Coin Flip"
      description="Flip a coin and test your luck!"
      keywords={["coin flip", "random", "luck", "heads tails"]}
      difficulty="easy"
      category="casual"
      gameId="coin-flip"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <p className="text-xl mb-2">Heads: {stats.heads} | Tails: {stats.tails}</p>
        </div>

        <div className={`text-9xl ${flipping ? "animate-spin" : ""}`}>
          {result === "heads" ? "🪙" : result === "tails" ? "🌑" : "🪙"}
        </div>

        {result && !flipping && (
          <h2 className="text-4xl font-bold capitalize">{result}!</h2>
        )}

        <Button onClick={flip} disabled={flipping} size="lg">
          {flipping ? "Flipping..." : "Flip Coin"}
        </Button>
      </div>
    </GameLayout>
  );
};

export default CoinFlip;
