import React from 'react';

const flowers = Array.from({ length: 12 }, (_, index) => {
  const angle = (index * 30 * Math.PI) / 180;
  return {
    x: 100 + 92 * Math.cos(angle),
    y: 100 + 92 * Math.sin(angle),
    color: index % 2 === 0 ? 'currentColor' : 'var(--inv-accent, #b99755)',
  };
});

export const FloralRing: React.FC = () => (
  <svg
    viewBox="0 0 200 200"
    className="absolute -inset-[14%] h-[128%] w-[128%] overflow-visible text-[#b99755]"
    aria-hidden="true"
  >
    <circle
      cx="100"
      cy="100"
      r="92"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />

    {flowers.map((flower, index) => (
      <g key={index}>
        <circle cx={flower.x} cy={flower.y} r="5" fill={flower.color} />
        <circle
          cx={flower.x}
          cy={flower.y}
          r="1.8"
          fill="var(--inv-bg, #fffaf0)"
        />
      </g>
    ))}
  </svg>
);
