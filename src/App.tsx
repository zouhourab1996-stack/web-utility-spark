import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// Lazy load all tool pages for better performance
const CompoundInterest = lazy(() => import("./pages/CompoundInterest"));
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const SavingsCalculator = lazy(() => import("./pages/SavingsCalculator"));
const Stopwatch = lazy(() => import("./pages/Stopwatch"));
const UnitConverter = lazy(() => import("./pages/UnitConverter"));
const AgeCalculator = lazy(() => import("./pages/AgeCalculator"));
const CurrencyConverter = lazy(() => import("./pages/CurrencyConverter"));
const PasswordGenerator = lazy(() => import("./pages/PasswordGenerator"));
const WordCounter = lazy(() => import("./pages/WordCounter"));
const QRGenerator = lazy(() => import("./pages/QRGenerator"));
const BMICalculator = lazy(() => import("./pages/BMICalculator"));
const PercentageCalculator = lazy(() => import("./pages/PercentageCalculator"));
const RandomNumber = lazy(() => import("./pages/RandomNumber"));
const ImageCompressor = lazy(() => import("./pages/ImageCompressor"));
const TextToSpeech = lazy(() => import("./pages/TextToSpeech"));
const GPACalculator = lazy(() => import("./pages/GPACalculator"));
const PomodoroTimer = lazy(() => import("./pages/PomodoroTimer"));
const Base64Converter = lazy(() => import("./pages/Base64Converter"));
const RandomNamePicker = lazy(() => import("./pages/RandomNamePicker"));
const RecipeScaler = lazy(() => import("./pages/RecipeScaler"));
const PriceComparator = lazy(() => import("./pages/PriceComparator"));
const NaturalUnitConverter = lazy(() => import("./pages/NaturalUnitConverter"));
const MeetingTimeFinder = lazy(() => import("./pages/MeetingTimeFinder"));
const DonationQRBuilder = lazy(() => import("./pages/DonationQRBuilder"));
const PantryTracker = lazy(() => import("./pages/PantryTracker"));
const AccessibilityChecker = lazy(() => import("./pages/AccessibilityChecker"));
const PolicyGenerator = lazy(() => import("./pages/PolicyGenerator"));
const HolidayPlanner = lazy(() => import("./pages/HolidayPlanner"));
const TextToSlug = lazy(() => import("./pages/TextToSlug"));
const CurrencyRounder = lazy(() => import("./pages/CurrencyRounder"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GamesHub = lazy(() => import("./pages/GamesHub"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
// Game imports - Lazy loaded for performance
const NumberSlide = lazy(() => import("./pages/games/NumberSlide"));
const ColorMatch = lazy(() => import("./pages/games/ColorMatch"));
const ReactionTime = lazy(() => import("./pages/games/ReactionTime"));
const BalloonPop = lazy(() => import("./pages/games/BalloonPop"));
const CookieClicker = lazy(() => import("./pages/games/CookieClicker"));
const TicTacToe = lazy(() => import("./pages/games/TicTacToe"));
const MemoryCards = lazy(() => import("./pages/games/MemoryCards"));
const WordScramble = lazy(() => import("./pages/games/WordScramble"));
const Sudoku = lazy(() => import("./pages/games/Sudoku"));
const MazeRunner = lazy(() => import("./pages/games/MazeRunner"));
const ConnectDots = lazy(() => import("./pages/games/ConnectDots"));
const PatternFinder = lazy(() => import("./pages/games/PatternFinder"));
const BlockPuzzle = lazy(() => import("./pages/games/BlockPuzzle"));
const MathPyramid = lazy(() => import("./pages/games/MathPyramid"));
const LightBulbs = lazy(() => import("./pages/games/LightBulbs"));
const FallingBlocks = lazy(() => import("./pages/games/FallingBlocks"));
const TypingSpeed = lazy(() => import("./pages/games/TypingSpeed"));
const ColorRush = lazy(() => import("./pages/games/ColorRush"));
const SpaceDodger = lazy(() => import("./pages/games/SpaceDodger"));
const NumberHunt = lazy(() => import("./pages/games/NumberHunt"));
const RhythmTap = lazy(() => import("./pages/games/RhythmTap"));
const ArrowKeys = lazy(() => import("./pages/games/ArrowKeys"));
const FruitNinja = lazy(() => import("./pages/games/FruitNinja"));
const TriviaChallenge = lazy(() => import("./pages/games/TriviaChallenge"));
const MathQuiz = lazy(() => import("./pages/games/MathQuiz"));
const FlagQuiz = lazy(() => import("./pages/games/FlagQuiz"));
const CapitalQuiz = lazy(() => import("./pages/games/CapitalQuiz"));
const TrueFalse = lazy(() => import("./pages/games/TrueFalse"));
const EmojiQuiz = lazy(() => import("./pages/games/EmojiQuiz"));
const SpellCheck = lazy(() => import("./pages/games/SpellCheck"));
const HistoryQuiz = lazy(() => import("./pages/games/HistoryQuiz"));
const ScienceQuiz = lazy(() => import("./pages/games/ScienceQuiz"));
const Riddles = lazy(() => import("./pages/games/Riddles"));
const GemMiner = lazy(() => import("./pages/games/GemMiner"));
const PlanetBuilder = lazy(() => import("./pages/games/PlanetBuilder"));
const TreeGrower = lazy(() => import("./pages/games/TreeGrower"));
const BubbleClicker = lazy(() => import("./pages/games/BubbleClicker"));
const SimonSays = lazy(() => import("./pages/games/SimonSays"));
const NumberMemory = lazy(() => import("./pages/games/NumberMemory"));
const VisualMemory = lazy(() => import("./pages/games/VisualMemory"));
const SequenceRecall = lazy(() => import("./pages/games/SequenceRecall"));
const ConnectFour = lazy(() => import("./pages/games/ConnectFour"));
const NimGame = lazy(() => import("./pages/games/NimGame"));
const TowerDefense = lazy(() => import("./pages/games/TowerDefense"));
const ChessPuzzles = lazy(() => import("./pages/games/ChessPuzzles"));
const CoinFlip = lazy(() => import("./pages/games/CoinFlip"));
const DiceRoller = lazy(() => import("./pages/games/DiceRoller"));

// Free Ads and About pages - lazy loaded
const FreeAds = lazy(() => import("./pages/FreeAds"));
const PostAd = lazy(() => import("./pages/PostAd"));
const AdDetail = lazy(() => import("./pages/AdDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const FortuneWheel = lazy(() => import("./pages/games/FortuneWheel"));
const ColorPicker = lazy(() => import("./pages/games/ColorPicker"));
const Magic8Ball = lazy(() => import("./pages/games/Magic8Ball"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Layout>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/games" element={<GamesHub />} />
            <Route path="/games/number-slide" element={<NumberSlide />} />
            <Route path="/games/color-match" element={<ColorMatch />} />
            <Route path="/games/reaction-time" element={<ReactionTime />} />
            <Route path="/games/balloon-pop" element={<BalloonPop />} />
            <Route path="/games/cookie-clicker" element={<CookieClicker />} />
            <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/games/memory-cards" element={<MemoryCards />} />
            <Route path="/games/word-scramble" element={<WordScramble />} />
            <Route path="/games/sudoku" element={<Sudoku />} />
            <Route path="/games/maze-runner" element={<MazeRunner />} />
            <Route path="/games/connect-dots" element={<ConnectDots />} />
            <Route path="/games/pattern-finder" element={<PatternFinder />} />
            <Route path="/games/block-puzzle" element={<BlockPuzzle />} />
            <Route path="/games/math-pyramid" element={<MathPyramid />} />
            <Route path="/games/light-bulbs" element={<LightBulbs />} />
            <Route path="/games/falling-blocks" element={<FallingBlocks />} />
            <Route path="/games/typing-speed" element={<TypingSpeed />} />
            <Route path="/games/color-rush" element={<ColorRush />} />
            <Route path="/games/space-dodger" element={<SpaceDodger />} />
            <Route path="/games/number-hunt" element={<NumberHunt />} />
            <Route path="/games/rhythm-tap" element={<RhythmTap />} />
            <Route path="/games/arrow-keys" element={<ArrowKeys />} />
            <Route path="/games/fruit-ninja" element={<FruitNinja />} />
            <Route path="/games/trivia-challenge" element={<TriviaChallenge />} />
            <Route path="/games/math-quiz" element={<MathQuiz />} />
            <Route path="/games/flag-quiz" element={<FlagQuiz />} />
            <Route path="/games/capital-quiz" element={<CapitalQuiz />} />
            <Route path="/games/true-false" element={<TrueFalse />} />
            <Route path="/games/emoji-quiz" element={<EmojiQuiz />} />
            <Route path="/games/spell-check" element={<SpellCheck />} />
            <Route path="/games/history-quiz" element={<HistoryQuiz />} />
            <Route path="/games/science-quiz" element={<ScienceQuiz />} />
            <Route path="/games/riddles" element={<Riddles />} />
            <Route path="/games/gem-miner" element={<GemMiner />} />
            <Route path="/games/planet-builder" element={<PlanetBuilder />} />
            <Route path="/games/tree-grower" element={<TreeGrower />} />
            <Route path="/games/bubble-clicker" element={<BubbleClicker />} />
            <Route path="/games/simon-says" element={<SimonSays />} />
            <Route path="/games/number-memory" element={<NumberMemory />} />
            <Route path="/games/visual-memory" element={<VisualMemory />} />
            <Route path="/games/sequence-recall" element={<SequenceRecall />} />
            <Route path="/games/connect-four" element={<ConnectFour />} />
            <Route path="/games/nim-game" element={<NimGame />} />
            <Route path="/games/tower-defense" element={<TowerDefense />} />
            <Route path="/games/chess-puzzles" element={<ChessPuzzles />} />
            <Route path="/games/coin-flip" element={<CoinFlip />} />
            <Route path="/games/dice-roller" element={<DiceRoller />} />
            <Route path="/games/fortune-wheel" element={<FortuneWheel />} />
            <Route path="/games/color-picker" element={<ColorPicker />} />
            <Route path="/games/magic-8ball" element={<Magic8Ball />} />
            
            {/* Free Ads Routes */}
            <Route path="/free-ads" element={<FreeAds />} />
            <Route path="/free-ads/post" element={<PostAd />} />
            <Route path="/free-ads/:id" element={<AdDetail />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
