import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { getOptimizedImageUrl } from "@/utils/cloudinary";

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

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  const formattedDate = new Date(ad.created_at).toLocaleDateString();
  const imageUrl = ad.images[0] ? getOptimizedImageUrl(ad.images[0], 400) : '/placeholder.svg';

  return (
    <Link to={`/free-ads/${ad.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 flex-1">{ad.title}</h3>
            <Badge variant="secondary">{ad.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-muted-foreground line-clamp-2 text-sm mb-3">
            {ad.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {ad.location}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {ad.views || 0}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-3 border-t flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{ad.price}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
