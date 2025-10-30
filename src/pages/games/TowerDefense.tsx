import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const TowerDefense = () => {
  const [gold, setGold] = useState(100);
  const [towers, setTowers] = useState<{ x: number; y: number }[]>([]);
  const [wave, setWave] = useState(1);
  const [lives, setLives] = useState(10);
  const { toast } = useToast();

  const placeTower = (x: number, y: number) => {
    if (gold < 50) {
      toast({ title: "Not enough gold!", variant: "destructive" });
      return;
    }
    
    const exists = towers.some(t => t.x === x && t.y === y);
    if (exists) return;
    
    setTowers([...towers, { x, y }]);
    setGold(g => g - 50);
    toast({ title: "Tower placed!" });
  };

  const startWave = () => {
    setGold(g => g + wave * 20);
    setWave(w => w + 1);
    toast({ title: `Wave ${wave} complete!`, description: `+${wave * 20} gold` });
  };

  const reset = () => {
    setGold(100);
    setTowers([]);
    setWave(1);
    setLives(10);
  };

  return (
    <GameLayout
      title="Mini Tower Defense"
      description="Place towers strategically to stop the invaders!"
      keywords={["tower defense", "strategy", "placement", "defense"]}
      difficulty="hard"
      category="strategy"
      gameId="tower-defense"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Gold</p>
            <p className="text-2xl font-bold">💰 {gold}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wave</p>
            <p className="text-2xl font-bold">⚔️ {wave}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lives</p>
            <p className="text-2xl font-bold">❤️ {lives}</p>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1 bg-secondary p-2 rounded-lg">
          {Array.from({ length: 36 }, (_, i) => {
            const x = i % 6;
            const y = Math.floor(i / 6);
            const hasTower = towers.some(t => t.x === x && t.y === y);
            
            return (
              <button
                key={i}
                onClick={() => placeTower(x, y)}
                className={`w-16 h-16 rounded ${
                  hasTower ? "bg-primary text-4xl" : "bg-background hover:bg-primary/20"
                }`}
              >
                {hasTower ? "🗼" : ""}
              </button>
            );
          })}
        </div>

        <div className="flex gap-4">
          <Button onClick={startWave}>Start Wave {wave}</Button>
          <Button onClick={reset} variant="outline">Reset</Button>
        </div>

        <p className="text-sm text-muted-foreground">Towers cost 50 gold</p>
      </div>
    </GameLayout>
  );
};

export default TowerDefense;
