import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";

const GemMiner = () => {
  const [gems, setGems] = useState(0);
  const [perClick, setPerClick] = useState(1);
  const [perSecond, setPerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState({
    pickaxe: 0,
    drill: 0,
    mine: 0
  });

  useEffect(() => {
    if (perSecond > 0) {
      const timer = setInterval(() => {
        setGems(g => g + perSecond);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [perSecond]);

  const mine = () => {
    setGems(g => g + perClick);
  };

  const buyPickaxe = () => {
    const cost = (upgrades.pickaxe + 1) * 10;
    if (gems >= cost) {
      setGems(g => g - cost);
      setUpgrades(u => ({ ...u, pickaxe: u.pickaxe + 1 }));
      setPerClick(c => c + 1);
    }
  };

  const buyDrill = () => {
    const cost = (upgrades.drill + 1) * 50;
    if (gems >= cost) {
      setGems(g => g - cost);
      setUpgrades(u => ({ ...u, drill: u.drill + 1 }));
      setPerSecond(s => s + 1);
    }
  };

  const buyMine = () => {
    const cost = (upgrades.mine + 1) * 200;
    if (gems >= cost) {
      setGems(g => g - cost);
      setUpgrades(u => ({ ...u, mine: u.mine + 1 }));
      setPerSecond(s => s + 5);
    }
  };

  return (
    <GameLayout
      title="Gem Miner"
      description="Click to mine gems and build your fortune!"
      keywords={["mining game", "clicker", "gems", "collecting"]}
      difficulty="easy"
      category="clicker"
      gameId="gem-miner"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-2">💎 {Math.floor(gems)}</h2>
          <p className="text-xl text-muted-foreground">{perSecond}/sec</p>
        </div>

        <button
          onClick={mine}
          className="w-48 h-48 text-9xl hover:scale-110 transition-transform active:scale-95"
        >
          💎
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">⛏️ Pickaxe</h3>
            <p className="text-sm mb-2">+1 per click</p>
            <p className="text-sm mb-3">Owned: {upgrades.pickaxe}</p>
            <Button onClick={buyPickaxe} className="w-full">
              Buy ({(upgrades.pickaxe + 1) * 10} 💎)
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">⚙️ Drill</h3>
            <p className="text-sm mb-2">+1 per second</p>
            <p className="text-sm mb-3">Owned: {upgrades.drill}</p>
            <Button onClick={buyDrill} className="w-full">
              Buy ({(upgrades.drill + 1) * 50} 💎)
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">⛰️ Mine</h3>
            <p className="text-sm mb-2">+5 per second</p>
            <p className="text-sm mb-3">Owned: {upgrades.mine}</p>
            <Button onClick={buyMine} className="w-full">
              Buy ({(upgrades.mine + 1) * 200} 💎)
            </Button>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default GemMiner;
