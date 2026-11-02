import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { weddingConfig } from '../../data/weddingConfig';
import { LordGaneshaIcon, RoyalMandapIllustration, GoldDivider, RoyalCornerFlourish } from '../Common/DecorativeElements';

export const MainInvitation: React.FC = () => {
  return (
    <section id="invitation" className="relative pt-24 pb-16 sm:py-28 px-4 sm:px-6 overflow-hidden bg-ivory">
      {/* Background Indian jaali texture */}
      <div className="absolute inset-0 bg-mandap-mesh opacity-60 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Main Royal Parchment / Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9 }}
          className="relative bg-transparent rounded-none p-6 sm:p-10 md:p-12 border-0 shadow-none text-center overflow-hidden"
        >
          {/* Ornate Gold Corners */}
          <RoyalCornerFlourish position="top-left" className="hidden" size={56} />
          <RoyalCornerFlourish position="top-right" className="hidden" size={56} />
          <RoyalCornerFlourish position="bottom-left" className="hidden" size={56} />
          <RoyalCornerFlourish position="bottom-right" className="hidden" size={56} />

          {/* Inner Inset Border */}
          <div className="hidden" />

          {/* Ganesh Shloka Header */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <LordGaneshaIcon size={76} className="mb-3" />
            <span className="font-serif text-lg sm:text-2xl text-burgundy font-bold tracking-widest">
              {weddingConfig.weddingDetails.mantraDevanagari}
            </span>
            <p className="text-xs sm:text-sm text-[#7D5A50] max-w-md mt-1 font-serif italic">
              {weddingConfig.weddingDetails.mantraMeaning}
            </p>
          </div>

          <GoldDivider className="my-4" />

          {/* Sacred Invitation Invocation */}
          <div className="relative z-10 my-4">
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-dark font-semibold">
              Under the divine grace of the Almighty
            </p>
            <p className="font-serif italic text-base sm:text-lg text-maroon-deep/90 mt-1">
              We cordially invite you to grace the auspicious marriage ceremony of
            </p>
          </div>

          {/* Couple Names Section */}
          <div className="relative z-10 my-8 py-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              {/* Groom */}
              <div className="flex flex-col items-center">
                <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-gold-dark font-medium">
                  {weddingConfig.couple.groom.title}
                </span>
                <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-burgundy tracking-wide">
                  {weddingConfig.couple.groom.fullName}
                </h2>
                <span className="text-xs sm:text-sm text-maroon/80 font-serif">
                  Son of {weddingConfig.couple.groom.parents.father} &amp; {weddingConfig.couple.groom.parents.mother}
                </span>
                <span className="max-w-sm text-xs text-maroon/70 font-serif">
                  {weddingConfig.couple.groom.parents.residence}
                </span>
              </div>

              {/* Decorative Ampersand */}
              <div className="flex items-center justify-center my-3">
                <div className="h-[1px] w-12 sm:w-20 bg-gold/50" />
                <span className="font-script text-3xl sm:text-4xl text-gold mx-4">
                  weds
                </span>
                <div className="h-[1px] w-12 sm:w-20 bg-gold/50" />
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center">
                <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-gold-dark font-medium">
                  {weddingConfig.couple.bride.title}
                </span>
                <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-burgundy tracking-wide">
                  {weddingConfig.couple.bride.fullName}
                </h2>
                <span className="text-xs sm:text-sm text-maroon/80 font-serif">
                  Daughter of {weddingConfig.couple.bride.parents.father} &amp; {weddingConfig.couple.bride.parents.mother}
                </span>
                <span className="max-w-sm text-xs text-maroon/70 font-serif">
                  {weddingConfig.couple.bride.parents.residence}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Traditional Mandap Illustration */}
          <div className="relative z-10 my-6">
            <RoyalMandapIllustration className="hidden" />
          </div>

          {/* Wedding Date & Muhurat Pill Card */}
          <div className="relative z-10 mt-8">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-leaf text-ivory px-6 sm:px-10 py-4 sm:py-5 rounded-sm border border-gold/50 shadow-sm">
              {/* Date */}
              <div className="flex items-center space-x-3 text-left">
                <div className="p-2.5 rounded-full bg-gold/20 border border-gold/40 text-gold">
                  <Calendar size={22} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-champagne block">
                    Auspicious Date
                  </span>
                  <span className="font-serif text-base sm:text-lg font-bold text-ivory">
                    {weddingConfig.weddingDetails.displayDate}
                  </span>
                </div>
              </div>

            </div>

            {/* Venue hint */}
            <p className="mt-4 text-xs sm:text-sm text-maroon font-serif">
              At <strong className="text-burgundy">{weddingConfig.venue.name}</strong>, {weddingConfig.venue.city}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
