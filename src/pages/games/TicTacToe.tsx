import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const newWinner = checkWinner(newBoard);
    if (newWinner) setWinner(newWinner);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <GameLayout title="Tic Tac Toe" description="Classic Tic Tac Toe game" keywords={["tic tac toe", "strategy", "board game"]} difficulty="easy" category="strategy" gameId="tic-tac-toe">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between mb-6">
          <div className="text-xl font-bold">{winner ? `Winner: ${winner}` : `Next: ${isXNext ? "X" : "O"}`}</div>
          <Button onClick={reset} variant="outline"><RotateCcw className="w-4 h-4 mr-2" />Reset</Button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((cell, i) => (
            <button key={i} onClick={() => handleClick(i)} className="aspect-square bg-card border-2 rounded-lg text-4xl font-bold hover:bg-primary/10 transition-colors">{cell}</button>
          ))}
        </div>
      </div>
    </GameLayout>
  );
};

export default TicTacToe;
