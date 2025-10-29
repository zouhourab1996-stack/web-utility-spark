import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shuffle, Trash2 } from "lucide-react";
import SEO from "@/components/SEO";

const RandomNamePicker = () => {
  const [namesInput, setNamesInput] = useState("");
  const [pickedName, setPickedName] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const pickRandomName = () => {
    const names = namesInput
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length === 0) return;

    const randomIndex = Math.floor(Math.random() * names.length);
    const selected = names[randomIndex];
    setPickedName(selected);
    setHistory(prev => [selected, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
    setPickedName(null);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Random Name Picker",
    "description": "Pick random names from a list, free online random name selector tool",
    "url": "https://zouhourab1996-stack.github.io/web-utility-spark/#/random-name-picker",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <SEO
        title="Random Name Picker — Select Names Randomly"
        description="Free random name picker tool. Select random names from your list for giveaways, classroom activities, team selections, and more."
        keywords="random name picker, name selector, random picker, name generator, team picker, giveaway tool, classroom tool, online tools"
        canonical="/#/random-name-picker"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Shuffle className="w-10 h-10 mr-3 text-primary" />
              Random Name Picker
            </h1>
            <p className="text-lg text-muted-foreground">
              Randomly select names from your list
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter Names</CardTitle>
                <CardDescription>Enter one name per line</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="names">Names List</Label>
                  <Textarea
                    id="names"
                    value={namesInput}
                    onChange={(e) => setNamesInput(e.target.value)}
                    placeholder="John Smith&#10;Jane Doe&#10;Alex Johnson&#10;Sarah Williams"
                    rows={12}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Total names: {namesInput.split('\n').filter(n => n.trim()).length}
                  </p>
                </div>

                <Button onClick={pickRandomName} className="w-full gradient-primary text-white">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Pick Random Name
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {pickedName && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Name</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <p className="text-3xl font-bold text-primary break-words">
                        {pickedName}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>History</CardTitle>
                    {history.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    )}
                  </div>
                  <CardDescription>Last 10 selected names</CardDescription>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No names picked yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {history.map((name, index) => (
                        <div
                          key={index}
                          className="p-3 bg-secondary rounded-lg flex items-center justify-between"
                        >
                          <span className="font-medium">{name}</span>
                          <span className="text-xs text-muted-foreground">
                            #{index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ul className="grid md:grid-cols-2 gap-2">
                <li>🎁 Giveaways and contests</li>
                <li>🏫 Classroom activities</li>
                <li>⚽ Team selections</li>
                <li>🎯 Random assignments</li>
                <li>🎪 Event planning</li>
                <li>🎲 Games and activities</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RandomNamePicker;
