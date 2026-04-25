import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

export function UploadZone({ onFileDrop }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        onFileDrop(file);
      } else {
        alert("Please drop a valid .csv file.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name.endsWith('.csv')) {
        onFileDrop(file);
      } else {
        alert("Please select a valid .csv file.");
      }
      e.target.value = null;
    }
  };

  return (
    <div
      className={`h-[120px] w-full border border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors bg-background ${isDragOver ? 'border-primary' : 'border-subtle hover:border-muted'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      <Upload className="w-5 h-5 text-muted mb-2" strokeWidth={1.5} />
      <h3 className="text-[22px] font-bebas text-primary uppercase tracking-wide leading-none mb-1">
        DROP CSV TO INITIALIZE
      </h3>
      <p className="text-[12px] font-sans text-muted">
        or click to browse — accepts .csv
      </p>
    </div>
  );
}
