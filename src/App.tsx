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
import ImageCompressor from "./pages/ImageCompressor";
import TextToSpeech from "./pages/TextToSpeech";
import GPACalculator from "./pages/GPACalculator";
import PomodoroTimer from "./pages/PomodoroTimer";
import Base64Converter from "./pages/Base64Converter";
import RandomNamePicker from "./pages/RandomNamePicker";
import RecipeScaler from "./pages/RecipeScaler";
import PriceComparator from "./pages/PriceComparator";
import NaturalUnitConverter from "./pages/NaturalUnitConverter";
import MeetingTimeFinder from "./pages/MeetingTimeFinder";
import DonationQRBuilder from "./pages/DonationQRBuilder";
import PantryTracker from "./pages/PantryTracker";
import AccessibilityChecker from "./pages/AccessibilityChecker";
import PolicyGenerator from "./pages/PolicyGenerator";
import HolidayPlanner from "./pages/HolidayPlanner";
import TextToSlug from "./pages/TextToSlug";
import CurrencyRounder from "./pages/CurrencyRounder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
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
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/gpa-calculator" element={<GPACalculator />} />
            <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
            <Route path="/base64-converter" element={<Base64Converter />} />
            <Route path="/random-name-picker" element={<RandomNamePicker />} />
            <Route path="/recipe-scaler" element={<RecipeScaler />} />
            <Route path="/price-comparator" element={<PriceComparator />} />
            <Route path="/natural-unit-converter" element={<NaturalUnitConverter />} />
            <Route path="/meeting-time-finder" element={<MeetingTimeFinder />} />
            <Route path="/donation-qr-builder" element={<DonationQRBuilder />} />
            <Route path="/pantry-tracker" element={<PantryTracker />} />
            <Route path="/accessibility-checker" element={<AccessibilityChecker />} />
            <Route path="/policy-generator" element={<PolicyGenerator />} />
            <Route path="/holiday-planner" element={<HolidayPlanner />} />
            <Route path="/text-to-slug" element={<TextToSlug />} />
            <Route path="/currency-rounder" element={<CurrencyRounder />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
