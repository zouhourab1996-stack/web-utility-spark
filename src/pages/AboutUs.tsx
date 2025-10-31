import { Calculator, Users, Heart, Target, Sparkles } from "lucide-react";
import SEO from "@/components/SEO";

import { seoConfigs } from "@/config/seo";

const AboutUs = () => {
  return (
    <>
      <SEO
        title={seoConfigs["/about"].title}
        description={seoConfigs["/about"].description}
        keywords={seoConfigs["/about"].keywords}
        canonical={seoConfigs["/about"].canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Calculator className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Smart Tools Hub
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your one-stop destination for free, easy-to-use online tools that make everyday tasks simpler and faster.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide powerful, accessible online tools completely free of charge. We believe that everyone deserves access to quality productivity and calculation tools without paywalls or complicated software installations.
                  </p>
                </div>

                <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Over 30 free tools including calculators, converters, generators, and productivity apps. Plus 50+ browser games and a free ads platform for community classifieds. All tools work instantly in your browser with no downloads required.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-br from-card to-card/50 p-8 md:p-12 rounded-lg border border-border mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">100% Free</h3>
                    <p className="text-sm text-muted-foreground">
                      No hidden fees, no subscriptions, no paywalls
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">User-Friendly</h3>
                    <p className="text-sm text-muted-foreground">
                      Simple, intuitive interfaces for everyone
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Privacy-Focused</h3>
                    <p className="text-sm text-muted-foreground">
                      Your data stays on your device
                    </p>
                  </div>
                </div>
              </div>

              {/* Community Support */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12 rounded-lg text-center">
                <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl font-bold mb-4">Supporting Communities</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  All donations received through Smart Tools Hub go toward completing a community agricultural water well in rural Tunisia 🌾. We're committed to giving back and supporting sustainable development projects.
                </p>
                <p className="text-muted-foreground">
                  Your support helps us maintain this free platform while making a real difference in communities that need it most.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
