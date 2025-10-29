export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  schema?: object;
}

export const siteConfig = {
  name: "Smart Tools Hub",
  url: "https://zouhourab1996-stack.github.io/web-utility-spark",
  ogImage: "/og-image.png",
};

export const seoConfigs: Record<string, SEOConfig> = {
  "/": {
    title: "Smart Tools Hub — Free Online Calculators & Converters",
    description: "Free online tools including calculators, converters, and productivity tools. Access 19+ professional utilities for finance, health, time management, and more.",
    keywords: "online tools, free calculators, unit converter, password generator, QR generator, BMI calculator, loan calculator, compound interest calculator, productivity tools, web utilities, online converters, free tools online",
    canonical: "/",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Smart Tools Hub",
      "description": "Free online calculators, converters, and productivity tools",
      "url": siteConfig.url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  },
  "/compound-interest": {
    title: "Compound Interest Calculator — Calculate Investment Growth",
    description: "Free compound interest calculator. Calculate how your investments grow over time with customizable rates, principal amounts, and compounding frequencies.",
    keywords: "compound interest calculator, investment calculator, savings growth, financial calculator, compound returns, investment growth calculator, interest calculator online, compound interest formula",
    canonical: "/compound-interest",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Compound Interest Calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Calculate compound interest and investment growth over time"
    }
  },
  "/loan-calculator": {
    title: "Loan Calculator — Monthly Payment & Interest Estimator",
    description: "Calculate monthly loan payments, total interest, and amortization schedules. Free tool for mortgages, auto loans, personal loans, and more.",
    keywords: "loan calculator, mortgage calculator, monthly payment calculator, loan interest calculator, amortization calculator, auto loan calculator, personal loan calculator, home loan calculator",
    canonical: "/loan-calculator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Loan Calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/savings-calculator": {
    title: "Savings Calculator — Plan Your Financial Goals Free",
    description: "Plan and track your savings goals with our free calculator. Calculate how much you need to save monthly to reach your financial targets.",
    keywords: "savings calculator, savings goal calculator, financial planning tool, retirement savings calculator, savings planner, monthly savings calculator, future value calculator",
    canonical: "/savings-calculator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Savings Calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/stopwatch": {
    title: "Online Stopwatch & Timer — Free with Lap Timing",
    description: "Professional online stopwatch with lap timing and countdown timer. Perfect for workouts, cooking, productivity, and time tracking.",
    keywords: "online stopwatch, countdown timer, lap timer, digital stopwatch, online timer, free stopwatch, interval timer, web stopwatch, workout timer",
    canonical: "/stopwatch",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Online Stopwatch & Timer",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/unit-converter": {
    title: "Unit Converter — Convert Length, Weight, Temperature",
    description: "Free online unit converter for length, weight, temperature, volume, area, and more. Instant conversions between metric and imperial units.",
    keywords: "unit converter, metric converter, length converter, weight converter, temperature converter, online conversion tool, imperial to metric, distance converter, volume converter",
    canonical: "/unit-converter",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Unit Converter",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/bmi-calculator": {
    title: "BMI Calculator — Body Mass Index Calculator Free",
    description: "Calculate your Body Mass Index (BMI) with our free tool. Get instant results with health recommendations for metric and imperial units.",
    keywords: "BMI calculator, body mass index calculator, BMI checker, health calculator, weight calculator, ideal weight calculator, obesity calculator, BMI chart",
    canonical: "/bmi-calculator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "BMI Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/age-calculator": {
    title: "Age Calculator — Calculate Exact Age in Years, Days",
    description: "Calculate your exact age down to days, hours, and minutes. Free age calculator with precise results from any birth date.",
    keywords: "age calculator, calculate age, age counter, how old am I, exact age calculator, age in days calculator, birth date calculator, date of birth calculator",
    canonical: "/age-calculator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Age Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/currency-converter": {
    title: "Currency Converter — Live Exchange Rates 150+ Currencies",
    description: "Convert between world currencies with real-time exchange rates. Free currency converter supporting USD, EUR, GBP, and 150+ currencies.",
    keywords: "currency converter, exchange rate calculator, money converter, forex converter, USD to EUR, live currency rates, currency exchange, foreign exchange calculator",
    canonical: "/currency-converter",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Currency Converter",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/password-generator": {
    title: "Strong Password Generator — Create Secure Passwords",
    description: "Generate strong, secure random passwords with customizable length and character options. Free password generator tool for online security.",
    keywords: "password generator, strong password generator, random password, secure password creator, password maker, password tool, generate password online, random password generator",
    canonical: "/password-generator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Password Generator",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/word-counter": {
    title: "Word Counter — Count Words, Characters & Sentences",
    description: "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for essays, articles, and social media.",
    keywords: "word counter, character counter, word count tool, text counter, sentence counter, essay word counter, online word count, paragraph counter, text analyzer",
    canonical: "/word-counter",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Word Counter",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/qr-generator": {
    title: "QR Code Generator — Create Free QR Codes Instantly",
    description: "Free QR code generator for URLs, text, and contact information. Create and download custom QR codes in seconds.",
    keywords: "QR code generator, create QR code, free QR generator, QR code maker, custom QR code, generate QR code, online QR generator, QR code creator",
    canonical: "/qr-generator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "QR Code Generator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/random-number": {
    title: "Random Number Generator — Generate Random Numbers",
    description: "Generate random numbers for any range instantly. Free online random number generator for games, lottery, raffles, and research.",
    keywords: "random number generator, random number picker, number randomizer, lottery number generator, RNG online, random integer generator, number picker online",
    canonical: "/random-number",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Random Number Generator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/percentage-calculator": {
    title: "Percentage Calculator — Calculate Percentages Easily",
    description: "Free percentage calculator. Calculate percentage increases, decreases, discounts, tips, and more with instant results.",
    keywords: "percentage calculator, percent calculator, calculate percentage, percentage increase calculator, discount calculator, percentage change calculator, tip calculator percentage",
    canonical: "/percentage-calculator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Percentage Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/image-compressor": {
    title: "Image Compressor — Reduce Image Size Without Loss",
    description: "Free online image compressor. Compress JPG, PNG, and WebP images while maintaining quality. Reduce file sizes instantly.",
    keywords: "image compressor, compress image, reduce image size, image optimizer, photo compressor, image size reducer, online image compression, compress photo online",
    canonical: "/image-compressor",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Image Compressor",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/text-to-speech": {
    title: "Text to Speech — Free Online TTS Generator",
    description: "Convert text to natural-sounding speech with adjustable speed and voice options. Free online text-to-speech tool for any text.",
    keywords: "text to speech, TTS generator, text reader, speech synthesizer, online text to speech, voice generator, read text aloud, TTS online",
    canonical: "/text-to-speech",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Text to Speech",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/gpa-calculator": {
    title: "GPA Calculator — Calculate Grade Point Average Free",
    description: "Calculate your semester or cumulative GPA with our free tool. Supports multiple grading scales and credit hours.",
    keywords: "GPA calculator, grade point average calculator, college GPA calculator, cumulative GPA calculator, semester GPA, university GPA calculator, GPA converter",
    canonical: "/gpa-calculator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/pomodoro-timer": {
    title: "Pomodoro Timer — Boost Productivity with Focus Time",
    description: "Free Pomodoro timer for productive work sessions. Includes customizable work/break intervals and session tracking.",
    keywords: "pomodoro timer, productivity timer, focus timer, work timer, time management tool, pomodoro technique, study timer, concentration timer",
    canonical: "/pomodoro-timer",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Pomodoro Timer",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/base64-converter": {
    title: "Base64 Encoder/Decoder — Convert Base64 Strings",
    description: "Free online Base64 encoder and decoder. Convert text and files to/from Base64 format instantly.",
    keywords: "base64 converter, base64 encoder, base64 decoder, encode base64, decode base64, base64 tool, online base64, base64 string converter",
    canonical: "/base64-converter",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Base64 Converter",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/random-name-picker": {
    title: "Random Name Picker — Select Random Names from List",
    description: "Free random name picker tool. Randomly select names from your list for games, raffles, classrooms, and giveaways.",
    keywords: "random name picker, name selector, random picker, name generator, raffle picker, classroom picker, team picker, name randomizer",
    canonical: "/random-name-picker",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Random Name Picker",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "/recipe-scaler": {
    title: "Recipe Scaler — Scale Recipes for Any Serving Size",
    description: "Free recipe scaler and ingredient converter. Scale recipes up or down instantly.",
    keywords: "recipe scaler, ingredient converter, cooking calculator, recipe adjuster",
    canonical: "/recipe-scaler"
  },
  "/price-comparator": {
    title: "Price Comparator — Compare Unit Prices",
    description: "Compare grocery prices per unit to find the best value.",
    keywords: "price comparison, unit price, grocery deals, best value finder",
    canonical: "/price-comparator"
  },
  "/natural-unit-converter": {
    title: "Natural Unit Converter — Convert Units Naturally",
    description: "Type conversions like '5 feet to meters'. Natural language unit converter.",
    keywords: "unit converter, natural language, feet to meters, conversion tool",
    canonical: "/natural-unit-converter"
  },
  "/meeting-time-finder": {
    title: "Meeting Time Finder — Timezone Converter",
    description: "Find perfect meeting times across multiple timezones.",
    keywords: "timezone converter, meeting scheduler, time zones, global meetings",
    canonical: "/meeting-time-finder"
  },
  "/donation-qr-builder": {
    title: "Donation QR Builder — Create Payment QR Codes",
    description: "Generate QR codes for PayPal and crypto donations.",
    keywords: "donation QR, payment QR code, PayPal QR, crypto donation",
    canonical: "/donation-qr-builder"
  },
  "/pantry-tracker": {
    title: "Pantry Tracker — Track Food Expiration",
    description: "Track expiration dates and reduce food waste.",
    keywords: "pantry tracker, expiration tracker, food waste, kitchen organizer",
    canonical: "/pantry-tracker"
  },
  "/accessibility-checker": {
    title: "Accessibility Checker — WCAG Contrast Tool",
    description: "Check color contrast for WCAG accessibility compliance.",
    keywords: "accessibility checker, contrast checker, WCAG, color contrast",
    canonical: "/accessibility-checker"
  },
  "/policy-generator": {
    title: "Policy Generator — Privacy Policy & Terms Creator",
    description: "Generate privacy policy and terms of service for free.",
    keywords: "privacy policy generator, terms generator, legal documents",
    canonical: "/policy-generator"
  },
  "/holiday-planner": {
    title: "Holiday Planner — Find Public Holidays",
    description: "Find upcoming public holidays by country.",
    keywords: "holiday planner, public holidays, vacation planner",
    canonical: "/holiday-planner"
  },
  "/text-to-slug": {
    title: "Text to Slug — URL & Filename Converter",
    description: "Convert text to URL-friendly slugs and safe filenames.",
    keywords: "slug generator, URL slug, filename sanitizer, text converter",
    canonical: "/text-to-slug"
  },
  "/currency-rounder": {
    title: "Currency Rounder — Round Prices for Tags",
    description: "Round prices to convenient amounts for retail displays.",
    keywords: "price rounder, currency rounder, retail pricing",
    canonical: "/currency-rounder"
  },
  "/privacy-policy": {
    title: "Privacy Policy — Smart Tools Hub",
    description: "Privacy policy for Smart Tools Hub. Learn how we protect your data.",
    keywords: "privacy policy, data protection, user privacy",
    canonical: "/privacy-policy"
  },
  "/terms-of-service": {
    title: "Terms of Service — Smart Tools Hub",
    description: "Terms of service for using Smart Tools Hub.",
    keywords: "terms of service, terms and conditions, user agreement",
    canonical: "/terms-of-service"
  },
  "/contact": {
    title: "Contact Us — Smart Tools Hub",
    description: "Get in touch with Smart Tools Hub. We'd love to hear from you.",
    keywords: "contact us, feedback, support, help",
    canonical: "/contact"
  }
};
