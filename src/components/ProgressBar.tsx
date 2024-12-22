import React from 'react';

interface ProgressProps {
  max: number;
  value: number;
  label: boolean;
  percentage?: boolean;
}

const ProgressBar: React.FC<ProgressProps> = ({ max, value, label = true, percentage = true }) => {
  const baseStyles = 'progress';
  const variants = {
    good: 'progress-primary',
    warning: 'progress-accent',
    danger: 'progress-error',
  };

  const variant = value / max < 0.5 ? 'danger' : value / max < 0.8 ? 'warning' : 'good';

  return (
    <div className="w-full ">
      <div className="flex w-full justify-between ">
        <p>Kuesioner terisi</p>
        {percentage && <p>{Math.round((value / max) * 100)}%</p>}
      </div>
      <progress className={`${baseStyles} ${variants[variant]}`} value={value} max={max}></progress>
      {label && (
        <p className="text-sm text-slate-400">
          Kurang {max - value} dari {max}
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
