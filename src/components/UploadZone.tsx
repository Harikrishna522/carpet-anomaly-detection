import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface UploadZoneProps {
  onImagesUpload: (files: File[]) => void;
}

export const UploadZone = ({ onImagesUpload }: UploadZoneProps) => {
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
    
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"));
    if (files.length > 0) {
      onImagesUpload(files);
    }
  }, [onImagesUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
      onImagesUpload(imageFiles);
    }
  }, [onImagesUpload]);

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
          multiple
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
          {isDragging ? "Drop your images here" : "Upload Carpet Images"}
        </h3>
        <p className="text-muted-foreground text-center">
          Drag and drop or click to select multiple images for batch defect detection
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Supports: JPG, PNG, WebP | Multiple files supported
        </p>
      </label>
    </Card>
  );
};
