import React from 'react';
import { Database, AlertCircle, RefreshCw } from 'lucide-react';
import { useAnalyze } from './hooks/useAnalyze';
import { UploadZone } from './components/UploadZone';
import { SummaryCards } from './components/SummaryCards';
import { ExamHealthBoard } from './components/ExamHealthBoard';
import { InterventionRoster } from './components/InterventionRoster';
import { LoadingSpinner } from './components/LoadingSpinner';

/**
 * Root application component.
 * 
 * @returns {JSX.Element}
 */
export default function App() {
  const { status, data, error, analyzeFile } = useAnalyze();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-cyan-500/30">
      <header className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-cyan-500/10 p-1.5 rounded-md border border-cyan-500/20">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-lg font-semibold tracking-wide text-gray-50">Academic Agent</h1>
          </div>
          
          <div className="flex items-center">
            {status === 'idle' && <span className="px-3 py-1 text-xs font-medium bg-gray-900 text-gray-400 rounded-full border border-gray-800">Ready</span>}
            {status === 'uploading' && <span className="px-3 py-1 text-xs font-medium bg-cyan-950/50 text-cyan-400 rounded-full border border-cyan-900 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>Processing</span>}
            {status === 'success' && <span className="px-3 py-1 text-xs font-medium bg-green-950/50 text-green-400 rounded-full border border-green-900">Analysis Complete</span>}
            {status === 'error' && <span className="px-3 py-1 text-xs font-medium bg-red-950/50 text-red-400 rounded-full border border-red-900">Error</span>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-8 p-4 bg-red-950/30 border border-red-900/50 rounded-lg flex items-start gap-3 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-400">Analysis Failed</h3>
              <p className="text-sm text-red-300/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        {(status === 'idle' || status === 'error') && (
          <div className="max-w-2xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-3">Data Intelligence for Educators</h2>
              <p className="text-gray-400">Upload your student midterm results to generate an automated performance profile.</p>
            </div>
            <UploadZone onFileDrop={analyzeFile} />
          </div>
        )}

        {status === 'uploading' && <LoadingSpinner />}

        {status === 'success' && data && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">Dashboard Overview</h2>
                <p className="text-sm text-gray-400 mt-1">Real-time analysis generated from your uploaded data.</p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-800 px-4 py-2 rounded-md transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                New Analysis
              </button>
            </div>
            
            <SummaryCards summary={data.summary} />
            <ExamHealthBoard examHealth={data.exam_health} />
            <InterventionRoster students={data.at_risk_students} />
          </div>
        )}
      </main>
    </div>
  );
}
