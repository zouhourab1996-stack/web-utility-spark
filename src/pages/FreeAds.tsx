import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdCard } from "@/components/AdCard";
import { AdFilters } from "@/components/AdFilters";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

interface Ad {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  location: string;
  images: string[];
  created_at: string;
  views: number;
}

export default function FreeAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAds();
  }, []);

  useEffect(() => {
    filterAndSortAds();
  }, [ads, searchQuery, selectedCategory, sortBy]);

  const loadAds = async () => {
    try {
      // Check if Supabase client is properly initialized
      if (!supabase) {
        console.warn("Supabase client not initialized");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error("Failed to load ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortAds = () => {
    let result = [...ads];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(ad =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter(ad => ad.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === "views") return (b.views || 0) - (a.views || 0);
      return 0;
    });

    setFilteredAds(result);
  };

  return (
    <>
      <SEO
        title={seoConfigs["/free-ads"].title}
        description={seoConfigs["/free-ads"].description}
        keywords={seoConfigs["/free-ads"].keywords}
        canonical={seoConfigs["/free-ads"].canonical}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Classifieds & Ads
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Post your ad instantly - no registration required. Buy, sell, trade anything!
          </p>
          <Link to="/free-ads/post">
            <Button size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Post Free Ad
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <AdFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Stats */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredAds.length} of {ads.length} ads
        </div>

        {/* Ads Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading ads...</p>
          </div>
        ) : filteredAds.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border">
            <p className="text-muted-foreground mb-4">
              {ads.length === 0 ? "No ads posted yet. Be the first!" : "No ads match your filters."}
            </p>
            <Link to="/free-ads/post">
              <Button>Post Your First Ad</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
