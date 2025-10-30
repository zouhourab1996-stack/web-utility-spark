import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  cps: number; // Cookies per second
  owned: number;
}

const CookieClicker = () => {
  const [cookies, setCookies] = useState(0);
  const [totalCookies, setTotalCookies] = useState(0);
  const [cps, setCps] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { id: "cursor", name: "🖱️ Cursor", cost: 15, cps: 0.1, owned: 0 },
    { id: "grandma", name: "👵 Grandma", cost: 100, cps: 1, owned: 0 },
    { id: "farm", name: "🌾 Farm", cost: 500, cps: 8, owned: 0 },
    { id: "mine", name: "⛏️ Mine", cost: 3000, cps: 47, owned: 0 },
    { id: "factory", name: "🏭 Factory", cost: 10000, cps: 260, owned: 0 },
    { id: "bank", name: "🏦 Bank", cost: 40000, cps: 1400, owned: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cps > 0) {
        setCookies((prev) => prev + cps / 10);
        setTotalCookies((prev) => prev + cps / 10);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [cps]);

  const clickCookie = () => {
    setCookies((prev) => prev + 1);
    setTotalCookies((prev) => prev + 1);
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    if (cookies >= upgrade.cost) {
      setCookies((prev) => prev - upgrade.cost);
      setUpgrades((prev) =>
        prev.map((u) =>
          u.id === upgrade.id
            ? { ...u, owned: u.owned + 1, cost: Math.floor(u.cost * 1.15) }
            : u
        )
      );
      setCps((prev) => prev + upgrade.cps);
      toast.success(`Purchased ${upgrade.name}!`);
    } else {
      toast.error("Not enough cookies!");
    }
  };

  return (
    <GameLayout
      title="Cookie Clicker"
      description="Click the cookie to earn points and upgrades!"
      keywords={["clicker", "idle game", "clicking", "incremental", "cookie clicker"]}
      difficulty="easy"
      category="clicker"
      gameId="cookie-clicker"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cookie Section */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {Math.floor(cookies)} Cookies
              </div>
              <div className="text-xl text-muted-foreground">
                per second: {cps.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Total baked: {Math.floor(totalCookies)}
              </div>
            </div>

            <button
              onClick={clickCookie}
              className="mx-auto block text-9xl hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none"
            >
              🍪
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Click the cookie to bake more!
            </p>
          </div>

          {/* Upgrades Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Upgrades</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {upgrades.map((upgrade) => (
                <Card
                  key={upgrade.id}
                  className="p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{upgrade.name}</span>
                        {upgrade.owned > 0 && (
                          <span className="text-sm font-semibold text-primary">
                            x{upgrade.owned}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        +{upgrade.cps} cookies/sec
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Total: +{(upgrade.cps * upgrade.owned).toFixed(1)}/sec
                      </div>
                    </div>
                    <Button
                      onClick={() => buyUpgrade(upgrade)}
                      disabled={cookies < upgrade.cost}
                      variant={cookies >= upgrade.cost ? "default" : "outline"}
                      size="sm"
                    >
                      {upgrade.cost} 🍪
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Card className="p-4 bg-secondary/50">
            <h4 className="font-semibold mb-2">Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Each upgrade increases in cost by 15% after purchase</li>
              <li>• Higher tier upgrades produce more cookies per second</li>
              <li>• Build a balanced production chain for maximum efficiency</li>
            </ul>
          </Card>
        </div>
      </div>
    </GameLayout>
  );
};

export default CookieClicker;
