import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { saveAd, Ad } from "@/utils/indexedDB";
import { uploadMultipleImages } from "@/utils/cloudinary";
import { Upload, X, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000),
  category: z.string().min(1, "Please select a category"),
  price: z.string().min(1, "Price is required"),
  location: z.string().min(2, "Location is required").max(100),
});

const categories = [
  "Electronics",
  "Furniture",
  "Vehicles",
  "Real Estate",
  "Jobs",
  "Services",
  "Fashion",
  "Sports",
  "Other"
];

export default function PostAd() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      location: "",
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum 5 images allowed",
        variant: "destructive",
      });
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setUploading(true);
    try {
      // Upload images to Cloudinary
      let imageUrls: string[] = [];
      if (images.length > 0) {
        toast({
          title: "Uploading images...",
          description: "Please wait while we upload your images",
        });
        imageUrls = await uploadMultipleImages(images);
      }

      // Save ad to IndexedDB
      const ad: Ad = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        category: values.category,
        price: values.price,
        location: values.location,
        images: imageUrls,
        createdAt: Date.now(),
        views: 0,
      };

      await saveAd(ad);

      toast({
        title: "Ad posted successfully!",
        description: "Your ad is now live and visible to everyone",
      });

      navigate(`/free-ads/${ad.id}`);
    } catch (error) {
      console.error("Failed to post ad:", error);
      toast({
        title: "Failed to post ad",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <SEO
        title="Post Free Ad - Smart Tools Hub"
        description="Post your classified ad instantly. Add images, description, price, and location. No registration required. Your ad goes live immediately."
        keywords="post free ad, create ad, sell online, advertise free, classified posting"
        canonical="https://zouhourab1996-stack.github.io/web-utility-spark/#/free-ads/post"
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Post Your Free Ad</h1>
          <p className="text-muted-foreground">
            Fill in the details below and your ad will be live instantly
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., iPhone 13 Pro for sale" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your item in detail..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., $500 or Free" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div>
              <FormLabel>Images (Max 5)</FormLabel>
              <div className="mt-2">
                <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload images
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageSelect}
                    disabled={images.length >= 5}
                  />
                </label>

                {previews.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting Ad...
                </>
              ) : (
                "Post Ad Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
