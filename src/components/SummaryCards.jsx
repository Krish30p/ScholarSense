import React from 'react';

export function SummaryCards({ data }) {
  const cards = [
    { label: 'CLASS MEAN', value: data.mean.toFixed(1), delta: '+2.4', deltaPositive: true },
    { label: 'STD DEVIATION', value: data.std_dev.toFixed(1), delta: '-1.2', deltaPositive: false },
    { label: 'PASS RATE', value: `${data.pass_rate}%`, delta: '+5.1', deltaPositive: true },
    { label: 'NEEDS SUPPORT', value: data.at_risk_count, delta: '▼2', deltaPositive: true } // lower is better
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-panel border border-bordercol p-4 flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-start">
            <span className="font-sans text-[11px] text-subtle uppercase tracking-[0.05em]">{card.label}</span>
            <span className={`font-mono text-[12px] ${card.deltaPositive ? 'text-green' : 'text-red'}`}>
              {card.delta.includes('▼') || card.delta.includes('▲') ? card.delta : (card.deltaPositive ? `▲ ${card.delta}` : `▼ ${card.delta.replace('-','')}`)}
            </span>
          </div>
          <div className="font-mono text-[32px] text-primary leading-none">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
