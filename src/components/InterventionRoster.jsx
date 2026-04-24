import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Table displaying at-risk students.
 * 
 * @param {Object} props
 * @param {Array} props.students - Array of at-risk students.
 * @returns {JSX.Element}
 */
export function InterventionRoster({ students }) {
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  if (!students || students.length === 0) return null;

  // Sorting logic based on composite_z
  const sortedStudents = [...students].sort((a, b) => {
    if (sortAsc) {
      return a.composite_z - b.composite_z;
    }
    return b.composite_z - a.composite_z;
  });

  const subjectColors = {
    Math: 'bg-blue-500',
    Physics: 'bg-purple-500',
    Electronics: 'bg-amber-500',
    CS: 'bg-green-500',
    English: 'bg-pink-500'
  };

  const toggleRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-white mb-4">Intervention Roster</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/50 border-b border-gray-800">
              <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider w-1/4">
                Student ID
              </th>
              <th 
                className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 transition-colors w-1/4 group"
                onClick={() => setSortAsc(!sortAsc)}
              >
                <div className="flex items-center gap-1.5">
                  Composite Z-Score
                  <ArrowUpDown className="w-3 h-3 text-gray-500 group-hover:text-gray-300" />
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider w-1/4">
                Critical Subject
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider w-1/4 text-right">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedStudents.map((student) => (
              <React.Fragment key={student.student_id}>
                <tr 
                  className="hover:bg-gray-800/30 transition-colors cursor-pointer"
                  onClick={() => toggleRow(student.student_id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 font-medium">
                    {student.student_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm tabular-nums">
                    <span className={student.composite_z < -1.5 ? 'text-red-400 font-semibold' : 'text-gray-300'}>
                      {student.composite_z.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`w-2 h-2 rounded-full ${subjectColors[student.critical_subject] || 'bg-gray-500'}`}
                      ></span>
                      {student.critical_subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                    {expandedRow === student.student_id ? (
                      <ChevronUp className="w-4 h-4 inline-block" />
                    ) : (
                      <ChevronDown className="w-4 h-4 inline-block" />
                    )}
                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {expandedRow === student.student_id && (
                  <tr className="bg-gray-950/50">
                    <td colSpan={4} className="px-6 py-4 border-t border-gray-800/50">
                      <div className="grid grid-cols-5 gap-4">
                        {Object.entries(student.raw_scores).map(([subject, score]) => {
                          const z = student.z_scores[subject];
                          const isCritical = subject === student.critical_subject;
                          return (
                            <div key={subject} className={`p-3 rounded-lg border ${isCritical ? 'border-red-900/50 bg-red-900/10' : 'border-gray-800 bg-gray-900/50'}`}>
                              <p className="text-xs text-gray-400 mb-1">{subject}</p>
                              <div className="flex items-end justify-between">
                                <span className={`text-lg font-medium tabular-nums ${isCritical ? 'text-red-400' : 'text-gray-200'}`}>{score}</span>
                                <span className={`text-xs tabular-nums ${z < 0 ? 'text-red-400/80' : 'text-green-400/80'}`}>{z > 0 ? '+' : ''}{z.toFixed(1)}z</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
