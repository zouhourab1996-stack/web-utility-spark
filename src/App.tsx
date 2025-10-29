import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CompoundInterest from "./pages/CompoundInterest";
import LoanCalculator from "./pages/LoanCalculator";
import SavingsCalculator from "./pages/SavingsCalculator";
import Stopwatch from "./pages/Stopwatch";
import UnitConverter from "./pages/UnitConverter";
import AgeCalculator from "./pages/AgeCalculator";
import CurrencyConverter from "./pages/CurrencyConverter";
import PasswordGenerator from "./pages/PasswordGenerator";
import WordCounter from "./pages/WordCounter";
import QRGenerator from "./pages/QRGenerator";
import BMICalculator from "./pages/BMICalculator";
import PercentageCalculator from "./pages/PercentageCalculator";
import RandomNumber from "./pages/RandomNumber";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compound-interest" element={<CompoundInterest />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/savings-calculator" element={<SavingsCalculator />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/qr-generator" element={<QRGenerator />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/random-number" element={<RandomNumber />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
