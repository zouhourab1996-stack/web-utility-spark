import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n\n+/).filter(p => p.trim().length > 0).length;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
    });
  }, [text]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <FileText className="w-10 h-10 mr-3 text-primary" />
            Word Counter
          </h1>
          <p className="text-lg text-muted-foreground">
            Count words, characters, sentences, and paragraphs in your text
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
                <CardDescription>Type or paste your text below</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here..."
                  className="min-h-[400px] font-mono text-base"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-secondary rounded-lg">
                  <Label className="text-sm text-muted-foreground">Words</Label>
                  <p className="text-2xl font-bold text-primary">{stats.words.toLocaleString()}</p>
                </div>

                <div className="p-3 bg-secondary rounded-lg">
                  <Label className="text-sm text-muted-foreground">Characters</Label>
                  <p className="text-2xl font-bold">{stats.characters.toLocaleString()}</p>
                </div>

                <div className="p-3 bg-secondary rounded-lg">
                  <Label className="text-sm text-muted-foreground">Characters (no spaces)</Label>
                  <p className="text-2xl font-bold">{stats.charactersNoSpaces.toLocaleString()}</p>
                </div>

                <div className="p-3 bg-secondary rounded-lg">
                  <Label className="text-sm text-muted-foreground">Sentences</Label>
                  <p className="text-2xl font-bold">{stats.sentences.toLocaleString()}</p>
                </div>

                <div className="p-3 bg-secondary rounded-lg">
                  <Label className="text-sm text-muted-foreground">Paragraphs</Label>
                  <p className="text-2xl font-bold">{stats.paragraphs.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Reading Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-accent">
                    {Math.ceil(stats.words / 200)} min
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on 200 words/minute
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About Word Counter</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              This word counter tool helps you analyze your text quickly and accurately. It's perfect for writers, students, bloggers, and anyone who needs to track word count and other text statistics.
            </p>
            <p className="mt-4">
              <strong>Common use cases:</strong>
            </p>
            <ul>
              <li>Meeting essay and article word count requirements</li>
              <li>Optimizing content for SEO (meta descriptions, titles)</li>
              <li>Writing social media posts within character limits</li>
              <li>Tracking writing progress and productivity</li>
              <li>Ensuring content meets publishing guidelines</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WordCounter;
