import React from 'react';

interface ProgressProps {
  max: number;
  value: number;
  label?: boolean;
  percentage?: boolean;
}

const ProgressBar: React.FC<ProgressProps> = ({ max, value, label = true, percentage = true }) => {
  const percent = Math.round((value / max) * 100);
  const variant = value / max < 0.5 ? 'bg-error' : value / max < 0.8 ? 'bg-accent' : 'bg-primary';

  return (
    <div className="w-full space-y-1">
      {percentage && (
        <div className="flex justify-between text-sm text-gray-500 font-medium">
          <span>Kuesioner terisi</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200/50 rounded-lg h-2 overflow-hidden shadow-sm">
        <div className={`${variant} h-full rounded-lg flex items-center justify-end pr-1 text-white text-xs font-semibold transition-all duration-300`} style={{ width: `${percent}%` }}>
          {/* Bisa taruh persen di dalam bar */}
        </div>
      </div>
      {label && (
        <p className="text-xs text-gray-400">
          Kurang {max - value} dari {max}
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
