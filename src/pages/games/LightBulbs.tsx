import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, LightbulbOff } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const LightBulbs = () => {
  const [lights, setLights] = useState<boolean[]>(Array(9).fill(false));
  const [moves, setMoves] = useState(0);
  const { toast } = useToast();

  const toggleLight = (index: number) => {
    const newLights = [...lights];
    newLights[index] = !newLights[index];
    
    if (index % 3 > 0) newLights[index - 1] = !newLights[index - 1];
    if (index % 3 < 2) newLights[index + 1] = !newLights[index + 1];
    if (index > 2) newLights[index - 3] = !newLights[index - 3];
    if (index < 6) newLights[index + 3] = !newLights[index + 3];
    
    setLights(newLights);
    setMoves(m => m + 1);

    if (newLights.every(l => l)) {
      toast({ title: "You Won!", description: `Solved in ${moves + 1} moves!` });
    }
  };

  const reset = () => {
    setLights(Array(9).fill(false));
    setMoves(0);
  };

  return (
    <GameLayout
      title="Light Bulbs"
      description="Turn on all the bulbs, but they affect each other!"
      keywords={["logic puzzle", "brain teaser", "light puzzle"]}
      difficulty="hard"
      category="puzzle"
      gameId="light-bulbs"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <p className="text-xl">Moves: {moves}</p>

        <div className="grid grid-cols-3 gap-4 p-8 bg-secondary rounded-lg">
          {lights.map((on, i) => (
            <button
              key={i}
              onClick={() => toggleLight(i)}
              className={`w-20 h-20 rounded-lg flex items-center justify-center transition-all ${
                on ? "bg-yellow-500 shadow-lg shadow-yellow-500/50" : "bg-gray-700"
              }`}
            >
              {on ? <Lightbulb className="w-10 h-10" /> : <LightbulbOff className="w-10 h-10" />}
            </button>
          ))}
        </div>

        <Button onClick={reset} variant="outline">Reset</Button>
        <p className="text-sm text-muted-foreground max-w-md text-center">
          Click a bulb to toggle it and its neighbors. Turn all bulbs ON to win!
        </p>
      </div>
    </GameLayout>
  );
};

export default LightBulbs;
