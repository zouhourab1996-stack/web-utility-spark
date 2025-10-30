import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { games, gameCategories } from "@/config/games";
import { Search, Gamepad2, TrendingUp, Clock, Star } from "lucide-react";
import SEO from "@/components/SEO";
import { siteConfig } from "@/config/seo";

const GamesHub = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredGames = useMemo(() => {
    let filtered = games;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const displayedGames = showAll ? filteredGames : filteredGames.slice(0, 12);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Games - Smart Tools Hub",
    "description": "Play 50+ free online HTML5 games. Puzzles, arcade, quiz, strategy, and more!",
    "url": `${siteConfig.url}/#/games`,
    "numberOfItems": games.length
  };

  return (
    <>
      <SEO
        title="Free Online Games - 50+ HTML5 Browser Games"
        description="Play 50+ free online games directly in your browser. Puzzles, arcade games, quizzes, memory games, strategy, and more. No downloads required!"
        keywords="free online games, HTML5 games, browser games, puzzle games, arcade games, quiz games, memory games, strategy games, casual games, fun games, web games"
        canonical="/games"
        schema={schema}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-accent to-primary/80 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
                <Gamepad2 className="w-5 h-5" />
                <span className="font-semibold">50+ Free Games</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                Play Free Online Games
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                No downloads, no installs — just pure fun in your browser!
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-scale-in">
                  🎮 50+ Games
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-scale-in" style={{ animationDelay: "0.1s" }}>
                  🧩 7 Categories
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-scale-in" style={{ animationDelay: "0.2s" }}>
                  ⚡ Instant Play
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search games... (e.g., puzzle, quiz, arcade)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-border bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {gameCategories.map((category, index) => {
                const Icon = category.icon;
                const count = category.id === "all" ? games.length : games.filter(g => g.category === category.id).length;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowAll(false);
                    }}
                    className={`transition-all duration-300 animate-fade-in ${
                      selectedCategory === category.id ? "shadow-md" : "hover:border-primary/50"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                    <span className="ml-2 text-xs opacity-70">({count})</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {searchQuery
                  ? `Search Results (${filteredGames.length})`
                  : selectedCategory === "all"
                  ? "All Games"
                  : `${gameCategories.find(c => c.id === selectedCategory)?.name} Games`}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {searchQuery
                  ? `Found ${filteredGames.length} games matching "${searchQuery}"`
                  : "Choose from our collection of fun, engaging browser games"}
              </p>
            </div>

            {filteredGames.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-semibold mb-2">No games found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or category filter
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {displayedGames.map((game, index) => {
                    const Icon = game.icon;
                    return (
                      <Card
                        key={game.id}
                        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up overflow-hidden"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <Link to={game.path} className="block">
                          <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                            {game.thumbnail}
                          </div>
                          
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                                {game.title}
                              </CardTitle>
                              <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                            </div>
                            <CardDescription className="line-clamp-2">
                              {game.description}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <Badge
                                variant={
                                  game.difficulty === "easy"
                                    ? "secondary"
                                    : game.difficulty === "medium"
                                    ? "default"
                                    : "destructive"
                                }
                                className="text-xs"
                              >
                                {game.difficulty}
                              </Badge>
                              <span className="text-sm text-muted-foreground capitalize">
                                {game.category}
                              </span>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    );
                  })}
                </div>

                {filteredGames.length > 12 && !showAll && (
                  <div className="text-center">
                    <Button
                      onClick={() => setShowAll(true)}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
                    >
                      Show More Games ({filteredGames.length - 12} more)
                    </Button>
                  </div>
                )}

                {showAll && filteredGames.length > 12 && (
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setShowAll(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      variant="outline"
                      size="lg"
                    >
                      Show Less
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Play Here?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% Free</h3>
                  <p className="text-muted-foreground">
                    All games are completely free to play. No subscriptions, no hidden fees.
                  </p>
                </div>

                <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Play</h3>
                  <p className="text-muted-foreground">
                    No downloads or installations required. Start playing immediately.
                  </p>
                </div>

                <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
                  <p className="text-muted-foreground">
                    Play on any device — desktop, tablet, or smartphone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GamesHub;
