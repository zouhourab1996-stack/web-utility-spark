import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Image as ImageIcon, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: "Error", description: "Please upload an image file", variant: "destructive" });
      return;
    }

    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      compressImage(event.target?.result as string, quality);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (imageSrc: string, compressionQuality: number) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const url = URL.createObjectURL(blob);
            setCompressedImage(url);
          }
        },
        'image/jpeg',
        compressionQuality / 100
      );
    };
    img.src = imageSrc;
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value[0]);
    if (originalImage) {
      compressImage(originalImage, value[0]);
    }
  };

  const downloadImage = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = 'compressed-image.jpg';
    link.click();
  };

  const formatSize = (bytes: number) => {
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Image Compressor",
    "description": "Compress images online, reduce file size while maintaining quality",
    "url": "https://zouhourab1996-stack.github.io/web-utility-spark/#/image-compressor",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <SEO
        title="Image Compressor — Reduce Image File Size Online"
        description="Compress images online for free. Reduce file size while maintaining quality. Perfect for optimizing images for web and email."
        keywords="image compressor, compress images, reduce image size, optimize images, image optimization, free image compressor, online tools"
        canonical="/#/image-compressor"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 mr-3 text-primary" />
              Image Compressor
            </h1>
            <p className="text-lg text-muted-foreground">
              Reduce image file size while maintaining quality
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compress Your Image</CardTitle>
              <CardDescription>Upload an image and adjust the quality slider</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Choose Image</Label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>

              {originalImage && (
                <>
                  <div className="space-y-2">
                    <Label>Compression Quality: {quality}%</Label>
                    <Slider
                      value={[quality]}
                      onValueChange={handleQualityChange}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Original</h3>
                      <img src={originalImage} alt="Original" className="w-full rounded-lg border" />
                      <p className="text-sm text-muted-foreground">Size: {formatSize(originalSize)}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Compressed</h3>
                      {compressedImage && (
                        <>
                          <img src={compressedImage} alt="Compressed" className="w-full rounded-lg border" />
                          <p className="text-sm text-muted-foreground">Size: {formatSize(compressedSize)}</p>
                          <p className="text-sm font-semibold text-primary">
                            Reduced by {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <Button onClick={downloadImage} className="w-full gradient-primary text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Compressed Image
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ImageCompressor;
