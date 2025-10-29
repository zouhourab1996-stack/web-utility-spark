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
    { name: "Image Compressor", path: "/image-compressor" },
    { name: "Text to Speech", path: "/text-to-speech" },
    { name: "GPA Calculator", path: "/gpa-calculator" },
    { name: "Pomodoro Timer", path: "/pomodoro-timer" },
    { name: "Base64 Converter", path: "/base64-converter" },
    { name: "Random Name Picker", path: "/random-name-picker" },
    { name: "Recipe Scaler", path: "/recipe-scaler" },
    { name: "Price Comparator", path: "/price-comparator" },
    { name: "Natural Unit Converter", path: "/natural-unit-converter" },
    { name: "Meeting Time Finder", path: "/meeting-time-finder" },
    { name: "Donation QR Builder", path: "/donation-qr-builder" },
    { name: "Pantry Tracker", path: "/pantry-tracker" },
    { name: "Accessibility Checker", path: "/accessibility-checker" },
    { name: "Policy Generator", path: "/policy-generator" },
    { name: "Holiday Planner", path: "/holiday-planner" },
    { name: "Text to Slug", path: "/text-to-slug" },
    { name: "Currency Rounder", path: "/currency-rounder" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Contact Us", path: "/contact" },
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
            <div className="md:hidden py-4 space-y-2 border-t border-border max-h-[70vh] overflow-y-auto animate-fade-in">
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
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Smart Tools Hub</h3>
              <p className="text-sm text-muted-foreground">
                30+ free online tools for calculations, conversions, and productivity
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/privacy-policy" className="block text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="block text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Help complete a water well in rural Tunisia 🌾
              </p>
              <Button
                onClick={() => setDonateModalOpen(true)}
                size="sm"
                variant="outline"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Button>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Smart Tools Hub. All rights reserved.
            </p>
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
                All donations go toward completing a community agricultural water well in rural Tunisia 🌾
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
                Thank you for helping us bring clean water to those in need! 🙏
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
