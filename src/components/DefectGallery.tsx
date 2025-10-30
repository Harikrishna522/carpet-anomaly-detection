import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageResult {
  id: string;
  imageUrl: string;
  hasDefect: boolean;
  confidence: number;
  defectType?: string;
  fileName: string;
}

interface DefectGalleryProps {
  results: ImageResult[];
  onClear: () => void;
}

export const DefectGallery = ({ results, onClear }: DefectGalleryProps) => {
  const defectiveProducts = results.filter(r => r.hasDefect);
  const goodProducts = results.filter(r => !r.hasDefect);

  return (
    <Card className="p-6 bg-gradient-card shadow-elegant animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Batch Analysis Results</h3>
        <Button onClick={onClear} variant="outline" size="sm">
          Clear All
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-muted/50 text-center">
          <p className="text-2xl font-bold text-foreground">{results.length}</p>
          <p className="text-sm text-muted-foreground">Total Images</p>
        </div>
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 text-center">
          <p className="text-2xl font-bold text-warning">{defectiveProducts.length}</p>
          <p className="text-sm text-muted-foreground">Defects Found</p>
        </div>
        <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
          <p className="text-2xl font-bold text-success">{goodProducts.length}</p>
          <p className="text-sm text-muted-foreground">Good Products</p>
        </div>
      </div>

      {/* Defective Products Section */}
      {defectiveProducts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-warning" />
            <h4 className="text-lg font-semibold text-foreground">Defective Products</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {defectiveProducts.map((result) => (
              <Card key={result.id} className="overflow-hidden border-warning/30 bg-card hover:shadow-lg transition-all duration-300">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img 
                    src={result.imageUrl} 
                    alt={result.fileName}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">
                    Defect
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground mb-1 truncate" title={result.fileName}>
                    {result.fileName}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground capitalize">
                      {result.defectType}
                    </span>
                    <span className="text-muted-foreground">
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Good Products Section (Collapsible) */}
      {goodProducts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-success" />
            <h4 className="text-lg font-semibold text-foreground">Good Products</h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {goodProducts.map((result) => (
              <Card key={result.id} className="overflow-hidden border-success/30 bg-card">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img 
                    src={result.imageUrl} 
                    alt={result.fileName}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
                    Pass
                  </Badge>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-foreground truncate" title={result.fileName}>
                    {result.fileName}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
