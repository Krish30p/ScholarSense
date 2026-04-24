import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

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
      className={`border-2 border-dashed p-12 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer 
        ${isDragOver ? 'border-accent-cyan bg-panel' : 'border-border bg-surface hover:border-text-muted hover:bg-panel'}`}
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
      <UploadCloud className={`w-12 h-12 mb-4 transition-colors ${isDragOver ? 'text-accent-cyan' : 'text-text-muted'}`} />
      <h3 className="text-2xl font-bebas tracking-widest text-text-primary mb-2 uppercase">Input Data Stream</h3>
      <p className="text-text-muted text-sm font-mono text-center uppercase">
        Drop CSV payload here or click to browse system
      </p>
    </div>
  );
}
