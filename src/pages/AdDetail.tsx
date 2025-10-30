import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAdById, updateAdViews, Ad } from "@/utils/indexedDB";
import { getOptimizedImageUrl } from "@/utils/cloudinary";
import { ArrowLeft, MapPin, Calendar, Eye, Share2, Facebook, Twitter } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

export default function AdDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadAd();
  }, [id]);

  const loadAd = async () => {
    if (!id) return;
    try {
      const adData = await getAdById(id);
      if (adData) {
        setAd(adData);
        await updateAdViews(id);
      } else {
        navigate("/free-ads");
      }
    } catch (error) {
      console.error("Failed to load ad:", error);
      navigate("/free-ads");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out: ${ad?.title}`;
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Share link copied to clipboard" });
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Loading ad...</p>
        </div>
      </Layout>
    );
  }

  if (!ad) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Ad not found</p>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(ad.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const schemaData = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ad.title,
    "description": ad.description,
    "offers": {
      "@type": "Offer",
      "price": ad.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Smart Tools Hub"
      }
    },
    "image": ad.images[0] || "",
  });

  return (
    <Layout>
      <SEO
        title={`${ad.title} - Free Ads`}
        description={ad.description.substring(0, 160)}
        keywords={`${ad.category}, ${ad.title}, buy ${ad.category}, ${ad.location}`}
        canonical={`https://zouhourab1996-stack.github.io/web-utility-spark/#/free-ads/${ad.id}`}
        ogImage={ad.images[0]}
        schema={schemaData}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/free-ads")}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ads
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            {ad.images.length > 0 ? (
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={getOptimizedImageUrl(ad.images[selectedImage], 1200)}
                    alt={ad.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                {ad.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {ad.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square overflow-hidden rounded-lg border-2 ${
                          selectedImage === idx ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={getOptimizedImageUrl(img, 200)}
                          alt={`${ad.title} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">No images available</p>
              </div>
            )}

            {/* Description */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{ad.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{ad.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{ad.category}</Badge>
                  </div>
                  <p className="text-3xl font-bold text-primary">{ad.price}</p>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{ad.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span>{ad.views || 0} views</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Card */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this ad
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('whatsapp')}
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('copy')}
                  >
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Post Your Ad CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Want to sell something?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Post your free ad in seconds
                </p>
                <Link to="/free-ads/post">
                  <Button variant="secondary" className="w-full">
                    Post Free Ad
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
