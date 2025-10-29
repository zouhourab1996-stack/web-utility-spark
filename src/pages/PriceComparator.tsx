import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const PriceComparator = () => {
  const [product1Price, setProduct1Price] = useState<number>(5.99);
  const [product1Size, setProduct1Size] = useState<number>(500);
  const [product2Price, setProduct2Price] = useState<number>(8.99);
  const [product2Size, setProduct2Size] = useState<number>(750);
  const [unit, setUnit] = useState<string>("g");
  const seoConfig = seoConfigs["/price-comparator"];

  const calculatePricePerUnit = (price: number, size: number) => {
    if (size === 0) return 0;
    return price / size;
  };

  const pricePerUnit1 = calculatePricePerUnit(product1Price, product1Size);
  const pricePerUnit2 = calculatePricePerUnit(product2Price, product2Size);

  const getBetterDeal = () => {
    if (pricePerUnit1 < pricePerUnit2) return "Product 1";
    if (pricePerUnit2 < pricePerUnit1) return "Product 2";
    return "Equal";
  };

  const savingsPercentage = () => {
    if (pricePerUnit1 === 0 || pricePerUnit2 === 0) return 0;
    const diff = Math.abs(pricePerUnit1 - pricePerUnit2);
    const max = Math.max(pricePerUnit1, pricePerUnit2);
    return ((diff / max) * 100).toFixed(1);
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Price-Per-Unit Grocery Comparator</h1>
          <p className="text-lg text-muted-foreground">
            Compare products to find the best value for your money
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Product 1</CardTitle>
              <CardDescription>Enter price and size</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={product1Price}
                  onChange={(e) => setProduct1Price(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Size</Label>
                <Input
                  type="number"
                  value={product1Size}
                  onChange={(e) => setProduct1Size(Number(e.target.value))}
                />
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Price per {unit}</p>
                <p className="text-2xl font-bold text-primary">
                  ${pricePerUnit1.toFixed(4)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product 2</CardTitle>
              <CardDescription>Enter price and size</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={product2Price}
                  onChange={(e) => setProduct2Price(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Size</Label>
                <Input
                  type="number"
                  value={product2Size}
                  onChange={(e) => setProduct2Size(Number(e.target.value))}
                />
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Price per {unit}</p>
                <p className="text-2xl font-bold text-primary">
                  ${pricePerUnit2.toFixed(4)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Unit Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g., g, ml, oz, lb"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg mb-2">Best Deal:</p>
              <p className="text-3xl font-bold text-primary mb-2">{getBetterDeal()}</p>
              {getBetterDeal() !== "Equal" && (
                <p className="text-muted-foreground">
                  Save up to {savingsPercentage()}% by choosing the better value
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PriceComparator;
