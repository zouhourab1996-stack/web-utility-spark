import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

const ToolCard = ({ title, description, icon: Icon, path }: ToolCardProps) => {
  return (
    <Link to={path} className="block group">
      <Card className="card-hover cursor-pointer h-full relative overflow-hidden bg-card border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="relative z-10">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition">
            <Icon className="w-7 h-7 text-primary group-hover:text-accent smooth-transition" />
          </div>
          <CardTitle className="text-xl group-hover:text-primary smooth-transition">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ToolCard;
