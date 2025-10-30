import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";

const BubbleClicker = () => {
  const [bubbles, setBubbles] = useState(0);
  const [perClick, setPerClick] = useState(1);
  const [perSecond, setPerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState({
    wand: 0,
    machine: 0,
    factory: 0
  });

  useEffect(() => {
    if (perSecond > 0) {
      const timer = setInterval(() => {
        setBubbles(b => b + perSecond);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [perSecond]);

  const pop = () => {
    setBubbles(b => b + perClick);
  };

  const buyWand = () => {
    const cost = (upgrades.wand + 1) * 10;
    if (bubbles >= cost) {
      setBubbles(b => b - cost);
      setUpgrades(u => ({ ...u, wand: u.wand + 1 }));
      setPerClick(c => c + 1);
    }
  };

  const buyMachine = () => {
    const cost = (upgrades.machine + 1) * 50;
    if (bubbles >= cost) {
      setBubbles(b => b - cost);
      setUpgrades(u => ({ ...u, machine: u.machine + 1 }));
      setPerSecond(s => s + 2);
    }
  };

  const buyFactory = () => {
    const cost = (upgrades.factory + 1) * 250;
    if (bubbles >= cost) {
      setBubbles(b => b - cost);
      setUpgrades(u => ({ ...u, factory: u.factory + 1 }));
      setPerSecond(s => s + 10);
    }
  };

  return (
    <GameLayout
      title="Bubble Pop Clicker"
      description="Pop bubbles endlessly and watch your score soar!"
      keywords={["bubble game", "popping", "clicker", "satisfying"]}
      difficulty="easy"
      category="clicker"
      gameId="bubble-clicker"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-2">🫧 {Math.floor(bubbles)}</h2>
          <p className="text-xl text-muted-foreground">{perSecond}/sec</p>
        </div>

        <button
          onClick={pop}
          className="w-48 h-48 text-9xl hover:scale-110 transition-transform active:scale-95"
        >
          🫧
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">🪄 Bubble Wand</h3>
            <p className="text-sm mb-2">+1 per click</p>
            <p className="text-sm mb-3">Owned: {upgrades.wand}</p>
            <Button onClick={buyWand} className="w-full">
              Buy ({(upgrades.wand + 1) * 10} 🫧)
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">⚙️ Bubble Machine</h3>
            <p className="text-sm mb-2">+2 per second</p>
            <p className="text-sm mb-3">Owned: {upgrades.machine}</p>
            <Button onClick={buyMachine} className="w-full">
              Buy ({(upgrades.machine + 1) * 50} 🫧)
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">🏭 Bubble Factory</h3>
            <p className="text-sm mb-2">+10 per second</p>
            <p className="text-sm mb-3">Owned: {upgrades.factory}</p>
            <Button onClick={buyFactory} className="w-full">
              Buy ({(upgrades.factory + 1) * 250} 🫧)
            </Button>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default BubbleClicker;
