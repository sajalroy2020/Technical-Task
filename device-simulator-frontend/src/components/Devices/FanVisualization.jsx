import React from 'react';

export function FanVisualization({ isPowerOn, speed }) {
  const getAnimationClass = () => {
    if (!isPowerOn) return "";
    if (speed < 33) return "animate-spin-slow";
    if (speed < 66) return "animate-spin-medium";
    return "animate-spin-fast";
  };

  return (
    <div className="relative w-80 h-80 flex items-center justify-center overflow-hidden md:overflow-visible">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Center circle */}
        <div className="absolute md:w-[100px] w-20 h-20 md:h-[100px] rounded-full bg-[#333f52] flex items-center justify-center z-10">
          <div className="md:w-20 w-14 h-14 md:h-20 rounded-full bg-linear-to-br from-[#4c596e] to-[#101828]/90 flex items-center justify-center">
            <div className="w-8 md:w-14  h-8 md:h-14 rounded-full bg-linear-to-br from-[#364153] to-[#101828]"></div>
          </div>
        </div>

        {/* Fan blades container with dynamic animation */}
        <svg className={`absolute md:w-96 md:h-96 ${getAnimationClass()}`} viewBox="0 0 200 200">
          <defs>
            <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#101828', stopOpacity: 0.9}} />
              <stop offset="80%" style={{stopColor: '#3a4b6a', stopOpacity: 0.9}} />
              <stop offset="100%" style={{stopColor: '#2a3b5a', stopOpacity: 0.8}} />
            </linearGradient>
          </defs>

          {/* Blade SVG geometry using rects for pill shape */}
          {[0, 90, 180, 270].map(angle => (
            <g key={angle} transform={`translate(100, 100) rotate(${angle})`}>
              <rect x="-15" y="-90" width="30" height="80" rx="15" ry="15" fill="url(#bladeGradient)" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
