import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../../data/weddingConfig';
import { useCountdown } from '../../hooks/useCountdown';
import { GoldDivider } from '../Common/DecorativeElements';

export const Countdown: React.FC = () => {
  const timeLeft = useCountdown(weddingConfig.weddingDetails.date);

  const units = [
    { label: 'Days', value: timeLeft.days, hindi: 'दिन' },
    { label: 'Hours', value: timeLeft.hours, hindi: 'घंटे' },
    { label: 'Minutes', value: timeLeft.minutes, hindi: 'मिनट' },
    { label: 'Seconds', value: timeLeft.seconds, hindi: 'सेकंड' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-leaf-deep text-ivory relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 bg-mandap-dark-mesh opacity-25 pointer-events-none" />
      <div className="hidden" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
            Counting Down To The Sacred Moment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-bold mt-1">
            Until We Say "I Do" Forever
          </h2>
          <GoldDivider light className="my-4" />
          <p className="text-sm sm:text-base text-champagne/90 font-serif italic max-w-xl mx-auto mb-10">
            {weddingConfig.weddingDetails.displayDate}
          </p>

          {/* Countdown Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {units.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative bg-white/5 rounded-sm p-4 sm:p-6 border border-gold/40 group hover:border-gold transition-colors duration-300"
              >
                {/* Glow ring */}
                <div className="hidden" />

                {/* Counter Value */}
                <span className="relative block font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>

                {/* Labels */}
                <div className="relative mt-2 pt-2 border-t border-gold/30">
                  <span className="block text-xs uppercase tracking-widest text-ivory font-medium font-sans">
                    {unit.label}
                  </span>
                  <span className="block text-[11px] text-champagne/70 font-serif mt-0.5">
                    {unit.hindi}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Auspicious Note */}
          <div className="mt-10 inline-flex items-center space-x-2 text-xs sm:text-sm text-champagne/80 bg-burgundy/60 border border-gold/30 px-5 py-2 rounded-full">
            <Heart size={14} className="text-gold fill-gold animate-pulse" />
            <span>Blessing our forever with your gracious company</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
