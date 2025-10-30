import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";

const TreeGrower = () => {
  const [water, setWater] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [perClick, setPerClick] = useState(1);
  const [perSecond, setPerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState({
    bucket: 0,
    sprinkler: 0,
    rainmaker: 0
  });

  useEffect(() => {
    if (perSecond > 0) {
      const timer = setInterval(() => {
        setWater(w => w + perSecond);
        setGrowth(g => Math.min(100, g + perSecond * 0.1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [perSecond]);

  const waterTree = () => {
    setWater(w => w + perClick);
    setGrowth(g => Math.min(100, g + 0.5));
  };

  const getTreeEmoji = () => {
    if (growth < 20) return "🌱";
    if (growth < 40) return "🌿";
    if (growth < 60) return "🌳";
    if (growth < 80) return "🌲";
    return "🌴";
  };

  const buyBucket = () => {
    const cost = (upgrades.bucket + 1) * 20;
    if (water >= cost) {
      setWater(w => w - cost);
      setUpgrades(u => ({ ...u, bucket: u.bucket + 1 }));
      setPerClick(c => c + 2);
    }
  };

  const buySprinkler = () => {
    const cost = (upgrades.sprinkler + 1) * 80;
    if (water >= cost) {
      setWater(w => w - cost);
      setUpgrades(u => ({ ...u, sprinkler: u.sprinkler + 1 }));
      setPerSecond(s => s + 1);
    }
  };

  const buyRainmaker = () => {
    const cost = (upgrades.rainmaker + 1) * 300;
    if (water >= cost) {
      setWater(w => w - cost);
      setUpgrades(u => ({ ...u, rainmaker: u.rainmaker + 1 }));
      setPerSecond(s => s + 5);
    }
  };

  return (
    <GameLayout
      title="Tree Grower"
      description="Nurture your tree from seed to mighty oak!"
      keywords={["growing game", "clicker", "nature", "idle"]}
      difficulty="easy"
      category="clicker"
      gameId="tree-grower"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-2">💧 {Math.floor(water)}</h2>
          <p className="text-xl text-muted-foreground">{perSecond}/sec</p>
          <p className="text-sm mt-2">Growth: {Math.floor(growth)}%</p>
        </div>

        <button
          onClick={waterTree}
          className="w-48 h-48 text-9xl hover:scale-110 transition-transform active:scale-95"
        >
          {getTreeEmoji()}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">🪣 Bucket</h3>
            <p className="text-sm mb-2">+2 per click</p>
            <p className="text-sm mb-3">Owned: {upgrades.bucket}</p>
            <Button onClick={buyBucket} className="w-full">
              Buy ({(upgrades.bucket + 1) * 20} 💧)
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">💦 Sprinkler</h3>
            <p className="text-sm mb-2">+1 per second</p>
            <p className="text-sm mb-3">Owned: {upgrades.sprinkler}</p>
            <Button onClick={buySprinkler} className="w-full">
              Buy ({(upgrades.sprinkler + 1) * 80} 💧)
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">🌧️ Rainmaker</h3>
            <p className="text-sm mb-2">+5 per second</p>
            <p className="text-sm mb-3">Owned: {upgrades.rainmaker}</p>
            <Button onClick={buyRainmaker} className="w-full">
              Buy ({(upgrades.rainmaker + 1) * 300} 💧)
            </Button>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default TreeGrower;
