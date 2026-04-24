import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, Cell } from 'recharts';

/**
 * Component to display exam health metrics and a bar chart for a single subject.
 * 
 * @param {Object} props
 * @param {Object} props.health - Exam health data for a subject.
 * @returns {JSX.Element}
 */
const SubjectCard = ({ health }) => {
  const chartData = [
    { name: 'Pass', count: health.pass_count, fill: '#4ade80' }, // green-400
    { name: 'Fail', count: health.fail_count, fill: '#ef4444' }  // red-500
  ];

  const badgeColorClass = {
    'red': 'bg-red-900/40 text-red-400 border-red-800/60',
    'amber': 'bg-amber-900/40 text-amber-400 border-amber-800/60',
    'orange': 'bg-orange-900/40 text-orange-400 border-orange-800/60',
    'green': 'bg-green-900/40 text-green-400 border-green-800/60',
  }[health.color] || 'bg-gray-800 text-gray-400 border-gray-700';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-white">{health.subject}</h3>
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm border ${badgeColorClass}`}>
          {health.status}
        </span>
      </div>
      
      <div className="flex items-end gap-3 mb-6">
        <div>
          <span className="text-4xl font-semibold tabular-nums text-white">{health.mean.toFixed(1)}</span>
          <span className="text-gray-500 text-sm ml-1">μ</span>
        </div>
        <div className="flex gap-3 pb-1 text-xs">
          <div>
            <span className="text-gray-500 mr-1">σ</span>
            <span className="tabular-nums text-gray-300 font-medium">{health.std_dev.toFixed(1)}</span>
          </div>
          <div>
            <span className="text-gray-500 mr-1">Pass</span>
            <span className="tabular-nums text-gray-300 font-medium">{health.pass_pct}%</span>
          </div>
        </div>
      </div>

      <div className="h-16 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
              contentStyle={{ backgroundColor: '#030712', borderColor: '#1f2937', color: '#f3f4f6', borderRadius: '0.375rem', fontSize: '0.875rem' }}
              itemStyle={{ color: '#f3f4f6' }}
            />
            <XAxis dataKey="name" hide />
            <Bar dataKey="count" radius={[2, 2, 0, 0]} maxBarSize={40}>
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

/**
 * Grid component for all subject cards.
 * 
 * @param {Object} props
 * @param {Array} props.examHealth - Array of exam health objects.
 * @returns {JSX.Element}
 */
export function ExamHealthBoard({ examHealth }) {
  if (!examHealth || examHealth.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-white mb-4">Exam Health</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {examHealth.map((health) => (
          <SubjectCard key={health.subject} health={health} />
        ))}
      </div>
    </div>
  );
}
