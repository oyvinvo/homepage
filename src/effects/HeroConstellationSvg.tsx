import React from 'react';

export const HeroConstellationSvg: React.FC = () => {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Subtle glowing conduit gradients */}
        <linearGradient id="conduitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="conduitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Network Conduits / Connecting Architecture Lines */}
      <g className="stroke-current text-sky-400/20 dark:text-cyan-400/25">
        <line x1="120" y1="80" x2="280" y2="160" stroke="url(#conduitGrad1)" strokeWidth="1.2" strokeDasharray="4 4" className="animate-[pulse_4s_ease-in-out_infinite]" />
        <line x1="280" y1="160" x2="420" y2="110" stroke="url(#conduitGrad2)" strokeWidth="1" />
        <line x1="420" y1="110" x2="560" y2="220" stroke="url(#conduitGrad1)" strokeWidth="1.2" />
        <line x1="280" y1="160" x2="220" y2="340" stroke="url(#conduitGrad2)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="220" y1="340" x2="380" y2="420" stroke="url(#conduitGrad1)" strokeWidth="1" />
        <line x1="380" y1="420" x2="560" y2="380" stroke="url(#conduitGrad2)" strokeWidth="1.2" />
        <line x1="560" y1="220" x2="560" y2="380" stroke="url(#conduitGrad1)" strokeWidth="1" />
        <line x1="560" y1="220" x2="720" y2="180" stroke="url(#conduitGrad2)" strokeWidth="1.2" strokeDasharray="5 5" />
        <line x1="720" y1="180" x2="880" y2="260" stroke="url(#conduitGrad1)" strokeWidth="1" />
        <line x1="880" y1="260" x2="1050" y2="140" stroke="url(#conduitGrad2)" strokeWidth="1.2" />
        <line x1="720" y1="180" x2="840" y2="400" stroke="url(#conduitGrad1)" strokeWidth="1" />
        <line x1="840" y1="400" x2="980" y2="360" stroke="url(#conduitGrad2)" strokeWidth="1" />
        <line x1="880" y1="260" x2="980" y2="360" stroke="url(#conduitGrad1)" strokeWidth="1.2" strokeDasharray="4 4" />
      </g>

      {/* Floating Topology Nodes */}
      <g>
        {/* Node 1 */}
        <circle cx="120" cy="80" r="3" className="fill-sky-400 dark:fill-cyan-400" />
        <circle cx="120" cy="80" r="8" fill="url(#nodeGlow)" />

        {/* Node 2 - Gateway */}
        <circle cx="280" cy="160" r="4.5" className="fill-cyan-400 dark:fill-cyan-300" />
        <circle cx="280" cy="160" r="12" fill="url(#nodeGlow)" className="animate-ping opacity-30" />

        {/* Node 3 */}
        <circle cx="420" cy="110" r="3" className="fill-sky-400 dark:fill-cyan-400" />

        {/* Node 4 - Core Mesh */}
        <circle cx="560" cy="220" r="5" className="fill-indigo-400 dark:fill-cyan-300" />
        <circle cx="560" cy="220" r="14" fill="url(#nodeGlow)" className="animate-pulse opacity-40" />

        {/* Node 5 */}
        <circle cx="220" cy="340" r="3" className="fill-sky-400 dark:fill-cyan-400" />

        {/* Node 6 */}
        <circle cx="380" cy="420" r="3.5" className="fill-sky-400 dark:fill-cyan-400" />

        {/* Node 7 */}
        <circle cx="560" cy="380" r="4" className="fill-cyan-400 dark:fill-cyan-300" />

        {/* Node 8 - Cluster Hub */}
        <circle cx="720" cy="180" r="4.5" className="fill-cyan-400 dark:fill-cyan-300" />
        <circle cx="720" cy="180" r="12" fill="url(#nodeGlow)" />

        {/* Node 9 */}
        <circle cx="880" cy="260" r="4" className="fill-sky-400 dark:fill-cyan-400" />

        {/* Node 10 */}
        <circle cx="1050" cy="140" r="3" className="fill-sky-400 dark:fill-cyan-400" />

        {/* Node 11 */}
        <circle cx="840" cy="400" r="3.5" className="fill-sky-400 dark:fill-cyan-400" />

        {/* Node 12 */}
        <circle cx="980" cy="360" r="3.5" className="fill-sky-400 dark:fill-cyan-400" />
      </g>
    </svg>
  );
};
