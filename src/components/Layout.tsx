import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calculator, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const location = useLocation();

  const tools = [
    { name: "Compound Interest", path: "/compound-interest" },
    { name: "Loan Calculator", path: "/loan-calculator" },
    { name: "Savings Calculator", path: "/savings-calculator" },
    { name: "Stopwatch", path: "/stopwatch" },
    { name: "Unit Converter", path: "/unit-converter" },
    { name: "BMI Calculator", path: "/bmi-calculator" },
    { name: "Age Calculator", path: "/age-calculator" },
    { name: "Currency Converter", path: "/currency-converter" },
    { name: "Password Generator", path: "/password-generator" },
    { name: "Word Counter", path: "/word-counter" },
    { name: "QR Generator", path: "/qr-generator" },
    { name: "Random Number", path: "/random-number" },
    { name: "Percentage Calculator", path: "/percentage-calculator" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl text-primary">
              <Calculator className="w-6 h-6" />
              <span>Smart Tools Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                Home
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDonateModalOpen(true)}
                className="text-sm font-medium"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-border">
              <Link
                to="/"
                className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="block px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setDonateModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md transition-colors flex items-center"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Smart Tools Hub. All rights reserved.
              </p>
            </div>
            <Button
              onClick={() => setDonateModalOpen(true)}
              className="gradient-accent text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Heart className="w-4 h-4 mr-2" />
              Support Our Mission
            </Button>
          </div>
        </div>
      </footer>

      {/* Donation Modal */}
      <Dialog open={donateModalOpen} onOpenChange={setDonateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Heart className="w-6 h-6 mr-2 text-accent" />
              Support Our Mission
            </DialogTitle>
            <DialogDescription className="text-base pt-4 space-y-4">
              <p className="text-foreground">
                💧 Your donations help complete an agricultural well for a rural area in Tunisia.
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="font-semibold text-foreground mb-2">PayPal</p>
                  <p className="text-sm font-mono break-all">anistouati74@gmail.com</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="font-semibold text-foreground mb-2">USDT (BNB Chain)</p>
                  <p className="text-xs font-mono break-all">0x63e8f2e80c81523Cc896f44743Da19aFbd8D04eD</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                Thank you for your generosity and support! 🙏
              </p>
              <p className="text-xs text-muted-foreground pt-2 italic">
                Donations are for completing a rural water well in Tunisia.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
