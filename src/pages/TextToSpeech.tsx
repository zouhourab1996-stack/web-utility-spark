import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Pause, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState("default");
  const [rate, setRate] = useState("1");
  const { toast } = useToast();
  let utterance: SpeechSynthesisUtterance | null = null;

  const handleSpeak = () => {
    if (!text.trim()) {
      toast({ title: "Error", description: "Please enter some text", variant: "destructive" });
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(rate);
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      toast({ title: "Error", description: "Speech synthesis failed", variant: "destructive" });
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text to Speech Converter",
    "description": "Convert text to speech online, free text-to-speech tool with multiple voices",
    "url": "https://zouhourab1996-stack.github.io/web-utility-spark/#/text-to-speech",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <SEO
        title="Text to Speech Converter — Free Online TTS Tool"
        description="Convert text to speech online for free. Natural sounding text-to-speech with adjustable speed and voice options."
        keywords="text to speech, TTS, speech synthesis, voice generator, text reader, audio converter, online tools, free TTS"
        canonical="/#/text-to-speech"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Volume2 className="w-10 h-10 mr-3 text-primary" />
              Text to Speech
            </h1>
            <p className="text-lg text-muted-foreground">
              Convert your text into natural-sounding speech
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
              <CardDescription>Type or paste text to convert to speech</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text">Text</Label>
                <Textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text here..."
                  rows={8}
                  className="font-mono"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate">Speech Rate</Label>
                  <Select value={rate} onValueChange={setRate}>
                    <SelectTrigger id="rate">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x (Slow)</SelectItem>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1">1x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.5">1.5x (Fast)</SelectItem>
                      <SelectItem value="2">2x (Very Fast)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSpeak} className="w-full gradient-primary text-white">
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Speaking
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Speaking
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TextToSpeech;
