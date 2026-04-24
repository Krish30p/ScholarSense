import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';

export function ExamHealthBoard({ distribution, health }) {
  // Score < 50 is below threshold (e.g. index 0-4 are failing buckets, 50+)
  // We'll mark buckets with name containing '0-10' up to '41-50' as red
  const getFillColor = (name) => {
    const minVal = parseInt(name.split('-')[0]);
    return minVal < 50 ? '#EF4444' : '#27272A';
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-[240px]">
      {/* Left 8-col */}
      <div className="col-span-8 bg-panel border border-bordercol p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-sans text-[11px] text-muted uppercase tracking-wider">SCORE DISTRIBUTION</h3>
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-mono leading-none ${health.status === 'POLARIZED' ? 'text-red' : 'text-green'}`}>●</span>
            <span className={`text-[11px] font-mono ${health.status === 'POLARIZED' ? 'text-red' : 'text-green'}`}>{health.status}</span>
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#3F3F46', fontSize: 10, fontFamily: 'IBM Plex Mono' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#3F3F46', fontSize: 10, fontFamily: 'IBM Plex Mono' }} 
              />
              <Bar dataKey="count" radius={0} maxBarSize={32}>
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getFillColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right 4-col */}
      <div className="col-span-4 bg-panel border border-bordercol flex flex-col">
        <div className="p-4 border-b border-bordercol">
          <h3 className="font-sans text-[11px] text-muted uppercase tracking-wider">HEALTH TELEMETRY</h3>
        </div>
        <div className="flex flex-col flex-1 px-4 py-2">
          <div className="flex justify-between items-center py-3 border-b border-bordercol">
            <span className="font-sans text-[12px] text-muted">Kurtosis</span>
            <span className="font-mono text-[13px] text-primary">{health.kurtosis.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-bordercol">
            <span className="font-sans text-[12px] text-muted">Skewness</span>
            <span className="font-mono text-[13px] text-primary">{health.skewness.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-bordercol">
            <span className="font-sans text-[12px] text-muted">Median</span>
            <span className="font-mono text-[13px] text-primary">{health.median.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="font-sans text-[12px] text-muted">IQR Range</span>
            <span className="font-mono text-[13px] text-primary">{health.iqr.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
