import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 border border-border bg-surface p-12">
      <div className="flex gap-2 mb-6">
        <div className="w-4 h-8 bg-accent-cyan animate-pulse"></div>
        <div className="w-4 h-8 bg-text-muted animate-pulse delay-75"></div>
        <div className="w-4 h-8 bg-border animate-pulse delay-150"></div>
      </div>
      <p className="text-accent-cyan text-sm font-mono animate-pulse tracking-widest uppercase">
        Processing Data Array...
      </p>
    </div>
  );
}
