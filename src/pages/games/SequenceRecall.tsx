import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const SequenceRecall = () => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [showIndex, setShowIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const startLevel = async () => {
    const seq = Array.from({ length: level + 2 }, () => Math.floor(Math.random() * 9));
    setSequence(seq);
    setUserSequence([]);
    setIsShowing(true);
    setIsPlaying(true);

    for (let i = 0; i < seq.length; i++) {
      setShowIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setShowIndex(-1);
    setIsShowing(false);
  };

  const handleNumberClick = (num: number) => {
    const newSeq = [...userSequence, num];
    setUserSequence(newSeq);

    if (num !== sequence[newSeq.length - 1]) {
      setIsPlaying(false);
      toast({ title: "Wrong!", description: `Made it to level ${level}`, variant: "destructive" });
      return;
    }

    if (newSeq.length === sequence.length) {
      setLevel(l => l + 1);
      toast({ title: "Correct!", description: `Level ${level + 1}` });
      setTimeout(startLevel, 1000);
    }
  };

  return (
    <GameLayout
      title="Sequence Recall"
      description="Watch and repeat increasingly complex sequences."
      keywords={["sequence", "memory", "recall", "pattern"]}
      difficulty="medium"
      category="memory"
      gameId="sequence-recall"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Level: {level}</h2>
          <p className="text-lg text-muted-foreground">
            {isShowing ? "Watch the sequence..." : isPlaying ? "Repeat it!" : ""}
          </p>
        </div>

        {!isPlaying ? (
          <Button onClick={startLevel} size="lg">Start Test</Button>
        ) : isShowing ? (
          <div className="grid grid-cols-3 gap-4">
            {sequence.map((num, i) => (
              <div
                key={i}
                className={`w-24 h-24 rounded-lg flex items-center justify-center text-4xl font-bold transition-all ${
                  i === showIndex
                    ? "bg-primary scale-110"
                    : "bg-secondary opacity-30"
                }`}
              >
                {i <= showIndex ? num : "?"}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num)}
                size="lg"
                className="w-20 h-20 text-3xl"
              >
                {num}
              </Button>
            ))}
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default SequenceRecall;
