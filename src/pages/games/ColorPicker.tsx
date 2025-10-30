import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const ColorPicker = () => {
  const [color, setColor] = useState("#3b82f6");
  const { toast } = useToast();

  const generateColor = () => {
    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColor(newColor);
  };

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    toast({ title: "Copied!", description: `${color} copied to clipboard` });
  };

  const rgbValue = parseInt(color.slice(1), 16);
  const r = (rgbValue >> 16) & 255;
  const g = (rgbValue >> 8) & 255;
  const b = rgbValue & 255;

  return (
    <GameLayout
      title="Random Color Picker"
      description="Generate random colors for design and fun!"
      keywords={["color picker", "random color", "design", "palette"]}
      difficulty="easy"
      category="casual"
      gameId="color-picker"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div
          className="w-64 h-64 rounded-lg shadow-2xl transition-colors duration-300"
          style={{ backgroundColor: color }}
        />

        <div className="text-center space-y-2">
          <div className="flex items-center gap-2 justify-center">
            <h2 className="text-3xl font-bold font-mono">{color}</h2>
            <Button onClick={copyColor} size="sm" variant="ghost">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-lg text-muted-foreground">
            RGB({r}, {g}, {b})
          </p>
        </div>

        <Button onClick={generateColor} size="lg">
          Generate New Color
        </Button>

        <div className="flex gap-2 flex-wrap justify-center max-w-md">
          {Array.from({ length: 8 }, () => 
            "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
          ).map((c, i) => (
            <button
              key={i}
              onClick={() => setColor(c)}
              className="w-12 h-12 rounded-lg border-2 border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>
    </GameLayout>
  );
};

export default ColorPicker;
