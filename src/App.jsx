import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Upload, Users, BarChart2, Settings, AlertCircle, BookOpen } from 'lucide-react';
import { useAnalyze } from './hooks/useAnalyze';
import { UploadZone } from './components/UploadZone';
import { SummaryCards } from './components/SummaryCards';
import { ExamHealthBoard } from './components/ExamHealthBoard';
import { InterventionRoster } from './components/InterventionRoster';
import { Glossary } from './components/Glossary';

export default function App() {
  const { status, data, error, analyzeFile, reset } = useAnalyze();
  const [time, setTime] = useState('');
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden font-sans">
      {/* 64px Sidebar */}
      <aside className="w-[64px] bg-sidebar border-r border-bordercol flex flex-col items-center py-6 shrink-0 z-20 justify-between">
        <nav className="flex flex-col gap-6 w-full items-center">
          <button 
            className={`w-full flex justify-center py-2 border-l-2 transition-colors ${activeView === 'dashboard' ? 'text-primary border-primary' : 'text-muted hover:text-primary border-transparent'}`} 
            title="Dashboard"
            onClick={() => setActiveView('dashboard')}
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button 
            className="text-muted hover:text-primary transition-colors border-l-2 border-transparent w-full flex justify-center py-2" 
            title="Upload"
            onClick={() => {
              reset();
              setActiveView('dashboard');
            }}
          >
            <Upload className="w-5 h-5" />
          </button>
          <button className="text-muted hover:text-primary transition-colors border-l-2 border-transparent w-full flex justify-center py-2" title="Users">
            <Users className="w-5 h-5" />
          </button>
          <button className="text-muted hover:text-primary transition-colors border-l-2 border-transparent w-full flex justify-center py-2" title="Analytics">
            <BarChart2 className="w-5 h-5" />
          </button>
          <button className="text-muted hover:text-primary transition-colors border-l-2 border-transparent w-full flex justify-center py-2" title="Settings">
            <Settings className="w-5 h-5" />
          </button>
          <button 
            className={`w-full flex justify-center py-2 border-l-2 transition-colors ${activeView === 'glossary' ? 'text-primary border-primary' : 'text-muted hover:text-primary border-transparent'}`} 
            title="Terminology Guide"
            onClick={() => setActiveView('glossary')}
          >
            <BookOpen className="w-5 h-5" />
          </button>
        </nav>
        <div className="mt-auto">
          <span className="font-bebas text-[18px] text-muted tracking-widest">SS</span>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar (48px) */}
        <header className="h-[48px] bg-sidebar border-b border-bordercol flex items-center justify-between px-6 shrink-0 z-10">
          <div className="font-mono text-[11px] text-subtle uppercase tracking-wider">
            SCHOLARSENSE / DASHBOARD
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] text-muted">{time}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-green text-[11px] font-bold animate-blink leading-none mt-0.5">|</span>
              <span className="text-[11px] text-green uppercase tracking-wider">System Ready</span>
            </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
            
            {activeView === 'glossary' ? (
              <div className="col-span-12">
                <Glossary />
              </div>
            ) : (
              <>
                {/* Status / Error row (spans 12) */}
                {error && (
                  <div className="col-span-12 p-4 bg-background border border-red flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[13px] font-bold font-mono text-red uppercase">Analysis Failed</h3>
                      <p className="text-[12px] font-mono text-muted mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {(status === 'idle' || status === 'error') && (
                  <div className="col-span-12">
                    <UploadZone onFileDrop={analyzeFile} />
                  </div>
                )}

                {status === 'uploading' && (
                  <div className="col-span-12 flex flex-col items-center justify-center h-[240px] border border-dashed border-subtle">
                    <div className="font-mono text-[14px] text-primary uppercase tracking-widest animate-pulse">
                      ANALYZING DATA...
                    </div>
                  </div>
                )}

                {status === 'success' && data && (
                  <>
                    {/* Summary Cards */}
                    <div className="col-span-12">
                      <SummaryCards data={data.summary} />
                    </div>

                    {/* Exam Health Board */}
                    <div className="col-span-12">
                      <ExamHealthBoard distribution={data.distribution} health={data.health} />
                    </div>

                    {/* Intervention Roster */}
                    <div className="col-span-12">
                      <InterventionRoster students={data.students} />
                    </div>
                  </>
                )}
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
