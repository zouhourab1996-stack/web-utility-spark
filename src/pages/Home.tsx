import { Calculator, DollarSign, PiggyBank, Timer, Ruler, Scale, Calendar, Currency, Lock, FileText, QrCode, Dices, Percent } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const tools = [
    {
      title: "Compound Interest Calculator",
      description: "Calculate compound interest and see how your investments grow over time",
      icon: Calculator,
      path: "/compound-interest",
    },
    {
      title: "Loan Calculator",
      description: "Calculate monthly payments and total interest for any loan",
      icon: DollarSign,
      path: "/loan-calculator",
    },
    {
      title: "Savings Calculator",
      description: "Plan your savings goals and track progress toward financial targets",
      icon: PiggyBank,
      path: "/savings-calculator",
    },
    {
      title: "Stopwatch & Timer",
      description: "Professional online stopwatch with lap timing and countdown timer",
      icon: Timer,
      path: "/stopwatch",
    },
    {
      title: "Unit Converter",
      description: "Convert between different units of measurement instantly",
      icon: Ruler,
      path: "/unit-converter",
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and get health recommendations",
      icon: Scale,
      path: "/bmi-calculator",
    },
    {
      title: "Age Calculator",
      description: "Calculate your exact age down to days, hours, and minutes",
      icon: Calendar,
      path: "/age-calculator",
    },
    {
      title: "Currency Converter",
      description: "Convert between world currencies with live exchange rates",
      icon: Currency,
      path: "/currency-converter",
    },
    {
      title: "Password Generator",
      description: "Generate secure random passwords with custom options",
      icon: Lock,
      path: "/password-generator",
    },
    {
      title: "Word Counter",
      description: "Count words, characters, sentences, and paragraphs in your text",
      icon: FileText,
      path: "/word-counter",
    },
    {
      title: "QR Code Generator",
      description: "Create QR codes for URLs, text, and contact information",
      icon: QrCode,
      path: "/qr-generator",
    },
    {
      title: "Random Number Generator",
      description: "Generate random numbers for any range or purpose",
      icon: Dices,
      path: "/random-number",
    },
    {
      title: "Percentage Calculator",
      description: "Calculate percentages, increases, decreases, and more",
      icon: Percent,
      path: "/percentage-calculator",
    },
  ];

  return (
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
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Smart Tools Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
              Free online calculators, converters, and productivity tools for everyday use
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                ✨ 13+ Free Tools
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                📱 Mobile Friendly
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🚀 Fast & Simple
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of professional tools designed to make your life easier
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.path} {...tool} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
