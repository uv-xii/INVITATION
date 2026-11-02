import React, { useEffect, useState, useCallback } from 'react';
import { CLICK_HEART_COLORS } from './heartColors';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

export const FloatingHeartClickEffect: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const addHeart = useCallback((clientX: number, clientY: number) => {
    const id = Date.now() + Math.random();
    const color = CLICK_HEART_COLORS[Math.floor(Math.random() * CLICK_HEART_COLORS.length)];
    const size = Math.floor(Math.random() * 8) + 16; // 16px to 24px
    const rotation = Math.floor(Math.random() * 30) - 15; // -15deg to +15deg

    setHearts((prev) => [
      ...prev.slice(-15), // Keep max 15 concurrent hearts for ultra-lightweight performance
      { id, x: clientX, y: clientY, color, size, rotation },
    ]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 850);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Don't trigger on inputs or textareas if they are being focused/typed into
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }
      addHeart(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [addHeart]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float-heart"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            color: heart.color,
            fontSize: `${heart.size}px`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
            transform: `translate(-50%, -50%) rotate(${heart.rotation}deg)`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
};
