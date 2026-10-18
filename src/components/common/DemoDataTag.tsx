import React from 'react';
import { Database, ShieldAlert } from 'lucide-react';

interface DemoDataTagProps {
  type?: 'demo_data' | 'simulated_source' | 'mock_feed';
  className?: string;
  sourceName?: string;
}

export const DemoDataTag: React.FC<DemoDataTagProps> = ({
  type = 'demo_data',
  className = '',
  sourceName,
}) => {
  if (type === 'simulated_source') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-300 ${className}`}
        title="Simulated mock feed — Not an official real-time government connection"
      >
        <Database className="w-3 h-3 text-amber-600" />
        SIMULATED SOURCE {sourceName ? `• ${sourceName}` : ''}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-300 ${className}`}
      title="Sample demo data for prototype evaluation only"
    >
      <ShieldAlert className="w-3 h-3 text-slate-500" />
      DEMO DATA
    </span>
  );
};
