import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../../data/weddingConfig';
import { LordGaneshaIcon } from '../Common/DecorativeElements';

interface WeddingOpeningProps {
  onOpen: () => void;
  onOpenStart: () => void;
}

export const WeddingOpening: React.FC<WeddingOpeningProps> = ({ onOpen, onOpenStart }) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  const handleGateClick = () => {
    if (isOpening) return;
    onOpenStart();
    setIsOpening(true);

    // Burst golden & rose ceremonial confetti
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#C49A50', '#E8D4B5', '#781C32', '#BC7563', '#FFF7EA'],
      });
    } catch (e) {
      console.log('Confetti effect:', e);
    }

  };

  return (
    <AnimatePresence onExitComplete={onOpen}>
      {!isDismissed && (
      <motion.div
        key="wedding-opening"
        initial={false}
        animate={{ opacity: isOpening ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: {
            duration: prefersReducedMotion ? 0.08 : 0.45,
            delay: isOpening && !prefersReducedMotion ? 0.75 : 0,
          },
        }}
        onAnimationComplete={() => {
          if (isOpening) setIsDismissed(true);
        }}
        className="fixed inset-0 w-screen h-screen z-50 flex flex-col items-center justify-between bg-leaf-deep text-ivory overflow-hidden select-none m-0 p-0"
        style={{ width: '100%', height: '100dvh' }}
      >
        {/* Full-bleed Traditional North Indian Background & Jaali Overlay */}
        <div className="absolute inset-0 bg-mandap-dark-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-leaf-deep/90 via-[#253e35]/90 to-[#1d3028]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-mandap-mesh opacity-20 pointer-events-none" />

        {/* Outer Corner Ornaments */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-gold/70 pointer-events-none text-2xl font-serif">
          🪷
        </div>
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-gold/70 pointer-events-none text-2xl font-serif">
          🪷
        </div>

        {/* Content Container (Constrained vertically to fit 100vh perfectly without scrolling) */}
        <div className="relative z-10 w-full max-w-2xl h-full flex flex-col items-center justify-between py-6 sm:py-10 px-4 text-center">
          
          {/* 1 & 2: Sacred Ganesha & Devanagari Invocation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <LordGaneshaIcon size={56} className="mb-1.5" />
            <h2 className="font-serif text-lg sm:text-2xl text-gold font-bold tracking-widest drop-shadow-md">
              {weddingConfig.weddingDetails.mantraDevanagari}
            </h2>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-champagne/80 font-sans mt-0.5">
              A traditional wedding invitation
            </p>
          </motion.div>

          {/* 3, 4, 5, 6, 7: Couple Names, Invitation Message & Wedding Date */}
          <div className="flex flex-col items-center my-auto py-2">
            {/* Groom's Name */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl text-gold tracking-normal leading-none font-medium"
            >
              {weddingConfig.couple.groom.firstName}
            </motion.h1>

            {/* Decorative Ampersand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center my-1 sm:my-2 space-x-3"
            >
              <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold" />
              <span className="font-serif italic text-xl sm:text-2xl text-champagne">
                &amp;
              </span>
              <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold" />
            </motion.div>

            {/* Bride's Name */}
            <motion.h1
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl text-gold tracking-normal leading-none font-medium"
            >
              {weddingConfig.couple.bride.firstName}
            </motion.h1>

            {/* Invitation Message */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="font-serif italic text-xs sm:text-sm md:text-base text-champagne/90 max-w-md mx-auto mt-3 px-2 leading-relaxed"
            >
              Together with our families, we joyfully invite you to celebrate the sacred beginning of our forever.
            </motion.p>

            {/* Wedding Date */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="mt-3 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-dark/70 border border-gold/40 shadow-inner"
            >
              <span className="font-serif text-xs sm:text-sm text-gold font-medium tracking-wider">
                {weddingConfig.weddingDetails.displayDate}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="relative flex h-[240px] w-full max-w-3xl items-center justify-center"
              style={{ perspective: '900px' }}
            >
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  className="h-full w-full rounded-full bg-[#d8ad55] blur-3xl"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.18 }
                      : { opacity: [0.12, 0.25, 0.12], scale: [0.8, 1.15, 0.8] }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.08 }
                      : { duration: 3, repeat: Infinity }
                  }
                />
              </motion.div>

              <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                <motion.button
                  type="button"
                  onClick={handleGateClick}
                  disabled={isOpening}
                  aria-label="Open wedding invitation with Ganesh seal"
                  whileHover={!isOpening && !prefersReducedMotion ? { scale: 1.12 } : undefined}
                  whileTap={!isOpening && !prefersReducedMotion ? { scale: 0.92 } : undefined}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-gold-light bg-[#9a4338] text-[#f5e5c4] shadow-[inset_0_2px_8px_rgba(255,255,255,0.25),0_8px_16px_rgba(0,0,0,0.25)] disabled:cursor-default"
                >
                  <LordGaneshaIcon size={56} className="pointer-events-none" />
                </motion.button>
              </div>
            </div>

            <motion.div
              animate={
                prefersReducedMotion ? undefined : { y: [0, -4, 0] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
              }
              className="mt-3 flex items-center space-x-2 rounded-full border border-gold bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20 px-5 py-2 shadow-gold-glow"
            >
              <span className="text-xs font-serif font-semibold uppercase tracking-widest text-ivory">
                Tap the Ganesh seal to open
              </span>
              <span className="text-xs text-gold" aria-hidden="true">
                ✦
              </span>
            </motion.div>
          </div>

        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
