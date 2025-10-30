import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const RhythmTap = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beats, setBeats] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPlaying) return;

    const beatInterval = setInterval(() => {
      setCurrentBeat(b => (b + 1) % 4);
    }, 500);

    return () => clearInterval(beatInterval);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setIsPlaying(true);
    setCurrentBeat(0);
    setBeats(Array(30).fill(0).map(() => Math.floor(Math.random() * 4)));
  };

  const tap = () => {
    if (currentBeat === beats[0]) {
      setScore(s => s + 10 + combo * 2);
      setCombo(c => c + 1);
      setBeats(b => b.slice(1));
      
      if (beats.length === 1) {
        setIsPlaying(false);
        toast({ title: "Perfect!", description: `Score: ${score}` });
      }
    } else {
      setCombo(0);
      toast({ title: "Miss!", variant: "destructive" });
    }
  };

  return (
    <GameLayout
      title="Rhythm Tap"
      description="Tap to the beat and keep the rhythm going!"
      keywords={["rhythm game", "music game", "timing game", "beat"]}
      difficulty="hard"
      category="arcade"
      gameId="rhythm-tap"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Score: {score}</h2>
          <p className="text-lg">Combo: {combo} 🔥</p>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Rhythm</Button>
        ) : (
          <>
            <div className="flex gap-4">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-full transition-all ${
                    currentBeat === i ? "bg-primary scale-125" : "bg-secondary"
                  }`}
                />
              ))}
            </div>

            <Button onClick={tap} size="lg" className="w-40 h-40 rounded-full text-2xl">
              TAP!
            </Button>

            <p className="text-sm text-muted-foreground">Tap when the light matches!</p>
          </>
        )}
      </div>
    </GameLayout>
  );
};

export default RhythmTap;
