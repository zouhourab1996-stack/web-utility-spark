import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";

const DiceRoller = () => {
  const [dice, setDice] = useState<number[]>([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [numDice, setNumDice] = useState(2);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setDice(Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1));
      setRolling(false);
    }, 500);
  };

  const getDiceEmoji = (num: number) => {
    const emojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return emojis[num - 1];
  };

  const total = dice.reduce((a, b) => a + b, 0);

  return (
    <GameLayout
      title="Dice Roller"
      description="Roll dice for games, decisions, or fun!"
      keywords={["dice", "random", "rolling", "game"]}
      difficulty="easy"
      category="casual"
      gameId="dice-roller"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(n => (
            <Button
              key={n}
              onClick={() => setNumDice(n)}
              variant={numDice === n ? "default" : "outline"}
            >
              {n} {n === 1 ? "Die" : "Dice"}
            </Button>
          ))}
        </div>

        <div className={`flex gap-4 ${rolling ? "animate-bounce" : ""}`}>
          {dice.map((d, i) => (
            <div key={i} className="text-9xl">
              {getDiceEmoji(d)}
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold">Total: {total}</h2>
        </div>

        <Button onClick={roll} disabled={rolling} size="lg">
          {rolling ? "Rolling..." : "Roll Dice"}
        </Button>
      </div>
    </GameLayout>
  );
};

export default DiceRoller;
