import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChefHat, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

const RecipeScaler = () => {
  const [originalServings, setOriginalServings] = useState<number>(4);
  const [desiredServings, setDesiredServings] = useState<number>(6);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Flour", amount: 2, unit: "cups" },
  ]);
  const { toast } = useToast();
  const seoConfig = seoConfigs["/recipe-scaler"];

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: 0, unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const scaledAmount = (amount: number) => {
    if (!originalServings) return amount;
    return ((amount * desiredServings) / originalServings).toFixed(2);
  };

  const copyScaledRecipe = () => {
    const scaled = ingredients
      .map((ing) => `${scaledAmount(ing.amount)} ${ing.unit} ${ing.name}`)
      .join("\n");
    navigator.clipboard.writeText(`Recipe for ${desiredServings} servings:\n${scaled}`);
    toast({
      title: "Copied!",
      description: "Scaled recipe copied to clipboard",
    });
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Recipe Scaler & Ingredient Converter</h1>
          <p className="text-lg text-muted-foreground">
            Scale recipes up or down for any serving size
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Scale Your Recipe</CardTitle>
            <CardDescription>Enter your recipe details and adjust serving size</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Original Servings</Label>
                <Input
                  type="number"
                  value={originalServings}
                  onChange={(e) => setOriginalServings(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <Label>Desired Servings</Label>
                <Input
                  type="number"
                  value={desiredServings}
                  onChange={(e) => setDesiredServings(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Ingredients</Label>
              {ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      placeholder="Ingredient name"
                      value={ing.name}
                      onChange={(e) => updateIngredient(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={ing.amount || ""}
                      onChange={(e) => updateIngredient(index, "amount", Number(e.target.value))}
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      placeholder="Unit"
                      value={ing.unit}
                      onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                    />
                  </div>
                  <div className="w-32 font-semibold text-primary">
                    {scaledAmount(ing.amount)} {ing.unit}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={addIngredient} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Ingredient
              </Button>
              <Button onClick={copyScaledRecipe} className="ml-auto">
                Copy Scaled Recipe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RecipeScaler;
