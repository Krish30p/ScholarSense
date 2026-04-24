import React, { useState, useEffect } from 'react';
import { Database, AlertCircle, RefreshCw, LayoutDashboard, Upload, Keyboard, User } from 'lucide-react';
import { useAnalyze } from './hooks/useAnalyze';
import { UploadZone } from './components/UploadZone';
import { SummaryCards } from './components/SummaryCards';
import { ExamHealthBoard } from './components/ExamHealthBoard';
import { InterventionRoster } from './components/InterventionRoster';
import { LoadingSpinner } from './components/LoadingSpinner';

export default function App() {
  const { status, data, error, analyzeFile } = useAnalyze();
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-void text-text-primary overflow-hidden font-sans">
      {/* 64px Sidebar */}
      <aside className="w-16 bg-panel border-r border-border flex flex-col items-center py-6 gap-8 z-20 shrink-0">
        <div className="w-10 h-10 bg-surface border border-border flex items-center justify-center mb-4">
          <Database className="w-5 h-5 text-accent-cyan" />
        </div>
        <nav className="flex flex-col gap-6 w-full items-center">
          <button className="text-accent-cyan hover:text-accent-cyan transition-colors" title="Dashboard">
            <LayoutDashboard className="w-6 h-6" />
          </button>
          <button className="text-text-muted hover:text-text-primary transition-colors" title="Upload">
            <Upload className="w-6 h-6" />
          </button>
          <button className="text-text-muted hover:text-text-primary transition-colors" title="Manual Entry">
            <Keyboard className="w-6 h-6" />
          </button>
        </nav>
        <div className="mt-auto">
          <button className="text-text-muted hover:text-text-primary transition-colors" title="Login">
            <User className="w-6 h-6" />
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-panel border-b border-border flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bebas tracking-widest text-text-primary uppercase mt-1">
              SCHOLARSENSE <span className="text-text-muted mx-2">//</span> DECISION PLATFORM
            </h1>
            <div className="flex items-center gap-2 bg-surface px-3 py-1 border border-border">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-accent-green uppercase tracking-wider">System Online</span>
            </div>
          </div>
          <div className="font-mono text-sm text-text-muted">
            LAST UPDATE: {time}
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
            
            {/* Status / Error row (spans 12) */}
            {error && (
              <div className="col-span-12 p-4 bg-void border border-accent-red flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent-red shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold font-mono text-accent-red uppercase">Analysis Failed</h3>
                  <p className="text-sm text-text-muted mt-1">{error}</p>
                </div>
              </div>
            )}

            {(status === 'idle' || status === 'error') && (
              <div className="col-span-12 md:col-span-8 md:col-start-3 mt-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bebas tracking-wide text-text-primary mb-2">AWAITING DATA INPUT</h2>
                  <p className="font-mono text-sm text-text-muted uppercase">Upload student result batch for automated profiling</p>
                </div>
                <UploadZone onFileDrop={analyzeFile} />
              </div>
            )}

            {status === 'uploading' && (
              <div className="col-span-12 flex justify-center mt-20">
                <LoadingSpinner />
              </div>
            )}

            {status === 'success' && data && (
              <div className="col-span-12 grid grid-cols-12 gap-6">
                {/* Header row */}
                <div className="col-span-12 flex justify-between items-end border-b border-border pb-4">
                  <div>
                    <h2 className="text-2xl font-bebas tracking-wide text-text-primary uppercase">Mission Control</h2>
                    <p className="font-mono text-xs text-text-muted uppercase mt-1">Real-time analytical telemetry</p>
                  </div>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="flex items-center gap-2 font-mono text-xs text-accent-cyan hover:text-void bg-void hover:bg-accent-cyan border border-accent-cyan px-4 py-2 transition-colors uppercase"
                  >
                    <RefreshCw className="w-3 h-3" />
                    New Batch
                  </button>
                </div>
                
                {/* Summary Cards: Span 12 */}
                <div className="col-span-12">
                  <SummaryCards summary={data.summary} />
                </div>

                {/* Exam Health: Span 12 */}
                <div className="col-span-12">
                  <ExamHealthBoard examHealth={data.exam_health} />
                </div>

                {/* Intervention: Span 12 */}
                <div className="col-span-12">
                  <InterventionRoster students={data.at_risk_students} />
                </div>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
}
