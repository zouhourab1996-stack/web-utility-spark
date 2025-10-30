import { LucideIcon, Gamepad2, Brain, Zap, MousePointer, Eye, Target, Sparkles, Trophy, Rocket, Puzzle, Dices, Calculator, CircleDot, Grid3x3, Square, Shuffle, Layers, Timer, Flag, Heart } from "lucide-react";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  path: string;
  thumbnail: string;
  difficulty: "easy" | "medium" | "hard";
  keywords: string[];
}

export const gameCategories = [
  { id: "all", name: "All Games", icon: Gamepad2 },
  { id: "puzzle", name: "Puzzle", icon: Puzzle },
  { id: "arcade", name: "Arcade", icon: Zap },
  { id: "quiz", name: "Quiz", icon: Brain },
  { id: "clicker", name: "Clicker", icon: MousePointer },
  { id: "memory", name: "Memory", icon: Eye },
  { id: "strategy", name: "Strategy", icon: Target },
  { id: "casual", name: "Casual", icon: Sparkles },
];

export const games: Game[] = [
  // PUZZLE GAMES (10)
  {
    id: "number-slide",
    title: "Number Slide Puzzle",
    description: "Classic sliding number puzzle. Arrange numbers 1-15 in order.",
    category: "puzzle",
    icon: Grid3x3,
    path: "/games/number-slide",
    thumbnail: "🔢",
    difficulty: "medium",
    keywords: ["sliding puzzle", "number game", "logic puzzle", "brain teaser"]
  },
  {
    id: "color-match",
    title: "Color Match",
    description: "Match colors in sequence. Test your memory and speed.",
    category: "puzzle",
    icon: CircleDot,
    path: "/games/color-match",
    thumbnail: "🎨",
    difficulty: "easy",
    keywords: ["color matching", "memory game", "pattern recognition"]
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble letters to form words. Race against time.",
    category: "puzzle",
    icon: Shuffle,
    path: "/games/word-scramble",
    thumbnail: "📝",
    difficulty: "medium",
    keywords: ["word game", "anagram", "vocabulary", "brain game"]
  },
  {
    id: "sudoku",
    title: "Mini Sudoku",
    description: "4x4 Sudoku puzzle. Fill the grid with numbers 1-4.",
    category: "puzzle",
    icon: Grid3x3,
    path: "/games/sudoku",
    thumbnail: "🔢",
    difficulty: "medium",
    keywords: ["sudoku", "logic puzzle", "number puzzle", "brain teaser"]
  },
  {
    id: "maze-runner",
    title: "Maze Runner",
    description: "Navigate through the maze to reach the goal.",
    category: "puzzle",
    icon: Target,
    path: "/games/maze-runner",
    thumbnail: "🗺️",
    difficulty: "easy",
    keywords: ["maze game", "path finding", "navigation", "puzzle"]
  },
  {
    id: "connect-dots",
    title: "Connect the Dots",
    description: "Connect matching colored dots without crossing lines.",
    category: "puzzle",
    icon: CircleDot,
    path: "/games/connect-dots",
    thumbnail: "⚫",
    difficulty: "medium",
    keywords: ["connect game", "logic puzzle", "path puzzle"]
  },
  {
    id: "pattern-finder",
    title: "Pattern Finder",
    description: "Find and continue the pattern in the sequence.",
    category: "puzzle",
    icon: Layers,
    path: "/games/pattern-finder",
    thumbnail: "🔍",
    difficulty: "hard",
    keywords: ["pattern recognition", "logic game", "brain teaser"]
  },
  {
    id: "block-puzzle",
    title: "Block Puzzle",
    description: "Fit tetris-like blocks to clear lines and score.",
    category: "puzzle",
    icon: Square,
    path: "/games/block-puzzle",
    thumbnail: "🧩",
    difficulty: "medium",
    keywords: ["block puzzle", "tetris", "tile game", "strategy"]
  },
  {
    id: "math-pyramid",
    title: "Math Pyramid",
    description: "Solve the pyramid by calculating missing numbers.",
    category: "puzzle",
    icon: Calculator,
    path: "/games/math-pyramid",
    thumbnail: "🔺",
    difficulty: "hard",
    keywords: ["math game", "arithmetic", "number puzzle", "logic"]
  },
  {
    id: "light-bulbs",
    title: "Light Bulbs",
    description: "Turn on all the bulbs, but they affect each other!",
    category: "puzzle",
    icon: Zap,
    path: "/games/light-bulbs",
    thumbnail: "💡",
    difficulty: "hard",
    keywords: ["logic puzzle", "brain teaser", "light puzzle"]
  },

  // ARCADE GAMES (10)
  {
    id: "reaction-time",
    title: "Reaction Time Test",
    description: "Test your reflexes. Click as fast as you can!",
    category: "arcade",
    icon: Zap,
    path: "/games/reaction-time",
    thumbnail: "⚡",
    difficulty: "easy",
    keywords: ["reaction test", "reflex game", "speed test", "quick game"]
  },
  {
    id: "balloon-pop",
    title: "Balloon Pop",
    description: "Pop as many balloons as you can before time runs out!",
    category: "arcade",
    icon: Target,
    path: "/games/balloon-pop",
    thumbnail: "🎈",
    difficulty: "easy",
    keywords: ["clicking game", "balloon game", "target practice", "arcade"]
  },
  {
    id: "falling-blocks",
    title: "Falling Blocks",
    description: "Catch the falling blocks and avoid the bombs!",
    category: "arcade",
    icon: Square,
    path: "/games/falling-blocks",
    thumbnail: "📦",
    difficulty: "medium",
    keywords: ["falling game", "catch game", "reflex game", "arcade"]
  },
  {
    id: "typing-speed",
    title: "Typing Speed Race",
    description: "Type the words as fast as you can. Improve your WPM!",
    category: "arcade",
    icon: Zap,
    path: "/games/typing-speed",
    thumbnail: "⌨️",
    difficulty: "medium",
    keywords: ["typing test", "WPM", "keyboard game", "speed typing"]
  },
  {
    id: "color-rush",
    title: "Color Rush",
    description: "Click the matching color before time runs out!",
    category: "arcade",
    icon: CircleDot,
    path: "/games/color-rush",
    thumbnail: "🌈",
    difficulty: "easy",
    keywords: ["color game", "reaction game", "speed game", "quick match"]
  },
  {
    id: "space-dodger",
    title: "Space Dodger",
    description: "Navigate your spaceship and avoid asteroids!",
    category: "arcade",
    icon: Rocket,
    path: "/games/space-dodger",
    thumbnail: "🚀",
    difficulty: "hard",
    keywords: ["space game", "dodging game", "arcade", "reflex"]
  },
  {
    id: "number-hunt",
    title: "Number Hunt",
    description: "Find numbers in sequence as fast as possible!",
    category: "arcade",
    icon: Target,
    path: "/games/number-hunt",
    thumbnail: "🔍",
    difficulty: "medium",
    keywords: ["number game", "speed game", "sequence", "hunt"]
  },
  {
    id: "rhythm-tap",
    title: "Rhythm Tap",
    description: "Tap to the beat and keep the rhythm going!",
    category: "arcade",
    icon: Timer,
    path: "/games/rhythm-tap",
    thumbnail: "🎵",
    difficulty: "hard",
    keywords: ["rhythm game", "music game", "timing game", "beat"]
  },
  {
    id: "arrow-keys",
    title: "Arrow Keys Master",
    description: "Press the correct arrow key as fast as you can!",
    category: "arcade",
    icon: Zap,
    path: "/games/arrow-keys",
    thumbnail: "⬆️",
    difficulty: "easy",
    keywords: ["arrow game", "keyboard game", "reaction", "keys"]
  },
  {
    id: "fruit-ninja",
    title: "Fruit Slicer",
    description: "Slice the fruits and avoid the bombs!",
    category: "arcade",
    icon: Target,
    path: "/games/fruit-ninja",
    thumbnail: "🍎",
    difficulty: "medium",
    keywords: ["fruit game", "slicing game", "clicking game", "arcade"]
  },

  // QUIZ GAMES (10)
  {
    id: "trivia-challenge",
    title: "Trivia Challenge",
    description: "Test your general knowledge with random trivia questions.",
    category: "quiz",
    icon: Brain,
    path: "/games/trivia-challenge",
    thumbnail: "❓",
    difficulty: "medium",
    keywords: ["trivia", "quiz", "knowledge test", "questions"]
  },
  {
    id: "math-quiz",
    title: "Math Quiz",
    description: "Solve math problems quickly and improve your skills.",
    category: "quiz",
    icon: Calculator,
    path: "/games/math-quiz",
    thumbnail: "➗",
    difficulty: "medium",
    keywords: ["math quiz", "arithmetic", "calculation", "numbers"]
  },
  {
    id: "flag-quiz",
    title: "Flag Quiz",
    description: "Can you identify countries by their flags?",
    category: "quiz",
    icon: Flag,
    path: "/games/flag-quiz",
    thumbnail: "🏳️",
    difficulty: "medium",
    keywords: ["flag quiz", "geography", "countries", "world"]
  },
  {
    id: "capital-quiz",
    title: "Capital Cities Quiz",
    description: "Name the capital cities of different countries.",
    category: "quiz",
    icon: Flag,
    path: "/games/capital-quiz",
    thumbnail: "🌍",
    difficulty: "hard",
    keywords: ["capital quiz", "geography", "cities", "countries"]
  },
  {
    id: "true-false",
    title: "True or False",
    description: "Quick true or false questions on various topics.",
    category: "quiz",
    icon: Brain,
    path: "/games/true-false",
    thumbnail: "✅",
    difficulty: "easy",
    keywords: ["true false", "quiz", "quick quiz", "facts"]
  },
  {
    id: "emoji-quiz",
    title: "Emoji Quiz",
    description: "Guess the movie, phrase, or object from emojis!",
    category: "quiz",
    icon: Sparkles,
    path: "/games/emoji-quiz",
    thumbnail: "😀",
    difficulty: "medium",
    keywords: ["emoji quiz", "guessing game", "visual quiz", "emoji"]
  },
  {
    id: "spell-check",
    title: "Spell Check",
    description: "Find the correctly spelled word from the options.",
    category: "quiz",
    icon: Brain,
    path: "/games/spell-check",
    thumbnail: "📖",
    difficulty: "medium",
    keywords: ["spelling", "vocabulary", "word quiz", "language"]
  },
  {
    id: "history-quiz",
    title: "History Quiz",
    description: "Test your knowledge of historical events and figures.",
    category: "quiz",
    icon: Brain,
    path: "/games/history-quiz",
    thumbnail: "📜",
    difficulty: "hard",
    keywords: ["history quiz", "historical facts", "timeline", "events"]
  },
  {
    id: "science-quiz",
    title: "Science Quiz",
    description: "Answer questions about science, nature, and physics.",
    category: "quiz",
    icon: Brain,
    path: "/games/science-quiz",
    thumbnail: "🔬",
    difficulty: "hard",
    keywords: ["science quiz", "physics", "biology", "chemistry"]
  },
  {
    id: "riddles",
    title: "Brain Riddles",
    description: "Solve tricky riddles and brain teasers.",
    category: "quiz",
    icon: Brain,
    path: "/games/riddles",
    thumbnail: "🧠",
    difficulty: "hard",
    keywords: ["riddles", "brain teasers", "logic puzzles", "thinking"]
  },

  // CLICKER GAMES (5)
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    description: "Click the cookie to earn points and upgrades!",
    category: "clicker",
    icon: MousePointer,
    path: "/games/cookie-clicker",
    thumbnail: "🍪",
    difficulty: "easy",
    keywords: ["clicker", "idle game", "clicking", "incremental"]
  },
  {
    id: "gem-miner",
    title: "Gem Miner",
    description: "Click to mine gems and build your fortune!",
    category: "clicker",
    icon: MousePointer,
    path: "/games/gem-miner",
    thumbnail: "💎",
    difficulty: "easy",
    keywords: ["mining game", "clicker", "gems", "collecting"]
  },
  {
    id: "planet-builder",
    title: "Planet Builder",
    description: "Click to gather resources and build your planet!",
    category: "clicker",
    icon: MousePointer,
    path: "/games/planet-builder",
    thumbnail: "🌍",
    difficulty: "easy",
    keywords: ["building game", "clicker", "idle", "planet"]
  },
  {
    id: "tree-grower",
    title: "Tree Grower",
    description: "Nurture your tree from seed to mighty oak!",
    category: "clicker",
    icon: MousePointer,
    path: "/games/tree-grower",
    thumbnail: "🌳",
    difficulty: "easy",
    keywords: ["growing game", "clicker", "nature", "idle"]
  },
  {
    id: "bubble-clicker",
    title: "Bubble Pop Clicker",
    description: "Pop bubbles endlessly and watch your score soar!",
    category: "clicker",
    icon: MousePointer,
    path: "/games/bubble-clicker",
    thumbnail: "🫧",
    difficulty: "easy",
    keywords: ["bubble game", "popping", "clicker", "satisfying"]
  },

  // MEMORY GAMES (5)
  {
    id: "memory-cards",
    title: "Memory Card Match",
    description: "Find matching pairs of cards in this classic memory game.",
    category: "memory",
    icon: Eye,
    path: "/games/memory-cards",
    thumbnail: "🃏",
    difficulty: "medium",
    keywords: ["memory game", "matching", "cards", "concentration"]
  },
  {
    id: "simon-says",
    title: "Simon Says",
    description: "Repeat the pattern by clicking the colored buttons.",
    category: "memory",
    icon: Eye,
    path: "/games/simon-says",
    thumbnail: "🔵",
    difficulty: "hard",
    keywords: ["simon says", "pattern memory", "sequence", "colors"]
  },
  {
    id: "number-memory",
    title: "Number Memory",
    description: "Remember and type back the sequence of numbers.",
    category: "memory",
    icon: Eye,
    path: "/games/number-memory",
    thumbnail: "🔢",
    difficulty: "hard",
    keywords: ["number memory", "sequence memory", "digits", "recall"]
  },
  {
    id: "visual-memory",
    title: "Visual Memory",
    description: "Remember the positions of highlighted squares.",
    category: "memory",
    icon: Eye,
    path: "/games/visual-memory",
    thumbnail: "⬜",
    difficulty: "hard",
    keywords: ["visual memory", "spatial memory", "grid", "recall"]
  },
  {
    id: "sequence-recall",
    title: "Sequence Recall",
    description: "Watch and repeat increasingly complex sequences.",
    category: "memory",
    icon: Eye,
    path: "/games/sequence-recall",
    thumbnail: "🎯",
    difficulty: "medium",
    keywords: ["sequence", "memory", "recall", "pattern"]
  },

  // STRATEGY GAMES (5)
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Classic Tic Tac Toe against a smart AI opponent.",
    category: "strategy",
    icon: Grid3x3,
    path: "/games/tic-tac-toe",
    thumbnail: "⭕",
    difficulty: "easy",
    keywords: ["tic tac toe", "strategy", "AI game", "classic"]
  },
  {
    id: "connect-four",
    title: "Connect Four",
    description: "Connect four discs in a row before your opponent!",
    category: "strategy",
    icon: Grid3x3,
    path: "/games/connect-four",
    thumbnail: "🔴",
    difficulty: "medium",
    keywords: ["connect four", "strategy", "board game", "logic"]
  },
  {
    id: "nim-game",
    title: "Nim Game",
    description: "Take turns removing items. Don't take the last one!",
    category: "strategy",
    icon: Dices,
    path: "/games/nim-game",
    thumbnail: "🎲",
    difficulty: "medium",
    keywords: ["nim", "strategy", "mathematical game", "logic"]
  },
  {
    id: "tower-defense",
    title: "Mini Tower Defense",
    description: "Place towers strategically to stop the invaders!",
    category: "strategy",
    icon: Target,
    path: "/games/tower-defense",
    thumbnail: "🗼",
    difficulty: "hard",
    keywords: ["tower defense", "strategy", "placement", "defense"]
  },
  {
    id: "chess-puzzles",
    title: "Chess Puzzles",
    description: "Solve chess puzzles and checkmate in one move!",
    category: "strategy",
    icon: Grid3x3,
    path: "/games/chess-puzzles",
    thumbnail: "♟️",
    difficulty: "hard",
    keywords: ["chess", "puzzles", "checkmate", "strategy"]
  },

  // CASUAL GAMES (5)
  {
    id: "coin-flip",
    title: "Coin Flip",
    description: "Flip a coin and test your luck!",
    category: "casual",
    icon: Dices,
    path: "/games/coin-flip",
    thumbnail: "🪙",
    difficulty: "easy",
    keywords: ["coin flip", "random", "luck", "heads tails"]
  },
  {
    id: "dice-roller",
    title: "Dice Roller",
    description: "Roll dice for games, decisions, or fun!",
    category: "casual",
    icon: Dices,
    path: "/games/dice-roller",
    thumbnail: "🎲",
    difficulty: "easy",
    keywords: ["dice", "random", "rolling", "game"]
  },
  {
    id: "fortune-wheel",
    title: "Fortune Wheel",
    description: "Spin the wheel of fortune and see what you get!",
    category: "casual",
    icon: Target,
    path: "/games/fortune-wheel",
    thumbnail: "🎡",
    difficulty: "easy",
    keywords: ["wheel", "fortune", "spinning", "random"]
  },
  {
    id: "color-picker",
    title: "Random Color Picker",
    description: "Generate random colors for design and fun!",
    category: "casual",
    icon: CircleDot,
    path: "/games/color-picker",
    thumbnail: "🎨",
    difficulty: "easy",
    keywords: ["color picker", "random color", "design", "palette"]
  },
  {
    id: "magic-8ball",
    title: "Magic 8-Ball",
    description: "Ask a yes/no question and get a mystical answer!",
    category: "casual",
    icon: Eye,
    path: "/games/magic-8ball",
    thumbnail: "🎱",
    difficulty: "easy",
    keywords: ["magic 8 ball", "fortune", "questions", "answers"]
  },
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getGamesByCategory = (category: string): Game[] => {
  if (category === "all") return games;
  return games.filter(game => game.category === category);
};
