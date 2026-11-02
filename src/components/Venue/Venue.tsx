import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { weddingConfig } from '../../data/weddingConfig';
import { GoldDivider, KalashIcon } from '../Common/DecorativeElements';

export const Venue: React.FC = () => {
  const { venue } = weddingConfig;

  return (
    <section id="venue" className="py-16 px-4 sm:px-6 bg-ivory relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <KalashIcon className="mx-auto mb-2 text-gold" size={44} />
          <span className="text-xs uppercase tracking-[0.3em] text-terracotta-dark font-semibold">
            The Wedding Destination
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy font-bold mt-1">
            Venue &amp; Location
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-maroon/80 font-serif italic">
            "We look forward to celebrating with you at our wedding venue."
          </p>
        </div>

        {/* Venue Showcase Card */}
        <div className="bg-white rounded-sm border border-gold/30 shadow-sm overflow-hidden">
          
          {/* Top Grid: One Venue Photograph + Venue Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* The One Venue Photograph */}
            <div className="md:col-span-5 relative min-h-[260px] md:min-h-full overflow-hidden bg-burgundy-deep">
              <img
                src={venue.photo}
                alt={`${weddingConfig.couple.groom.firstName} and ${weddingConfig.couple.bride.firstName}`}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-3 left-3 text-ivory text-xs font-serif uppercase tracking-widest bg-burgundy-dark/80 px-3 py-1 rounded-full border border-gold/40">
                Tanuj &amp; Sudha
              </div>
            </div>

            {/* Venue Details & Directions */}
            <div className="md:col-span-7 p-6 sm:p-10 bg-leaf-deep text-ivory flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-sans font-semibold">
                  Wedding Venue
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-bold mt-1">
                  {venue.name}
                </h3>
                <p className="text-xs sm:text-sm text-champagne/90 font-serif italic mt-0.5">
                  {venue.subHeading}
                </p>

                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-ivory/90 mt-5 pt-4 border-t border-gold/30">
                  <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{venue.address}</span>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="mt-8 pt-4 border-t border-gold/20 flex items-center justify-between">
                <a
                  href={venue.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 gold-gradient-bg text-burgundy-dark font-serif font-bold text-sm px-6 py-3 rounded-full hover:shadow-gold-glow transition-all duration-200 transform hover:scale-105"
                >
                  <Navigation size={17} />
                  <span>Get Directions</span>
                  <ExternalLink size={14} className="ml-1 opacity-70" />
                </a>

                <span className="text-[11px] text-champagne/70 font-sans hidden sm:inline">
                  {venue.city}, {venue.state}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="relative w-full h-80 sm:h-96 bg-gray-100 border-t border-gold/20">
            <iframe
              title={`Google Map - ${venue.name}`}
              src={venue.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-105 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
