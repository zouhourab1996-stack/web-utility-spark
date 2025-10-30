import { Calculator, DollarSign, PiggyBank, Timer, Ruler, Scale, Calendar, Currency, Lock, FileText, QrCode, Dices, Percent, ImageIcon, Volume2, GraduationCap, FileCode, Shuffle, ChefHat, ShoppingCart, Repeat, Clock, Heart, Apple, Eye, Settings, Plane, Type, Coins, Search, TrendingUp, Activity, Wrench, Zap, Gamepad2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolCard from "@/components/ToolCard";
import heroBackground from "@/assets/hero-background.jpg";
import SEO from "@/components/SEO";

const Home = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const tools = [
    {
      title: "Compound Interest Calculator",
      description: "Calculate compound interest and see how your investments grow over time",
      icon: Calculator,
      path: "/compound-interest",
      category: "financial",
    },
    {
      title: "Loan Calculator",
      description: "Calculate monthly payments and total interest for any loan",
      icon: DollarSign,
      path: "/loan-calculator",
      category: "financial",
    },
    {
      title: "Savings Calculator",
      description: "Plan your savings goals and track progress toward financial targets",
      icon: PiggyBank,
      path: "/savings-calculator",
      category: "financial",
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and get health recommendations",
      icon: Scale,
      path: "/bmi-calculator",
      category: "health",
    },
    {
      title: "Currency Converter",
      description: "Convert between world currencies with live exchange rates",
      icon: Currency,
      path: "/currency-converter",
      category: "converters",
    },
    {
      title: "Password Generator",
      description: "Generate secure random passwords with custom options",
      icon: Lock,
      path: "/password-generator",
      category: "utilities",
    },
    {
      title: "QR Code Generator",
      description: "Create QR codes for URLs, text, and contact information",
      icon: QrCode,
      path: "/qr-generator",
      category: "utilities",
    },
    {
      title: "Unit Converter",
      description: "Convert between different units of measurement instantly",
      icon: Ruler,
      path: "/unit-converter",
      category: "converters",
    },
    {
      title: "Stopwatch & Timer",
      description: "Professional online stopwatch with lap timing and countdown timer",
      icon: Timer,
      path: "/stopwatch",
      category: "productivity",
    },
    {
      title: "Age Calculator",
      description: "Calculate your exact age down to days, hours, and minutes",
      icon: Calendar,
      path: "/age-calculator",
      category: "calculators",
    },
    {
      title: "Word Counter",
      description: "Count words, characters, sentences, and paragraphs in your text",
      icon: FileText,
      path: "/word-counter",
      category: "utilities",
    },
    {
      title: "Random Number Generator",
      description: "Generate random numbers for any range or purpose",
      icon: Dices,
      path: "/random-number",
      category: "utilities",
    },
    {
      title: "Percentage Calculator",
      description: "Calculate percentages, increases, decreases, and more",
      icon: Percent,
      path: "/percentage-calculator",
      category: "calculators",
    },
    {
      title: "Image Compressor",
      description: "Compress images and reduce file size while maintaining quality",
      icon: ImageIcon,
      path: "/image-compressor",
      category: "utilities",
    },
    {
      title: "Text to Speech",
      description: "Convert text to natural-sounding speech with adjustable speed",
      icon: Volume2,
      path: "/text-to-speech",
      category: "utilities",
    },
    {
      title: "GPA Calculator",
      description: "Calculate your grade point average for semester or cumulative",
      icon: GraduationCap,
      path: "/gpa-calculator",
      category: "calculators",
    },
    {
      title: "Pomodoro Timer",
      description: "Boost productivity with focused work sessions and breaks",
      icon: Timer,
      path: "/pomodoro-timer",
      category: "productivity",
    },
    {
      title: "Base64 Converter",
      description: "Encode and decode Base64 strings and files",
      icon: FileCode,
      path: "/base64-converter",
      category: "converters",
    },
    {
      title: "Random Name Picker",
      description: "Randomly select names from your list for any purpose",
      icon: Shuffle,
      path: "/random-name-picker",
      category: "utilities",
    },
    {
      title: "Recipe Scaler",
      description: "Scale recipes up or down for any serving size",
      icon: ChefHat,
      path: "/recipe-scaler",
      category: "practical",
    },
    {
      title: "Price Comparator",
      description: "Compare unit prices to find the best grocery deals",
      icon: ShoppingCart,
      path: "/price-comparator",
      category: "practical",
    },
    {
      title: "Natural Unit Converter",
      description: "Convert units using natural language like '5 feet to meters'",
      icon: Repeat,
      path: "/natural-unit-converter",
      category: "converters",
    },
    {
      title: "Meeting Time Finder",
      description: "Find the best meeting time across multiple timezones",
      icon: Clock,
      path: "/meeting-time-finder",
      category: "productivity",
    },
    {
      title: "Donation QR Builder",
      description: "Create QR codes for PayPal and crypto donations",
      icon: Heart,
      path: "/donation-qr-builder",
      category: "utilities",
    },
    {
      title: "Pantry Tracker",
      description: "Track food expiration dates and reduce waste",
      icon: Apple,
      path: "/pantry-tracker",
      category: "practical",
    },
    {
      title: "Accessibility Checker",
      description: "Check color contrast for WCAG compliance",
      icon: Eye,
      path: "/accessibility-checker",
      category: "utilities",
    },
    {
      title: "Policy Generator",
      description: "Generate privacy policy and terms of service",
      icon: Settings,
      path: "/policy-generator",
      category: "utilities",
    },
    {
      title: "Holiday Planner",
      description: "Find upcoming public holidays by country",
      icon: Plane,
      path: "/holiday-planner",
      category: "practical",
    },
    {
      title: "Text to Slug",
      description: "Convert text to URL-friendly slugs and filenames",
      icon: Type,
      path: "/text-to-slug",
      category: "converters",
    },
    {
      title: "Currency Rounder",
      description: "Round prices for retail tags and displays",
      icon: Coins,
      path: "/currency-rounder",
      category: "financial",
    },
    {
      title: "Games Hub",
      description: "Play 50+ free browser games - puzzles, arcade, quiz & more!",
      icon: Gamepad2,
      path: "/games",
      category: "utilities",
    },
  ];

  const categories = [
    { id: "all", name: "All Tools", icon: Zap, count: tools.length },
    { id: "financial", name: "Financial", icon: TrendingUp, count: tools.filter(t => t.category === "financial").length },
    { id: "calculators", name: "Calculators", icon: Calculator, count: tools.filter(t => t.category === "calculators").length },
    { id: "converters", name: "Converters", icon: Repeat, count: tools.filter(t => t.category === "converters").length },
    { id: "productivity", name: "Productivity", icon: Activity, count: tools.filter(t => t.category === "productivity").length },
    { id: "utilities", name: "Utilities", icon: Wrench, count: tools.filter(t => t.category === "utilities").length },
    { id: "health", name: "Health & Fitness", icon: Heart, count: tools.filter(t => t.category === "health").length },
    { id: "practical", name: "Practical", icon: ChefHat, count: tools.filter(t => t.category === "practical").length },
  ];

  const filteredTools = useMemo(() => {
    let filtered = tools;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, tools]);

  const displayedTools = showAll ? filteredTools : filteredTools.slice(0, 9);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Smart Tools Hub",
    "description": "Free online calculators, converters, and productivity tools",
    "url": "https://zouhourab1996-stack.github.io/web-utility-spark/",
  };

  return (
    <>
      <SEO
        title="Smart Tools Hub — Free Online Calculators, Converters & Productivity Tools"
        description="Access 30+ free online tools including calculators, unit converters, password generator, QR code generator, recipe scaler, and more. Fast, simple, and mobile-friendly utilities."
        keywords="online tools, free calculators, unit converter, stopwatch online, QR generator, password generator, currency converter, GPA calculator, text to speech, word counter, productivity tools, smart utilities, online toolkit, easy converters, free web utilities, recipe scaler, price comparator, meeting scheduler"
        canonical="/"
        schema={schema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative py-20 md:py-32 overflow-hidden"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Smart Tools Hub
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up">
                30+ Free online calculators, converters, and productivity tools for everyday use
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-scale-in">
                  ✨ 30+ Free Tools
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-scale-in" style={{ animationDelay: "0.1s" }}>
                  📱 Mobile Friendly
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full animate-scale-in" style={{ animationDelay: "0.2s" }}>
                  🚀 Fast & Simple
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search tools... (e.g., calculator, converter, timer)"
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
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowAll(false);
                    }}
                    className={`transition-all duration-300 animate-fade-in ${
                      selectedCategory === category.id 
                        ? "shadow-md" 
                        : "hover:border-primary/50"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                    <span className="ml-2 text-xs opacity-70">({category.count})</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {selectedCategory === "all" 
                  ? (showAll ? "All Tools" : "Popular Tools")
                  : `${categories.find(c => c.id === selectedCategory)?.name} Tools`}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {searchQuery 
                  ? `Found ${filteredTools.length} tools matching "${searchQuery}"`
                  : "Choose from our collection of professional tools designed to make your life easier"}
              </p>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No tools found</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {displayedTools.map((tool, index) => (
                    <div
                      key={tool.path}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ToolCard {...tool} />
                    </div>
                  ))}
                </div>

                {filteredTools.length > 9 && !showAll && (
                  <div className="text-center">
                    <Button
                      onClick={() => setShowAll(true)}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
                    >
                      Show More Tools ({filteredTools.length - 9} more)
                    </Button>
                  </div>
                )}

                {showAll && filteredTools.length > 9 && (
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setShowAll(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                Why Choose Smart Tools Hub?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    All tools work instantly in your browser with no downloads or installations required
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% Private</h3>
                  <p className="text-muted-foreground">
                    Your data never leaves your device. Everything is processed locally for maximum privacy
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Always Free</h3>
                  <p className="text-muted-foreground">
                    No subscriptions, no hidden fees. All tools are completely free to use forever
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

export default Home;
