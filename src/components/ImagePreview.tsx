import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Scan } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
  onClear: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const ImagePreview = ({ imageUrl, onClear, onAnalyze, isAnalyzing }: ImagePreviewProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-card shadow-elegant animate-scale-in">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt="Uploaded carpet" 
          className="w-full h-auto max-h-[500px] object-contain bg-muted"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 rounded-full shadow-lg"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-6 space-y-4">
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <Scan className="mr-2 h-5 w-5" />
              Analyze for Defects
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
