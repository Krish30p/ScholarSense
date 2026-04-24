import React, { useEffect, useState } from 'react';
import { Users, FileText, AlertTriangle } from 'lucide-react';

/**
 * Animated number counter component.
 * 
 * @param {Object} props
 * @param {number} props.value - The target value to count to.
 * @returns {JSX.Element}
 */
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 1000; // 1 second animation

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out function
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

  return <span className="tabular-nums">{count}</span>;
};

/**
 * Three animated stat cards.
 * 
 * @param {Object} props
 * @param {Object} props.summary - Summary object containing the stats.
 * @returns {JSX.Element}
 */
export function SummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex items-center">
        <div className="p-3 bg-gray-800/50 rounded-lg mr-4 border border-gray-700/50">
          <Users className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium">Total Students</p>
          <p className="text-3xl font-semibold text-white mt-1">
            <AnimatedCounter value={summary.total_students} />
          </p>
        </div>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg flex items-center">
        <div className="p-3 bg-gray-800/50 rounded-lg mr-4 border border-gray-700/50">
          <FileText className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium">Exams Analyzed</p>
          <p className="text-3xl font-semibold text-white mt-1">
            <AnimatedCounter value={summary.subjects_analyzed} />
          </p>
        </div>
      </div>
      
      <div className="bg-gray-900 border border-red-900/30 p-6 rounded-lg flex items-center shadow-[0_0_15px_rgba(239,68,68,0.05)]">
        <div className="p-3 bg-red-900/20 rounded-lg mr-4 border border-red-900/50">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <p className="text-red-400 text-sm font-medium">At-Risk Students</p>
          <p className="text-3xl font-semibold text-red-500 mt-1">
            <AnimatedCounter value={summary.at_risk_count} />
          </p>
        </div>
      </div>
    </div>
  );
}
