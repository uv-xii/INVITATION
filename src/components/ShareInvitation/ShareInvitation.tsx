import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Share2, Copy, Check, MessageSquare, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../../data/weddingConfig';
import { GoldDivider, LordGaneshaIcon } from '../Common/DecorativeElements';

interface ShareInvitationProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const ShareInvitation: React.FC<ShareInvitationProps> = ({
  isModalOpen = false,
  onCloseModal,
}) => {
  const [copied, setCopied] = useState(false);

  const getWebsiteUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.href.split('#')[0];
    }
    return weddingConfig.sharing.websiteUrl;
  };

  const inviteUrl = getWebsiteUrl();

  const formattedWhatsAppText = weddingConfig.sharing.whatsappMessageTemplate.replace(
    '{URL}',
    inviteUrl
  );

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      formattedWhatsAppText
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: weddingConfig.sharing.ogTitle,
          text: `Together with our families, we invite you to the wedding of ${weddingConfig.couple.bride.firstName} & ${weddingConfig.couple.groom.firstName}!`,
          url: inviteUrl,
        });
      } catch (err) {
        console.log('Share canceled or not supported:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#C49A50', '#E8D4B5'],
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const content = (
    <div className="flex flex-col items-center text-center">
      <LordGaneshaIcon size={64} className="mb-2" />
      <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
        Gratitude &amp; Joy
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-bold mt-1">
        We Can't Wait To Celebrate With You
      </h2>
      <p className="font-script text-3xl sm:text-4xl text-gold mt-2">
        {weddingConfig.couple.bride.firstName} &amp; {weddingConfig.couple.groom.firstName}
      </p>
      <p className="font-serif text-sm sm:text-base text-champagne/90 mt-1">
        {weddingConfig.weddingDetails.displayDate} • {weddingConfig.venue.city}
      </p>

      <GoldDivider light className="my-6" />

      {/* QR Code Card */}
      <div className="bg-white p-5 rounded-2xl border-2 border-gold shadow-2xl flex flex-col items-center max-w-xs mb-8">
        <div className="p-2 bg-ivory rounded-xl border border-gold/30">
          <QRCodeSVG
            value={inviteUrl}
            size={180}
            bgColor="#FFF7EA"
            fgColor="#591D2C"
            level="Q"
            includeMargin={true}
          />
        </div>
        <span className="text-xs font-serif font-bold text-burgundy mt-3">
          Scan to Open Invitation on Mobile
        </span>
        <span className="text-[10px] text-maroon/70 font-sans mt-0.5">
          Share instantly with relatives &amp; friends
        </span>
      </div>

      {/* Share Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
        {/* WhatsApp Share Button */}
        <button
          onClick={handleShareWhatsApp}
          className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm shadow-md transition-all transform hover:scale-102"
        >
          <MessageSquare size={17} />
          <span>Share on WhatsApp</span>
        </button>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex-1 min-w-[140px] flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl gold-gradient-bg text-burgundy-dark font-serif font-bold text-xs sm:text-sm shadow-md transition-all transform hover:scale-102"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* Device Native Share */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-burgundy border border-gold/60 text-ivory hover:bg-gold hover:text-burgundy-dark transition-all text-xs uppercase tracking-wider font-semibold"
          >
            <Share2 size={15} />
            <span>More Sharing Options</span>
          </button>
        )}
      </div>

      <div className="mt-8 text-xs text-champagne/70 font-serif">
        Official Hashtag: <strong className="text-gold">{weddingConfig.couple.hashtag}</strong>
      </div>
    </div>
  );

  return (
    <>
      {/* Inline Section */}
      <section className="py-16 px-4 sm:px-6 bg-leaf-deep text-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-mandap-dark-mesh opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">{content}</div>

        {/* Footer Credit & Traditional Blessing */}
        <div className="mt-16 pt-8 border-t border-gold/20 text-center text-xs text-champagne/60 font-serif">
          <p className="flex items-center justify-center space-x-1.5 mb-2">
            <span>Crafted with devotion for</span>
            <Heart size={12} className="text-gold fill-gold" />
            <span className="text-gold font-bold">{weddingConfig.couple.bride.fullName} &amp; {weddingConfig.couple.groom.fullName}</span>
          </p>
          <p className="text-[11px] text-ivory/40">
            A traditional wedding invitation • © 2026
          </p>
        </div>
      </section>

      {/* Pop-up Modal (When opened from Navbar "Share" button) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-burgundy-deep text-ivory p-6 sm:p-8 rounded-3xl border-2 border-gold shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onCloseModal}
                className="absolute top-4 right-4 text-ivory/80 hover:text-gold p-2 rounded-full border border-gold/30 bg-burgundy/60"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
