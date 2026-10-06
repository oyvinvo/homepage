import React from 'react';
import { ProjectMetric } from '../shared/types';

interface ProjectCardMetricsProps {
  metrics: ProjectMetric[];
}

export const ProjectCardMetrics: React.FC<ProjectCardMetricsProps> = ({ metrics }) => {
  return (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-blue-50/80 dark:bg-slate-950/70 border border-blue-200/70 dark:border-slate-800/70">
      {metrics.map((metric, idx) => (
        <div key={idx} className="space-y-0.5">
          <div className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight">
            {metric.value}
          </div>
          <div className="text-[11px] font-semibold text-blue-800 dark:text-cyan-300">
            {metric.label}
          </div>
          {metric.detail && (
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {metric.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
