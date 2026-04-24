import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, Cell } from 'recharts';

const SubjectCard = ({ health }) => {
  const chartData = [
    { name: 'Pass', count: health.pass_count, fill: '#00E676' }, // accent-green
    { name: 'Fail', count: health.fail_count, fill: '#FF3B3B' }  // accent-red
  ];

  const badgeColorClass = {
    'red': 'bg-void text-accent-red border-accent-red',
    'amber': 'bg-void text-accent-amber border-accent-amber',
    'orange': 'bg-void text-accent-amber border-accent-amber',
    'green': 'bg-void text-accent-green border-accent-green',
  }[health.color] || 'bg-void text-text-muted border-border';

  return (
    <div className="bg-surface border border-border p-5 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bebas tracking-wide text-text-primary uppercase">{health.subject}</h3>
        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-1 border ${badgeColorClass}`}>
          {health.status}
        </span>
      </div>
      
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex justify-between items-end border-b border-border pb-2">
          <span className="text-text-muted text-xs font-mono uppercase">Average</span>
          <span className="text-3xl font-mono text-text-primary">{health.mean.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-end border-b border-border pb-2">
          <span className="text-text-muted text-xs font-mono uppercase">Std Dev</span>
          <span className="text-lg font-mono text-text-primary">{health.std_dev.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-end border-b border-border pb-2">
          <span className="text-text-muted text-xs font-mono uppercase">Pass Rate</span>
          <span className="text-lg font-mono text-text-primary">{health.pass_pct}%</span>
        </div>
      </div>

      <div className="h-16 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{ backgroundColor: '#0A0B0D', borderColor: '#2A2D35', color: '#F0F0F0', borderRadius: '0', fontSize: '0.75rem', fontFamily: 'IBM Plex Mono' }}
              itemStyle={{ color: '#F0F0F0' }}
            />
            <XAxis dataKey="name" hide />
            <Bar dataKey="count" radius={[0, 0, 0, 0]} maxBarSize={40}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export function ExamHealthBoard({ examHealth }) {
  if (!examHealth || examHealth.length === 0) return null;

  return (
    <div className="mb-8 border border-border bg-panel p-6">
      <div className="border-b border-border pb-3 mb-6">
        <h2 className="text-xl font-bebas tracking-widest text-text-primary uppercase">Subject Telemetry</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {examHealth.map((health) => (
          <SubjectCard key={health.subject} health={health} />
        ))}
      </div>
    </div>
  );
}
