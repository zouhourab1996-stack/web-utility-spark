import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Apple, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

interface PantryItem {
  id: string;
  name: string;
  expiryDate: string;
  quantity: number;
}

const PantryTracker = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [name, setName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { toast } = useToast();
  const seoConfig = seoConfigs["/pantry-tracker"];

  const addItem = () => {
    if (!name || !expiryDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newItem: PantryItem = {
      id: Date.now().toString(),
      name,
      expiryDate,
      quantity,
    };

    setItems([...items, newItem]);
    setName("");
    setExpiryDate("");
    setQuantity(1);
    
    toast({
      title: "Item Added",
      description: `${name} added to pantry`,
    });
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0) return { text: "Expired", color: "text-red-500" };
    if (days === 0) return { text: "Expires Today", color: "text-orange-500" };
    if (days <= 3) return { text: `${days} days left`, color: "text-orange-500" };
    if (days <= 7) return { text: `${days} days left`, color: "text-yellow-600" };
    return { text: `${days} days left`, color: "text-green-600" };
  };

  const sortedItems = [...items].sort((a, b) => {
    return getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate);
  });

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Apple className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Recipe Expiry / Pantry Tracker</h1>
          <p className="text-lg text-muted-foreground">
            Track expiration dates and reduce food waste
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Pantry Item</CardTitle>
            <CardDescription>Track items and their expiration dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Item Name</Label>
                <Input
                  placeholder="e.g., Milk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </div>
            <Button onClick={addItem} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add to Pantry
            </Button>
          </CardContent>
        </Card>

        {sortedItems.length > 0 ? (
          <div className="space-y-3">
            {sortedItems.map((item) => {
              const daysLeft = getDaysUntilExpiry(item.expiryDate);
              const status = getExpiryStatus(daysLeft);
              
              return (
                <Card key={item.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} | Expires: {item.expiryDate}
                      </p>
                      <p className={`text-sm font-medium ${status.color}`}>
                        {status.text}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No items in your pantry. Add items above to start tracking!
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default PantryTracker;
