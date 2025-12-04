import { useState } from "react";
import { Scan, Zap, Shield, TrendingUp } from "lucide-react";
import { UploadZone } from "@/components/UploadZone";
import { DefectGallery, ImageResult } from "@/components/DefectGallery";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ImageResult[]>([]);

  const handleImagesUpload = async (files: File[]) => {
    setIsAnalyzing(true);
    toast.success(`Analyzing ${files.length} image${files.length > 1 ? 's' : ''}...`);
    
    const imagePromises = files.map(async (file) => {
      return new Promise<ImageResult>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const base64Image = e.target?.result as string;
            
            // Call the edge function for real AI analysis
            const { data: analysis, error } = await supabase.functions.invoke('analyze-carpet-defect', {
              body: {
                image: base64Image,
                fileName: file.name,
              },
            });

            if (error) {
              throw new Error(error.message || 'Analysis failed');
            }
            
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              imageUrl: base64Image,
              hasDefect: analysis.hasDefect,
              confidence: analysis.confidence,
              defectType: analysis.defectType || undefined,
              fileName: file.name,
            });
          } catch (error) {
            console.error('Analysis error:', error);
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    });

    try {
      const analysisResults = await Promise.all(imagePromises);
      setResults(analysisResults);
      
      const defectCount = analysisResults.filter(r => r.hasDefect).length;
      if (defectCount > 0) {
        toast.warning(`Analysis complete: ${defectCount} defective product${defectCount > 1 ? 's' : ''} found!`);
      } else {
        toast.success("Analysis complete: All products passed inspection!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
      console.error('Batch analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setResults([]);
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
        <div className="max-w-6xl mx-auto">
          {results.length === 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              <UploadZone onImagesUpload={handleImagesUpload} />
              
              <Card className="p-12 bg-gradient-card border-border text-center">
                <Scan className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  {isAnalyzing ? "Analyzing Images..." : "No Analysis Yet"}
                </h3>
                <p className="text-muted-foreground">
                  {isAnalyzing 
                    ? "Processing your images for defect detection" 
                    : "Upload images to start batch defect detection"}
                </p>
              </Card>
            </div>
          ) : (
            <DefectGallery results={results} onClear={handleClear} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
