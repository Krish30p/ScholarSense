import React, { useEffect, useState } from 'react';
import { Users, FileText, AlertTriangle } from 'lucide-react';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 1000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span className="tabular-nums font-mono">{count}</span>;
};

export function SummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-surface border border-border p-6 flex items-start gap-4">
        <div className="p-3 bg-panel border border-border">
          <Users className="w-6 h-6 text-accent-cyan" />
        </div>
        <div>
          <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-1">Total Profiles</p>
          <p className="text-4xl text-text-primary">
            <AnimatedCounter value={summary.total_students} />
          </p>
        </div>
      </div>
      
      <div className="bg-surface border border-border p-6 flex items-start gap-4">
        <div className="p-3 bg-panel border border-border">
          <FileText className="w-6 h-6 text-accent-green" />
        </div>
        <div>
          <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-1">Metrics Analyzed</p>
          <p className="text-4xl text-text-primary">
            <AnimatedCounter value={summary.subjects_analyzed} />
          </p>
        </div>
      </div>
      
      <div className="bg-surface border border-accent-red p-6 flex items-start gap-4 shadow-[inset_0_0_20px_rgba(255,59,59,0.05)]">
        <div className="p-3 bg-panel border border-accent-red">
          <AlertTriangle className="w-6 h-6 text-accent-red" />
        </div>
        <div>
          <p className="text-accent-red text-xs font-mono uppercase tracking-widest mb-1">Critical Anomalies</p>
          <p className="text-4xl text-accent-red">
            <AnimatedCounter value={summary.at_risk_count} />
          </p>
        </div>
      </div>
    </div>
  );
}
