import React, { useRef, useState } from 'react';
import { WeddingOpening } from '../components/InvitationCover/InvitationCover';
import { Navbar } from '../components/Navigation/Navbar';
import { MainInvitation } from '../components/MainInvitation/MainInvitation';
import { CoupleScrollSection } from '../components/CoupleScrollSection/CoupleScrollSection';
import { InvitationMessage } from '../components/InvitationMessage/InvitationMessage';
import { EventCards } from '../components/EventCards/EventCards';
import { Venue } from '../components/Venue/Venue';
import { Countdown } from '../components/Countdown/Countdown';
import { RSVP } from '../components/RSVP/RSVP';
import { Blessings } from '../components/Blessings/Blessings';
import { ShareInvitation } from '../components/ShareInvitation/ShareInvitation';
import { FloatingHeartClickEffect } from '../components/Common/FloatingHeartClickEffect';
import { AudioPlayer } from '../components/AudioPlayer/AudioPlayer';
import { useVisitorTracking } from '../hooks/useVisitorTracking';

export const WeddingInvitation: React.FC = () => {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Visitor Tracking in MongoDB
  const { totalVisitors } = useVisitorTracking();

  const handleOpenInvitation = () => {
    setIsCoverOpen(true);

    // Smooth scroll to top of main invitation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const startWeddingMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    void audio.play().catch((error: unknown) => {
      console.warn('Wedding music could not start:', error);
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ivory text-maroon-deep selection:bg-burgundy selection:text-ivory">
      <FloatingHeartClickEffect />
      <AudioPlayer audioRef={audioRef} showControls={isCoverOpen} />

      {/* 1. Cinematic Fullscreen Temple Gate Opening Experience */}
      {!isCoverOpen && (
        <WeddingOpening
          onOpen={handleOpenInvitation}
          onOpenStart={startWeddingMusic}
        />
      )}

      {/* Main Wedding Website (Revealed when Temple Gate is tapped) */}
      <div className={`transition-opacity duration-1000 ${isCoverOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation Bar */}
        <Navbar
          onOpenShareModal={() => setIsShareModalOpen(true)}
          totalVisitors={totalVisitors}
        />

        {/* Section 2: Main Wedding Invitation & Sacred Mandap */}
        <MainInvitation />

        {/* Section 4: Scroll-Linked Couple Animation (Bride & Groom Converging) */}
        <CoupleScrollSection />

        {/* Section 5: Sacred Invitation Message & Sanskrit Shloka */}
        <InvitationMessage />

        {/* Section 6: Wedding Events (Haldi -> Mehendi -> Sangeet -> Vivah) */}
        <EventCards />

        {/* Section 7: Venue and location */}
        <Venue />

        {/* Section 8: Wedding countdown */}
        <Countdown />

        {/* Section 9: Guest blessings */}
        <Blessings />

        {/* Section 10: RSVP */}
        <RSVP />

        {/* Section 10: Final Invitation & Sharing (QR Code + WhatsApp) */}
        <ShareInvitation
          isModalOpen={isShareModalOpen}
          onCloseModal={() => setIsShareModalOpen(false)}
        />
      </div>
    </div>
  );
};
