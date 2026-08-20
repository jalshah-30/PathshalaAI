import React from 'react';

interface AnimatedPenProps {
  isWriting?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedPen: React.FC<AnimatedPenProps> = ({
  isWriting = true,
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Animated Pen SVG with Gold Nib and Luxury Barrel */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-md origin-bottom-left transition-transform ${
          isWriting ? 'animate-pen-writing' : 'rotate-[-20deg]'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pen Body / Barrel */}
        <path
          d="M65 15 L85 35 L40 80 L20 60 Z"
          fill="url(#penBarrelGradient)"
          stroke="#1e293b"
          strokeWidth="2"
        />
        {/* Gold Trim Ring */}
        <polygon
          points="35,65 45,75 40,80 30,70"
          fill="url(#goldTrimGradient)"
        />
        <polygon
          points="60,20 70,30 65,35 55,25"
          fill="url(#goldTrimGradient)"
        />

        {/* Fountain Pen Grip */}
        <polygon
          points="20,60 40,80 25,85 15,75"
          fill="#334155"
          stroke="#0f172a"
          strokeWidth="1.5"
        />

        {/* Golden Nib */}
        <path
          d="M15 75 L25 85 L10 95 L5 90 Z"
          fill="url(#goldNibGradient)"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        {/* Nib slit */}
        <line x1="17" y1="78" x2="8" y2="92" stroke="#78350f" strokeWidth="1" />
        <circle cx="17" cy="78" r="1.5" fill="#78350f" />

        {/* Ink Glow Point */}
        {isWriting && (
          <circle
            cx="8"
            cy="94"
            r="2.5"
            className="animate-ping fill-indigo-500 opacity-75"
          />
        )}

        {/* Gradients */}
        <defs>
          <linearGradient id="penBarrelGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="goldTrimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="goldNibGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="40%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
