import type React from 'react';
import { useCallback, useState } from 'react';
import { UploadCloud, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface ImageDropzoneProps {
  onFileChange: (file: File | null) => void;
  currentFile?: File | null;
  className?: string;
  label?: string;
  description?: string;
  error?: string;
}

export function ImageDropzone({
  onFileChange,
  currentFile,
  className,
  label,
  description,
  error,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFileChange(files[0]);
      }
    },
    [onFileChange],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFileChange(files[0]);
      }

      e.target.value = '';
    },
    [onFileChange],
  );

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors',
          'bg-muted/20 hover:bg-muted/30',
          isDragging ? 'border-primary bg-muted/40' : 'border-input',
          error && 'border-destructive',
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('image-file-input')?.click()}
      >
        <input
          id="image-file-input"
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*"
        />
        {currentFile ? (
          <div className="flex items-center justify-between w-full p-2 bg-background rounded-md border">
            <span className="text-sm font-medium truncate">{currentFile.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Drag 'n' drop an image here, or click to select one
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (Only image files: JPG, PNG, GIF, SVG, WebP)
            </p>
          </>
        )}
      </div>
      {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
      {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
    </div>
  );
}
