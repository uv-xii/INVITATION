import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../data/weddingConfig';
import { GoldDivider } from '../Common/DecorativeElements';

export const InvitationMessage: React.FC = () => {
  const { invitationMessage, weddingDetails } = weddingConfig;

  return (
    <section className="py-16 px-4 sm:px-6 bg-leaf-deep text-ivory relative overflow-hidden">
      {/* Background radial gold glow and pattern */}
      <div className="absolute inset-0 bg-mandap-dark-mesh opacity-20 pointer-events-none" />
      <div className="hidden" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Sanskrit Mangalacharan Shloka */}
            <div className="bg-white/5 border border-gold/30 px-5 py-4 rounded-sm max-w-xl mx-auto mb-8">
            <p className="font-serif text-sm sm:text-base text-gold font-medium tracking-wide">
              {weddingDetails.shlokaDevanagari}
            </p>
            <p className="text-xs text-champagne/80 font-serif italic mt-1.5">
              {weddingDetails.shlokaTranslation}
            </p>
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
            An Auspicious Invitation
          </span>

          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold mt-2 mb-3">
            {invitationMessage.heading}
          </h2>

          <GoldDivider light className="my-4" />

          <p className="font-serif italic text-lg sm:text-xl text-champagne mb-6 max-w-2xl leading-relaxed">
            "{invitationMessage.subheading}"
          </p>

          <p className="text-sm sm:text-base text-ivory/90 leading-relaxed max-w-2xl font-sans font-light">
            {invitationMessage.body}
          </p>

          <div className="mt-8 pt-6 border-t border-gold/25">
            <p className="font-serif text-base sm:text-lg text-gold font-medium">
              {invitationMessage.closingBlessing}
            </p>
            <p className="font-script text-2xl text-champagne mt-1">
              The Singh Families
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
