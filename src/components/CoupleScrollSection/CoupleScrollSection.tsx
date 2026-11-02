import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { FloralRing } from '../Common/FloralRing';
import { CLICK_HEART_COLORS } from '../Common/heartColors';

interface CoupleMedallionProps {
  image: string;
  name: string;
  alt: string;
  nameOffset: MotionValue<number>;
}

function CoupleMedallion({ image, name, alt, nameOffset }: CoupleMedallionProps) {
  return (
    <div className="relative h-[124px] w-[124px] sm:h-[160px] sm:w-[160px]">
      <FloralRing />

      <div className="absolute inset-0 overflow-hidden rounded-full border-[3px] border-[#b99755] bg-[#f5ead5] shadow-xl">
        <img
          src={image}
          alt={alt}
          className="h-full w-full rounded-full object-cover"
          draggable="false"
          loading="lazy"
        />
      </div>

      <div className="absolute left-1/2 top-full mt-8 w-[150px] -translate-x-1/2 sm:w-[190px]">
        <motion.p
          style={{ x: nameOffset }}
          className="w-full text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6b37] sm:text-sm"
        >
          {name}
        </motion.p>
      </div>
    </div>
  );
}

export const CoupleScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [windowWidth, setWindowWidth] = useState(
    typeof window === 'undefined' ? 1280 : document.documentElement.clientWidth,
  );
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const animationProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001,
  });
  const connectionBurstPlayed = useRef(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(document.documentElement.clientWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const finalOffset = Math.min(118, Math.max(74, windowWidth * 0.1));
  const edgeOffset = windowWidth * 0.48;
  const portraitCenterOffset = windowWidth >= 640 ? 80 : 62;
  const nameHalfWidth = windowWidth >= 640 ? 95 : 75;
  const groomX = useTransform(
    animationProgress,
    [0, 0.65, 1],
    prefersReducedMotion
      ? [
          finalOffset - portraitCenterOffset,
          finalOffset - portraitCenterOffset,
          finalOffset - portraitCenterOffset,
        ]
      : [
          edgeOffset - portraitCenterOffset,
          finalOffset - portraitCenterOffset,
          finalOffset - portraitCenterOffset,
        ],
  );
  const brideX = useTransform(
    animationProgress,
    [0, 0.65, 1],
    prefersReducedMotion
      ? [
          -finalOffset - portraitCenterOffset,
          -finalOffset - portraitCenterOffset,
          -finalOffset - portraitCenterOffset,
        ]
      : [
          -edgeOffset - portraitCenterOffset,
          -finalOffset - portraitCenterOffset,
          -finalOffset - portraitCenterOffset,
        ],
  );
  const getNameOffset = (x: number) => {
    const portraitCenter = windowWidth / 2 + x + portraitCenterOffset;
    const visibleCenter = Math.min(
      windowWidth - nameHalfWidth,
      Math.max(nameHalfWidth, portraitCenter),
    );
    return visibleCenter - portraitCenter;
  };
  const groomNameX = useTransform(groomX, getNameOffset);
  const brideNameX = useTransform(brideX, getNameOffset);
  const threadProgress = useTransform(
    animationProgress,
    [0, 0.65, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1],
  );
  const glowOpacity = useTransform(
    animationProgress,
    [0, 0.65, 1],
    prefersReducedMotion ? [0.2, 0.2, 0.2] : [0.08, 0.3, 0.3],
  );
  const ganeshaOpacity = useTransform(
    animationProgress,
    prefersReducedMotion ? [0, 0.65, 1] : [0, 0.62, 0.7],
    [0, 0, 1],
  );
  const { groom, bride } = weddingConfig.couple;

  useMotionValueEvent(animationProgress, 'change', (progress) => {
    if (prefersReducedMotion) return;

    if (progress < 0.5) {
      connectionBurstPlayed.current = false;
      return;
    }

    if (progress < 0.68 || connectionBurstPlayed.current) return;
    connectionBurstPlayed.current = true;

    const heartShapes = CLICK_HEART_COLORS.map((color) =>
      confetti.shapeFromText({ text: '❤', scalar: 1.5, color }),
    );
    confetti({
      particleCount: 110,
      spread: 100,
      startVelocity: 28,
      gravity: 0.8,
      decay: 0.92,
      scalar: 2.2,
      shapes: heartShapes,
      origin: { x: 0.5, y: 0.48 },
    });
  });

  return (
    <section
      id="couple"
      ref={sectionRef}
      className="relative h-[220vh] w-full overflow-x-clip bg-ivory"
    >
      <div className="sticky top-1/2 flex h-[340px] w-full -translate-y-1/2 items-center justify-center overflow-hidden sm:h-[380px]">
        <div className="pointer-events-none absolute inset-x-4 top-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta-dark">
            Two Souls, One Sacred Journey
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-burgundy sm:text-4xl">
            The Bride &amp; Groom
          </h2>
        </div>

        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8ad55] blur-3xl"
        />

        <svg
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-[#b99755]"
          aria-hidden="true"
        >
          <motion.path
            d="M0 150 C200 150 300 150 400 150 S600 150 800 150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            pathLength={threadProgress}
          />
        </svg>

        <motion.div
          style={{ x: groomX, y: '-50%' }}
          className="absolute left-1/2 top-1/2 z-10"
        >
          <CoupleMedallion
            image={groom.photo}
            name={groom.fullName}
            alt={`${groom.fullName} portrait`}
            nameOffset={groomNameX}
          />
        </motion.div>

        <motion.div
          style={{ x: brideX, y: '-50%' }}
          className="absolute left-1/2 top-1/2 z-10"
        >
          <CoupleMedallion
            image={bride.photo}
            name={bride.fullName}
            alt={`${bride.fullName} portrait`}
            nameOffset={brideNameX}
          />
        </motion.div>

        <motion.div
          style={{ opacity: ganeshaOpacity }}
          className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#b99755] bg-[#fffaf0] shadow-lg"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10"
            aria-hidden="true"
          >
            <path
              d="M12 21s-9-5.8-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.2-9 12-9 12Z"
              fill="#e11d48"
              stroke="#be123c"
              strokeWidth="0.8"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
