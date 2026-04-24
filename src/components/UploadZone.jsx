import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export function UploadZone() {
  const fileInputRef = useRef(null);

  return (
    <div
      className="h-[120px] w-full border border-dashed border-subtle flex flex-col items-center justify-center cursor-pointer hover:border-muted transition-colors bg-background"
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef} 
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
