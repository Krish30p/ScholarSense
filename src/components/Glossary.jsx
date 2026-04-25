import React from 'react';
import { BookOpen } from 'lucide-react';

export function Glossary() {
  const terms = [
    {
      term: "Median",
      def: "The exact middle score. Half the class scored above this, half below."
    },
    {
      term: "IQR Range",
      def: "Interquartile Range. Measures how spread out the middle 50% of the class is."
    },
    {
      term: "Skewness",
      def: "Tells if scores are lopsided. A negative number means most did well, but a few low scores pulled the average down."
    },
    {
      term: "Kurtosis",
      def: "Tells if scores are clustered tightly. Close to 0 means a normal, bell-shaped curve."
    },
    {
      term: "Z-Score",
      def: "How far above or below the average a student is. 0 is exactly average."
    },
    {
      term: "Percentile",
      def: "If 80th percentile, the student scored better than 80% of the class."
    },
    {
      term: "Delta",
      def: "The actual point difference between a student's score and the class average."
    },
    {
      term: "Status",
      def: "A quick label (ON TRACK / NEEDS SUPPORT) based on the student's Z-Score."
    }
  ];

  return (
    <div className="bg-panel border border-bordercol flex flex-col h-full">
      <div className="h-[32px] border-b border-bordercol flex items-center px-4 shrink-0 bg-sidebar">
        <BookOpen className="w-4 h-4 text-primary mr-2" />
        <h2 className="text-[12px] font-mono text-primary uppercase tracking-widest">
          Terminology Guide
        </h2>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {terms.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-[13px] font-bold font-mono text-cyan uppercase mb-1">
              {item.term}
            </span>
            <span className="text-[12px] text-muted leading-tight">
              {item.def}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
