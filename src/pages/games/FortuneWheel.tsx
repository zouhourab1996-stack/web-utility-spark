import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";

const prizes = [
  "🎁 Prize 1", "💎 Jackpot", "🍀 Lucky", "⭐ Star", 
  "🎯 Bonus", "🎊 Party", "🏆 Winner", "🎨 Art"
];

const FortuneWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    setSpinning(true);
    setResult(null);
    
    const spins = 5 + Math.random() * 3;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);
    
    setTimeout(() => {
      const index = Math.floor((finalRotation % 360) / (360 / prizes.length));
      setResult(prizes[index]);
      setSpinning(false);
    }, 3000);
  };

  return (
    <GameLayout
      title="Fortune Wheel"
      description="Spin the wheel of fortune and see what you get!"
      keywords={["wheel", "fortune", "spinning", "random"]}
      difficulty="easy"
      category="casual"
      gameId="fortune-wheel"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div
          className="w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-6xl transition-transform duration-3000 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          🎡
        </div>

        {result && !spinning && (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">You won:</h2>
            <p className="text-5xl">{result}</p>
          </div>
        )}

        <Button onClick={spin} disabled={spinning} size="lg">
          {spinning ? "Spinning..." : "Spin the Wheel"}
        </Button>
      </div>
    </GameLayout>
  );
};

export default FortuneWheel;
