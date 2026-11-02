import React, { useId } from 'react';

// Ornate Gold Divider with Center Diamond and Lotus Petals
export const GoldDivider: React.FC<{ className?: string; light?: boolean }> = ({ className = '', light = false }) => {
  const strokeColor = light ? '#E8D4B5' : '#C49A50';
  return (
    <div className={`flex items-center justify-center space-x-3 my-6 ${className}`}>
      <div className={`h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[${strokeColor}] to-[${strokeColor}] opacity-70`} />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 animate-pulse-glow">
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="url(#goldOrnamentGrad)"
          stroke={strokeColor}
          strokeWidth="0.75"
        />
        <circle cx="12" cy="12" r="2.5" fill="#781C32" />
        <defs>
          <linearGradient id="goldOrnamentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7EA" />
            <stop offset="50%" stopColor="#C49A50" />
            <stop offset="100%" stopColor="#9B7432" />
          </linearGradient>
        </defs>
      </svg>
      <div className={`h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[${strokeColor}] to-[${strokeColor}] opacity-70`} />
    </div>
  );
};

// Sacred Lord Ganesha Motif SVG
export const LordGaneshaIcon: React.FC<{
  className?: string;
  size?: number;
  tone?: 'gold' | 'red';
}> = ({ className = '', size = 80, tone = 'gold' }) => {
  const iconId = useId().replace(/:/g, '');
  const goldGradientId = `ganeshaGold-${iconId}`;
  const haloGradientId = `haloGlow-${iconId}`;
  const colors = tone === 'red'
    ? { bright: '#ffc7c7', light: '#ef6a6a', primary: '#d62828', dark: '#8a1010', halo: '#e53935' }
    : { bright: '#fff7ea', light: '#e8d4b5', primary: '#c49a50', dark: '#9b7432', halo: '#c49a50' };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter ${tone === 'red' ? 'drop-shadow-[0_4px_8px_rgba(220,38,38,0.4)]' : 'drop-shadow-[0_4px_8px_rgba(196,154,80,0.35)]'}`}
      >
        <defs>
          <linearGradient id={goldGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.bright} />
            <stop offset="30%" stopColor={colors.light} />
            <stop offset="60%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.dark} />
          </linearGradient>
          <radialGradient id={haloGradientId} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={colors.halo} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.halo} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Aura Halo */}
        <circle cx="50" cy="46" r="42" fill={`url(#${haloGradientId})`} />
        <circle cx="50" cy="46" r="38" stroke={`url(#${goldGradientId})`} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />

        {/* Crown (Mukut) */}
        <path
          d="M42 22 L50 10 L58 22 L54 26 L46 26 Z"
          fill={`url(#${goldGradientId})`}
          stroke="#9B7432"
          strokeWidth="0.75"
        />
        <circle cx="50" cy="14" r="1.5" fill="#781C32" />

        {/* Tilak on Forehead */}
        <path d="M48 28 C48 28 50 25 52 28 C52 33 48 33 48 28 Z" fill="#781C32" />
        <circle cx="50" cy="30" r="1" fill="#C49A50" />

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M40 32 C30 28 24 38 28 50 C31 54 36 52 38 48"
          stroke={`url(#${goldGradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Ear */}
        <path
          d="M60 32 C70 28 76 38 72 50 C69 54 64 52 62 48"
          stroke={`url(#${goldGradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Face & Trunk (Sondh) */}
        <path
          d="M44 32 C47 31 53 31 56 32 C56 38 55 45 54 53 C53 62 45 68 38 65 C32 62 33 55 38 54 C42 53 43 57 40 59"
          stroke={`url(#${goldGradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Single Tusk (Ekdant) */}
        <path d="M43 45 L38 47 L41 49 Z" fill={`url(#${goldGradientId})`} />

        {/* Eyes */}
        <ellipse cx="44" cy="37" rx="1.8" ry="1" fill="#421420" />
        <ellipse cx="56" cy="37" rx="1.8" ry="1" fill="#421420" />

        {/* Modak in Hand */}
        <circle cx="64" cy="58" r="4.5" fill={`url(#${goldGradientId})`} stroke="#9B7432" strokeWidth="0.5" />
        <path d="M64 54 L62 57 L66 57 Z" fill="#781C32" />

        {/* Lotus Base / Sacred Pedestal */}
        <path
          d="M32 78 C38 74 44 76 50 78 C56 76 62 74 68 78 C65 83 58 85 50 85 C42 85 35 83 32 78 Z"
          fill={`url(#${goldGradientId})`}
          opacity="0.85"
        />
        <path
          d="M26 80 C34 78 42 81 50 82 C58 81 66 78 74 80 C70 87 60 89 50 89 C40 89 30 87 26 80 Z"
          fill="#781C32"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

// Royal Kalash with Coconut and Mango Leaves SVG
export const KalashIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 50 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <defs>
        <linearGradient id="kalashGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7EA" />
          <stop offset="50%" stopColor="#C49A50" />
          <stop offset="100%" stopColor="#9B7432" />
        </linearGradient>
      </defs>
      {/* Coconut atop */}
      <circle cx="32" cy="15" r="7" fill="#8B4513" stroke="url(#kalashGold)" strokeWidth="1" />
      {/* Mango leaves */}
      <path d="M32 15 C26 12 20 18 20 25 C26 24 30 20 32 15 Z" fill="#2E7D32" stroke="url(#kalashGold)" strokeWidth="0.5" />
      <path d="M32 15 C38 12 44 18 44 25 C38 24 34 20 32 15 Z" fill="#2E7D32" stroke="url(#kalashGold)" strokeWidth="0.5" />
      {/* Kalash Pot (Lota) */}
      <path d="M22 25 L42 25 L40 28 L24 28 Z" fill="url(#kalashGold)" />
      <path
        d="M23 28 C16 35 15 48 24 53 C27 55 37 55 40 53 C49 48 48 35 41 28 Z"
        fill="url(#kalashGold)"
        stroke="#9B7432"
        strokeWidth="1"
      />
      {/* Red Swastik / Sacred Band */}
      <rect x="23" y="36" width="18" height="4" fill="#781C32" rx="1" />
      {/* Base */}
      <path d="M25 53 L39 53 L41 57 L23 57 Z" fill="url(#kalashGold)" />
    </svg>
  );
};

// Traditional Royal Mandap with Floral Garlands and Sacred Havan Kund
export const RoyalMandapIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-xl h-auto filter drop-shadow-md"
      >
        <defs>
          <linearGradient id="mandapGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7EA" />
            <stop offset="35%" stopColor="#E8D4B5" />
            <stop offset="70%" stopColor="#C49A50" />
            <stop offset="100%" stopColor="#9B7432" />
          </linearGradient>
          <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF3D00" />
            <stop offset="50%" stopColor="#FF9100" />
            <stop offset="100%" stopColor="#FFEA00" />
          </linearGradient>
          <radialGradient id="mandapGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#C49A50" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C49A50" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="300" cy="190" r="170" fill="url(#mandapGlow)" />

        {/* Outer Dome / Chhatri Arch */}
        <path
          d="M120 160 C120 70 200 40 300 30 C400 40 480 70 480 160"
          stroke="url(#mandapGold)"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M140 160 C140 85 210 55 300 46 C390 55 460 85 460 160"
          stroke="url(#mandapGold)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Kalash on Top of Dome */}
        <path d="M296 30 L304 30 L306 18 L294 18 Z" fill="url(#mandapGold)" />
        <circle cx="300" cy="14" r="5" fill="#781C32" stroke="url(#mandapGold)" strokeWidth="1" />
        <path d="M300 9 L300 4" stroke="url(#mandapGold)" strokeWidth="2" strokeLinecap="round" />

        {/* Ornate Arch Valance (Toran / Floral Festoons) */}
        <path
          d="M140 160 Q 180 190, 220 160 Q 260 190, 300 160 Q 340 190, 380 160 Q 420 190, 460 160"
          stroke="#BC7563"
          strokeWidth="4"
          fill="none"
        />
        {/* Hanging Floral Marigold Bells */}
        {[180, 220, 260, 300, 340, 380, 420].map((cx, idx) => (
          <g key={idx}>
            <line x1={cx} y1="168" x2={cx} y2="185" stroke="url(#mandapGold)" strokeWidth="1" />
            <circle cx={cx} cy="188" r="4.5" fill={idx % 2 === 0 ? "#FF9800" : "#E91E63"} />
            <circle cx={cx} cy="188" r="2" fill="#FFF7EA" />
          </g>
        ))}

        {/* Carved Pillars (Left & Right) */}
        {/* Left Outer Pillar */}
        <g>
          <rect x="130" y="160" width="16" height="150" fill="url(#mandapGold)" rx="2" />
          <rect x="124" y="152" width="28" height="10" fill="url(#mandapGold)" rx="2" stroke="#9B7432" strokeWidth="0.5" />
          <rect x="122" y="306" width="32" height="12" fill="url(#mandapGold)" rx="2" stroke="#9B7432" strokeWidth="0.5" />
          {/* Pillar Carvings */}
          <line x1="138" y1="170" x2="138" y2="300" stroke="#781C32" strokeWidth="1" />
        </g>

        {/* Right Outer Pillar */}
        <g>
          <rect x="454" y="160" width="16" height="150" fill="url(#mandapGold)" rx="2" />
          <rect x="448" y="152" width="28" height="10" fill="url(#mandapGold)" rx="2" stroke="#9B7432" strokeWidth="0.5" />
          <rect x="446" y="306" width="32" height="12" fill="url(#mandapGold)" rx="2" stroke="#9B7432" strokeWidth="0.5" />
          <line x1="462" y1="170" x2="462" y2="300" stroke="#781C32" strokeWidth="1" />
        </g>

        {/* Raised Stage Platform */}
        <polygon points="100,318 500,318 520,335 80,335" fill="url(#mandapGold)" />
        <rect x="70" y="335" width="460" height="12" fill="#781C32" stroke="url(#mandapGold)" strokeWidth="1" rx="2" />

        {/* Sacred Havan Kund (Agni Kund) */}
        <polygon points="260,290 340,290 355,315 245,315" fill="#591D2C" stroke="url(#mandapGold)" strokeWidth="2" />
        <polygon points="268,295 332,295 342,312 258,312" fill="#3F121E" />

        {/* Holy Agni (Sacred Fire) with subtle animated flames */}
        <path
          d="M300 250 C290 270 282 280 285 295 C295 295 305 295 315 295 C318 280 310 270 300 250 Z"
          fill="url(#fireGrad)"
          className="animate-pulse"
        />
        <path
          d="M300 262 C295 275 290 282 292 294 C298 294 302 294 308 294 C310 282 305 275 300 262 Z"
          fill="#FFF7EA"
          opacity="0.85"
        />

        {/* Floral Garlands draping pillars */}
        <path d="M138 175 Q 150 200, 138 230 Q 150 260, 138 290" stroke="#E91E63" strokeWidth="3" fill="none" strokeDasharray="3 3" />
        <path d="M462 175 Q 450 200, 462 230 Q 450 260, 462 290" stroke="#E91E63" strokeWidth="3" fill="none" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};

// Royal Arched Corner Ornaments
export const RoyalCornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 56 }) => {
  const rotationClass = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={`text-gold transition-transform duration-300 pointer-events-none ${rotationClass} ${className}`}
    >
      <path
        d="M6 6 L6 36 C6 24 16 16 36 16 L60 16 C68 16 74 10 74 6 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 12 L12 28 C12 20 20 12 28 12 L50 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <circle cx="10" cy="10" r="3.5" fill="#781C32" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="28" r="2.5" fill="currentColor" />
    </svg>
  );
};

// Floating Flower Petals (Rose and Marigold)
export const FloatingPetalsOverlay: React.FC = () => {
  const petals = [
    { left: '8%', delay: '0s', duration: '12s', color: '#E91E63', size: '14px' },
    { left: '22%', delay: '3s', duration: '15s', color: '#FF9800', size: '18px' },
    { left: '38%', delay: '1.5s', duration: '11s', color: '#D81B60', size: '12px' },
    { left: '55%', delay: '5s', duration: '14s', color: '#FFA000', size: '16px' },
    { left: '72%', delay: '2s', duration: '13s', color: '#C2185B', size: '15px' },
    { left: '88%', delay: '4.5s', duration: '16s', color: '#FFB300', size: '13px' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="absolute -top-6 rounded-full opacity-70 animate-petal-fall"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size,
            backgroundColor: petal.color,
            filter: 'blur(0.5px)',
            borderRadius: '50% 0 50% 50%',
            transform: 'rotate(-45deg)',
          }}
        />
      ))}
    </div>
  );
};
