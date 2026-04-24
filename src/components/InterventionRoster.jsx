import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

export function InterventionRoster({ students }) {
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  if (!students || students.length === 0) return null;

  const sortedStudents = [...students].sort((a, b) => {
    if (sortAsc) {
      return a.composite_z - b.composite_z;
    }
    return b.composite_z - a.composite_z;
  });

  const subjectColors = {
    Math: 'bg-accent-cyan',
    Physics: 'bg-purple-500',
    Electronics: 'bg-accent-amber',
    CS: 'bg-accent-green',
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
    <div className="border border-border bg-panel p-6">
      <div className="border-b border-border pb-3 mb-6">
        <h2 className="text-xl font-bebas tracking-widest text-text-primary uppercase">Anomaly Detection Grid</h2>
      </div>
      <div className="border border-border bg-void overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface border-b border-border">
              <th className="px-4 py-3 text-xs font-mono font-medium text-text-muted uppercase tracking-wider w-1/4 border-r border-border">
                Identifier
              </th>
              <th 
                className="px-4 py-3 text-xs font-mono font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors w-1/4 border-r border-border group"
                onClick={() => setSortAsc(!sortAsc)}
              >
                <div className="flex items-center gap-1.5">
                  Composite Index
                  <ArrowUpDown className="w-3 h-3 text-border group-hover:text-text-muted" />
                </div>
              </th>
              <th className="px-4 py-3 text-xs font-mono font-medium text-text-muted uppercase tracking-wider w-1/4 border-r border-border">
                Critical Node
              </th>
              <th className="px-4 py-3 text-xs font-mono font-medium text-text-muted uppercase tracking-wider w-1/4 text-right">
                Logs
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedStudents.map((student) => (
              <React.Fragment key={student.student_id}>
                <tr 
                  className="hover:bg-surface transition-colors cursor-pointer"
                  onClick={() => toggleRow(student.student_id)}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary font-mono border-r border-border">
                    {student.student_id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-mono border-r border-border">
                    <span className={student.composite_z < -1.5 ? 'text-accent-red font-bold' : 'text-text-primary'}>
                      {student.composite_z.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-text-muted uppercase border-r border-border">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`w-1.5 h-1.5 rounded-none ${subjectColors[student.critical_subject] || 'bg-text-muted'}`}
                      ></span>
                      {student.critical_subject}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-text-muted">
                    {expandedRow === student.student_id ? (
                      <ChevronUp className="w-4 h-4 inline-block" />
                    ) : (
                      <ChevronDown className="w-4 h-4 inline-block" />
                    )}
                  </td>
                </tr>
                
                {expandedRow === student.student_id && (
                  <tr className="bg-void">
                    <td colSpan={4} className="px-4 py-4 border-t border-border">
                      <div className="grid grid-cols-5 gap-4">
                        {Object.entries(student.raw_scores).map(([subject, score]) => {
                          const z = student.z_scores[subject];
                          const isCritical = subject === student.critical_subject;
                          return (
                            <div key={subject} className={`p-3 border ${isCritical ? 'border-accent-red bg-[rgba(255,59,59,0.05)]' : 'border-border bg-surface'}`}>
                              <p className="text-[10px] font-mono text-text-muted mb-2 uppercase tracking-widest">{subject}</p>
                              <div className="flex items-end justify-between border-t border-border pt-2">
                                <span className={`text-lg font-mono ${isCritical ? 'text-accent-red font-bold' : 'text-text-primary'}`}>{score}</span>
                                <span className={`text-xs font-mono ${z < 0 ? 'text-accent-amber' : 'text-accent-green'}`}>{z > 0 ? '+' : ''}{z.toFixed(1)}z</span>
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
