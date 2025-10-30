import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const emojis = ["🎮", "🎨", "🎭", "🎪", "🎯", "🎲", "🎸", "🎹"];

const MemoryCards = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      if (cards[flipped[0]] === cards[flipped[1]]) {
        setMatched([...matched, ...flipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  const handleClick = (i: number) => {
    if (flipped.length < 2 && !flipped.includes(i) && !matched.includes(i)) {
      setFlipped([...flipped, i]);
    }
  };

  return (
    <GameLayout title="Memory Card Match" description="Find matching pairs of cards" keywords={["memory game", "matching", "cards"]} difficulty="medium" category="memory" gameId="memory-cards">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between mb-6">
          <div className="text-xl font-bold">Moves: {moves}</div>
          <Button onClick={initGame} variant="outline"><RotateCcw className="w-4 h-4 mr-2" />New Game</Button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <button key={i} onClick={() => handleClick(i)} className={`aspect-square text-4xl rounded-lg transition-all ${flipped.includes(i) || matched.includes(i) ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}>
              {flipped.includes(i) || matched.includes(i) ? card : "?"}
            </button>
          ))}
        </div>
      </div>
    </GameLayout>
  );
};

export default MemoryCards;
