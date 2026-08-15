import React, { useState } from 'react';
import logoImg from '../assets/images/unity_hosting_logo_1786758676549.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = false, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-lg shadow-amber-500/10 border border-amber-500/20 bg-slate-900 flex items-center justify-center shrink-0 group transition-transform hover:scale-105 duration-300`}
      >
        {!imageError ? (
          <img
            src={logoImg}
            alt="Unity Hosting Logo"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-600/30 via-slate-900 to-cyan-600/30 text-center p-1">
            <span className="font-extrabold text-[10px] tracking-wider text-amber-400 font-['Space_Grotesk'] leading-none">
              UNITY
            </span>
            <span className="font-bold text-[8px] tracking-wider text-cyan-400 font-['Space_Grotesk'] leading-none mt-0.5">
              HOSTING
            </span>
          </div>
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 font-['Space_Grotesk'] drop-shadow-sm">
              UNITY
            </span>
            <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200 font-['Space_Grotesk'] drop-shadow-sm">
              HOSTING
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            System Status &amp; Uptime Monitor
          </span>
        </div>
      )}
    </div>
  );
};
