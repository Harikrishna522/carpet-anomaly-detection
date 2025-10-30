import { useState } from "react";
import { Scan, Zap, Shield, TrendingUp } from "lucide-react";
import { UploadZone } from "@/components/UploadZone";
import { ImagePreview } from "@/components/ImagePreview";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface DetectionResult {
  hasDefect: boolean;
  confidence: number;
  defectType?: string;
  processingTime: number;
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setResult(null);
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate ML processing
    setTimeout(() => {
      const hasDefect = Math.random() > 0.5;
      const defectTypes = ["hole", "stain", "color", "cut"];
      
      setResult({
        hasDefect,
        confidence: 0.85 + Math.random() * 0.14,
        defectType: hasDefect ? defectTypes[Math.floor(Math.random() * defectTypes.length)] : undefined,
        processingTime: Math.floor(800 + Math.random() * 700),
      });
      setIsAnalyzing(false);
      
      if (hasDefect) {
        toast.warning("Defect detected in carpet!");
      } else {
        toast.success("No defects found - carpet is in good condition!");
      }
    }, 2000);
  };

  const handleClear = () => {
    setUploadedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by ResNet50</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            AI Carpet Defect Detection
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Advanced machine learning technology to instantly detect and classify carpet defects with industry-leading accuracy
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              <Scan className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get results in under 2 seconds with our optimized ML pipeline
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              <Shield className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">High Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                95%+ detection accuracy trained on thousands of carpet samples
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              <TrendingUp className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Quality Control</h3>
              <p className="text-sm text-muted-foreground">
                Automated defect classification for streamlined QA processes
              </p>
            </Card>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              {!uploadedImage ? (
                <UploadZone onImageUpload={handleImageUpload} />
              ) : (
                <ImagePreview
                  imageUrl={uploadedImage}
                  onClear={handleClear}
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                />
              )}
            </div>

            {/* Results Section */}
            <div>
              {result ? (
                <ResultsDisplay result={result} />
              ) : (
                <Card className="p-12 bg-gradient-card border-border text-center">
                  <Scan className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Upload an image and click analyze to see detection results
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
