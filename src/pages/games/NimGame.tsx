import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const NimGame = () => {
  const [items, setItems] = useState(15);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const takeItems = (count: number) => {
    if (gameOver || !playerTurn) return;
    
    const newItems = items - count;
    setItems(newItems);
    
    if (newItems === 0) {
      setGameOver(true);
      toast({ title: "You lose!", description: "Don't take the last item!", variant: "destructive" });
      return;
    }
    
    setPlayerTurn(false);
    setTimeout(() => aiMove(newItems), 1000);
  };

  const aiMove = (current: number) => {
    const take = current % 4 === 0 ? 1 : current % 4;
    const newItems = current - take;
    setItems(newItems);
    
    if (newItems === 0) {
      setGameOver(true);
      toast({ title: "You win!", description: "AI took the last item!" });
    } else {
      setPlayerTurn(true);
    }
  };

  const reset = () => {
    setItems(15);
    setPlayerTurn(true);
    setGameOver(false);
  };

  return (
    <GameLayout
      title="Nim Game"
      description="Take turns removing items. Don't take the last one!"
      keywords={["nim", "strategy", "mathematical game", "logic"]}
      difficulty="medium"
      category="strategy"
      gameId="nim-game"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Items Left: {items}</h2>
          <p className="text-lg text-muted-foreground">
            {gameOver ? "Game Over" : playerTurn ? "Your Turn" : "AI's Turn..."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center max-w-md">
          {Array.from({ length: items }, (_, i) => (
            <div key={i} className="w-8 h-8 bg-primary rounded-full" />
          ))}
        </div>

        {!gameOver && playerTurn && (
          <div className="flex gap-2">
            <Button onClick={() => takeItems(1)} disabled={items < 1}>Take 1</Button>
            <Button onClick={() => takeItems(2)} disabled={items < 2}>Take 2</Button>
            <Button onClick={() => takeItems(3)} disabled={items < 3}>Take 3</Button>
          </div>
        )}

        <Button onClick={reset} variant="outline">New Game</Button>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Take 1-3 items per turn. The player who takes the last item loses!
        </p>
      </div>
    </GameLayout>
  );
};

export default NimGame;
