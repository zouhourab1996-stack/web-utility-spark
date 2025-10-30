import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";

const PlanetBuilder = () => {
  const [resources, setResources] = useState(0);
  const [perClick, setPerClick] = useState(1);
  const [perSecond, setPerSecond] = useState(0);
  const [buildings, setBuildings] = useState({
    collector: 0,
    factory: 0,
    city: 0
  });

  useEffect(() => {
    if (perSecond > 0) {
      const timer = setInterval(() => {
        setResources(r => r + perSecond);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [perSecond]);

  const gather = () => {
    setResources(r => r + perClick);
  };

  const buyCollector = () => {
    const cost = (buildings.collector + 1) * 15;
    if (resources >= cost) {
      setResources(r => r - cost);
      setBuildings(b => ({ ...b, collector: b.collector + 1 }));
      setPerSecond(s => s + 1);
    }
  };

  const buyFactory = () => {
    const cost = (buildings.factory + 1) * 100;
    if (resources >= cost) {
      setResources(r => r - cost);
      setBuildings(b => ({ ...b, factory: b.factory + 1 }));
      setPerSecond(s => s + 5);
    }
  };

  const buyCity = () => {
    const cost = (buildings.city + 1) * 500;
    if (resources >= cost) {
      setResources(r => r - cost);
      setBuildings(b => ({ ...b, city: b.city + 1 }));
      setPerSecond(s => s + 20);
    }
  };

  return (
    <GameLayout
      title="Planet Builder"
      description="Click to gather resources and build your planet!"
      keywords={["building game", "clicker", "idle", "planet"]}
      difficulty="easy"
      category="clicker"
      gameId="planet-builder"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-2">🌍 {Math.floor(resources)}</h2>
          <p className="text-xl text-muted-foreground">{perSecond} resources/sec</p>
        </div>

        <button
          onClick={gather}
          className="w-48 h-48 text-9xl hover:scale-110 transition-transform active:scale-95"
        >
          🌍
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">🏭 Collector</h3>
            <p className="text-sm mb-2">+1/sec</p>
            <p className="text-sm mb-3">Built: {buildings.collector}</p>
            <Button onClick={buyCollector} className="w-full">
              Build ({(buildings.collector + 1) * 15})
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">🏗️ Factory</h3>
            <p className="text-sm mb-2">+5/sec</p>
            <p className="text-sm mb-3">Built: {buildings.factory}</p>
            <Button onClick={buyFactory} className="w-full">
              Build ({(buildings.factory + 1) * 100})
            </Button>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2">🏙️ City</h3>
            <p className="text-sm mb-2">+20/sec</p>
            <p className="text-sm mb-3">Built: {buildings.city}</p>
            <Button onClick={buyCity} className="w-full">
              Build ({(buildings.city + 1) * 500})
            </Button>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default PlanetBuilder;
