import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Minimal loading spinner.
 * 
 * @returns {JSX.Element}
 */
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
      <p className="text-gray-400 text-sm font-medium animate-pulse tracking-wide">
        Processing exam data...
      </p>
    </div>
  );
}
