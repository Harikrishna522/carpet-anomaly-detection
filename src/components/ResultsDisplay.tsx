import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Activity } from "lucide-react";

interface DetectionResult {
  hasDefect: boolean;
  confidence: number;
  defectType?: string;
  processingTime: number;
}

interface ResultsDisplayProps {
  result: DetectionResult;
}

export const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const { hasDefect, confidence, defectType, processingTime } = result;

  return (
    <Card className="p-6 bg-gradient-card shadow-elegant animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Detection Results</h3>
      
      <div className="space-y-6">
        {/* Status Badge */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            {hasDefect ? (
              <AlertCircle className="w-6 h-6 text-warning" />
            ) : (
              <CheckCircle className="w-6 h-6 text-success" />
            )}
            <div>
              <p className="font-semibold text-foreground">
                {hasDefect ? "Defect Detected" : "No Defects Found"}
              </p>
              <p className="text-sm text-muted-foreground">
                Confidence: {(confidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <Badge 
            variant={hasDefect ? "destructive" : "default"}
            className={hasDefect ? "bg-warning" : "bg-success"}
          >
            {hasDefect ? "Warning" : "Pass"}
          </Badge>
        </div>

        {/* Defect Type */}
        {hasDefect && defectType && (
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Defect Type</p>
            <p className="font-semibold text-foreground capitalize">{defectType}</p>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-primary" />
              <p className="text-sm text-muted-foreground">Processing Time</p>
            </div>
            <p className="text-xl font-bold text-foreground">{processingTime}ms</p>
          </div>
          
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Model</p>
            <p className="text-xl font-bold text-foreground">ResNet50</p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-muted-foreground">Confidence Level</p>
            <p className="text-sm font-semibold text-foreground">{(confidence * 100).toFixed(1)}%</p>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
