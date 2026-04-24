import React from 'react';

export function InterventionRoster({ students }) {
  return (
    <div className="w-full border border-bordercol bg-background overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-sidebar border-b border-bordercol">
            <th className="px-4 py-3 text-[11px] font-sans font-medium text-subtle uppercase tracking-wider">STUDENT ID</th>
            <th className="px-4 py-3 text-[11px] font-sans font-medium text-subtle uppercase tracking-wider">SCORE</th>
            <th className="px-4 py-3 text-[11px] font-sans font-medium text-subtle uppercase tracking-wider">Z-SCORE</th>
            <th className="px-4 py-3 text-[11px] font-sans font-medium text-subtle uppercase tracking-wider">PERCENTILE</th>
            <th className="px-4 py-3 text-[11px] font-sans font-medium text-subtle uppercase tracking-wider">DELTA</th>
            <th className="px-4 py-3 text-[11px] font-sans font-medium text-subtle uppercase tracking-wider text-right">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => {
            // Alternating rows #111113 and #09090B
            const bgClass = idx % 2 === 0 ? 'bg-panel' : 'bg-background';
            const statusColor = student.status === 'AT-RISK' ? 'text-red' : 'text-green';
            const deltaStr = student.delta > 0 ? `+${student.delta.toFixed(1)}` : student.delta.toFixed(1);

            return (
              <tr key={student.id} className={`${bgClass} hover:bg-elevated transition-colors`}>
                <td className="px-4 py-2 whitespace-nowrap text-[12px] font-mono text-primary border-t border-bordercol/30">
                  {student.id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-[12px] font-mono text-primary border-t border-bordercol/30">
                  {student.score}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-[12px] font-mono text-primary border-t border-bordercol/30">
                  {student.z_score.toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-[12px] font-mono text-primary border-t border-bordercol/30">
                  {student.percentile}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-[12px] font-mono text-primary border-t border-bordercol/30">
                  {deltaStr}
                </td>
                <td className={`px-4 py-2 whitespace-nowrap text-[12px] font-mono text-right border-t border-bordercol/30 ${statusColor}`}>
                  {student.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
