import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Flower2, Music, Flame, Heart } from 'lucide-react';
import { weddingConfig } from '../../data/weddingConfig';
import { GoldDivider, KalashIcon } from '../Common/DecorativeElements';

export const EventCards: React.FC = () => {
  const { events } = weddingConfig;

  // Icon mapping for wedding ceremonies
  const getEventIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flower2':
        return <Flower2 size={24} className="text-amber-500" />;
      case 'Sparkles':
        return <Sparkles size={24} className="text-emerald-500" />;
      case 'Music':
        return <Music size={24} className="text-gold" />;
      case 'Heart':
        return <Heart size={24} className="text-rose-500" />;
      case 'Flame':
      default:
        return <Flame size={24} className="text-amber-400 animate-pulse" />;
    }
  };

  return (
    <section id="events" className="py-16 px-4 sm:px-6 bg-ivory-warm relative overflow-hidden">
      {/* Background traditional mesh */}
      <div className="absolute inset-0 bg-mandap-mesh opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <KalashIcon className="mx-auto mb-2 text-gold" size={44} />
          <span className="text-xs uppercase tracking-[0.3em] text-terracotta-dark font-semibold">
            Sacred Auspicious Itinerary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy font-bold mt-1">
            Our Celebrations
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-maroon/80 font-serif italic">
            "Join our families for four days of wedding celebrations."
          </p>
        </div>

        {/* Wedding event cards, displayed in date order */}
        <div className="grid grid-cols-1 gap-4 items-stretch">
          {events.map((event, index) => {
            const isMain = Boolean(event.isMainCeremony);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative rounded-sm p-5 sm:p-7 flex flex-col justify-between transition-colors duration-300 ${
                  isMain
                    ? 'bg-leaf-deep text-ivory border border-gold/60 shadow-sm'
                    : 'bg-white/80 text-maroon-deep border border-gold/30 hover:border-gold'
                }`}
              >
                {/* Highlight Badge for Main Ceremony */}
                {isMain && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient-bg text-burgundy-dark font-serif font-bold text-xs uppercase px-4 py-1 rounded-sm shadow-sm tracking-wider flex items-center space-x-1">
                    <Sparkles size={13} className="text-burgundy" />
                    <span>The Main Vivah Sanskar</span>
                  </div>
                )}

                <div>
                  {/* Top Bar: Icon & Sequence Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-sm flex items-center justify-center border ${
                        isMain
                          ? 'bg-gold/20 border-gold/40 text-gold'
                          : 'bg-ivory border-gold/30'
                      }`}
                    >
                      {getEventIcon(event.iconName)}
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`text-xs font-serif font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                          isMain
                            ? 'bg-gold/15 text-gold border-gold/40'
                            : 'bg-ivory text-terracotta-dark border-gold/30'
                        }`}
                      >
                        Ceremony {index + 1} of {events.length}
                      </span>
                    </div>
                  </div>

                  {/* Hindi & English Event Title */}
                  {event.hindiTitle && (
                    <span
                      className={`block font-serif text-sm tracking-wide ${
                        isMain ? 'text-gold' : 'text-terracotta-dark'
                      }`}
                    >
                      {event.hindiTitle}
                    </span>
                  )}
                  <h3
                    className={`font-serif text-2xl sm:text-3xl font-bold mt-0.5 leading-snug ${
                      isMain ? 'text-ivory' : 'text-burgundy'
                    }`}
                  >
                    {event.name}
                  </h3>

                  {/* Short Event Description */}
                  <p
                    className={`text-xs sm:text-sm mt-3 leading-relaxed font-sans ${
                      isMain ? 'text-ivory/85' : 'text-maroon/80'
                    }`}
                  >
                    {event.description}
                  </p>

                  {/* Event Details: Date, Time, Venue */}
                  <div
                    className={`mt-6 pt-5 border-t space-y-3 text-xs sm:text-sm ${
                      isMain
                        ? 'border-gold/25 text-champagne'
                        : 'border-gold/20 text-maroon-deep'
                    }`}
                  >
                    {/* Event Date */}
                    <div className="flex items-center space-x-2.5">
                      <Calendar
                        size={17}
                        className={isMain ? 'text-gold flex-shrink-0' : 'text-gold-dark flex-shrink-0'}
                      />
                      <span className="font-serif font-bold text-sm sm:text-base">
                        {event.date}
                      </span>
                    </div>

                    {/* Event Time */}
                    {event.time && (
                      <div className="flex items-center space-x-2.5">
                        <Clock
                          size={17}
                          className={isMain ? 'text-gold flex-shrink-0' : 'text-gold-dark flex-shrink-0'}
                        />
                        <span className="font-medium">
                          {event.time}
                        </span>
                      </div>
                    )}

                    {/* Venue & Address */}
                    <div className="flex items-start space-x-2.5">
                      <MapPin
                        size={17}
                        className={isMain ? 'text-gold mt-0.5 flex-shrink-0' : 'text-gold-dark mt-0.5 flex-shrink-0'}
                      />
                      <div>
                        <strong className="block font-serif text-sm font-semibold">
                          {event.venue}
                        </strong>
                        <span className="text-xs opacity-80 block mt-0.5">
                          {event.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
