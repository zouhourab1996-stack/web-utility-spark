import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Share2 } from "lucide-react";
import SEO from "@/components/SEO";
import ShareBar from "@/components/ShareBar";
import { ShareData } from "@/utils/shareUtils";
import { siteConfig } from "@/config/seo";

interface GameLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  keywords: string[];
  difficulty: "easy" | "medium" | "hard";
  category: string;
  gameId: string;
}

const GameLayout = ({
  title,
  description,
  children,
  keywords,
  difficulty,
  category,
  gameId,
}: GameLayoutProps) => {
  const fullTitle = `${title} - Smart Tools Hub`;
  const canonicalUrl = `/games/${gameId}`;
  
  const shareData: ShareData = {
    title: fullTitle,
    description: description,
    url: `${siteConfig.url}/#${canonicalUrl}`,
    hashtags: ["SmartToolsHub", "FreeGames", "HTML5Games", "BrowserGames"]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": title,
    "description": description,
    "url": `${siteConfig.url}/#${canonicalUrl}`,
    "gameType": category,
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEO
        title={fullTitle}
        description={description}
        keywords={keywords.join(", ")}
        canonical={canonicalUrl}
        schema={schema}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/games">
              <Button variant="ghost" className="mb-4 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
            </Link>
            
            <Card className="border-2">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{title}</CardTitle>
                    <CardDescription className="text-base">{description}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      difficulty === "easy" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                      {difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary capitalize">
                      {category}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Game Area */}
          <Card className="mb-8">
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>

          {/* Share Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share This Game
              </CardTitle>
              <CardDescription>
                Enjoyed this game? Share it with your friends!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShareBar data={shareData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GameLayout;
