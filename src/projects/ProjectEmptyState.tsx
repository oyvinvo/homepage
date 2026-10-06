import React from 'react';

interface ProjectEmptyStateProps {
  onReset: () => void;
}

export const ProjectEmptyState: React.FC<ProjectEmptyStateProps> = ({ onReset }) => {
  return (
    <div className="mt-12 text-center p-12 rounded-xl bg-slate-900/30 border border-dashed border-slate-800 space-y-3">
      <div className="text-base font-semibold text-slate-300">No matching case studies found</div>
      <p className="text-xs text-slate-400">
        Try adjusting your search query or reset the category filter to view all projects.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-md text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Reset Filters
      </button>
    </div>
  );
};
