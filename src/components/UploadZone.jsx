import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

/**
 * Drag-and-drop CSV uploader component.
 * 
 * @param {Object} props
 * @param {Function} props.onFileDrop - Callback when a file is selected or dropped.
 * @returns {JSX.Element}
 */
export function UploadZone({ onFileDrop }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  /** @param {React.DragEvent} e */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  /** @param {React.DragEvent} e */
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  /** @param {React.DragEvent} e */
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

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name.endsWith('.csv')) {
        onFileDrop(file);
      } else {
        alert("Please select a valid .csv file.");
      }
      // Reset input value to allow uploading the same file again
      e.target.value = null;
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer 
        ${isDragOver ? 'border-cyan-400 bg-gray-900 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-gray-800 bg-gray-950 hover:border-gray-600 hover:bg-gray-900/50'}`}
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
      <UploadCloud className={`w-12 h-12 mb-4 transition-colors ${isDragOver ? 'text-cyan-400' : 'text-gray-500'}`} />
      <h3 className="text-lg font-medium text-white mb-2">Upload Exam Data</h3>
      <p className="text-gray-400 text-sm text-center">
        Drag and drop your midterm CSV file here, or click to browse.
      </p>
    </div>
  );
}
