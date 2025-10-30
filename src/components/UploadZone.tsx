import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
}

export const UploadZone = ({ onImageUpload }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${
        isDragging 
          ? "border-primary bg-primary/5 shadow-glow" 
          : "border-border bg-gradient-card hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="flex flex-col items-center justify-center p-12 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        <div className={`rounded-full p-6 mb-4 transition-all duration-300 ${
          isDragging 
            ? "bg-primary/20 animate-pulse-glow" 
            : "bg-primary/10"
        }`}>
          {isDragging ? (
            <ImageIcon className="w-12 h-12 text-primary" />
          ) : (
            <Upload className="w-12 h-12 text-primary" />
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          {isDragging ? "Drop your image here" : "Upload Carpet Image"}
        </h3>
        <p className="text-muted-foreground text-center">
          Drag and drop or click to select an image for defect detection
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Supports: JPG, PNG, WebP
        </p>
      </label>
    </Card>
  );
};
