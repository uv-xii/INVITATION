import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Calendar, MapPin, CheckCircle2, Share2, Users } from 'lucide-react';
import { weddingConfig } from '../../data/weddingConfig';

interface NavbarProps {
  onOpenShareModal: () => void;
  totalVisitors?: number | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShareModal, totalVisitors }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Invitation', href: '#invitation', icon: Heart },
    { label: 'Couple', href: '#couple', icon: Heart },
    { label: 'Events', href: '#events', icon: Calendar },
    { label: 'Venue', href: '#venue', icon: MapPin },
    { label: 'Blessings', href: '#blessings', icon: Heart },
    { label: 'RSVP', href: '#rsvp', icon: CheckCircle2 },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-gold/30 py-2 sm:py-2.5'
            : 'bg-ivory/85 backdrop-blur-sm border-b border-gold/20 py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#invitation"
            className="flex items-center space-x-2 text-leaf group"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#invitation');
            }}
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider gold-gradient-text">
              {weddingConfig.couple.monogram}
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-champagne/80 border-l border-gold/40 pl-2">
              Wedding Invitation
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-widest text-maroon hover:text-terracotta transition-colors font-medium relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Visitor Counter Pill (Discreet) */}
            {typeof totalVisitors === 'number' && (
              <div
                className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-leaf/5 border border-leaf/20 text-maroon text-[11px]"
                title="Total unique visits to this wedding invitation"
              >
                <Users size={12} className="text-gold" />
                <span>{totalVisitors} {totalVisitors === 1 ? 'Guest' : 'Guests'} Visited</span>
              </div>
            )}

            <button
              onClick={onOpenShareModal}
              className="flex items-center space-x-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border border-leaf/40 text-leaf bg-transparent hover:bg-leaf hover:text-ivory transition-all duration-200 cursor-pointer"
              title="Share Invitation"
            >
              <Share2 size={13} />
              <span className="hidden xs:inline">Share</span>
            </button>

            <a
              href="#rsvp"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#rsvp');
              }}
              className="gold-gradient-bg text-burgundy-dark font-serif font-bold text-xs px-4 py-1.5 rounded-full hover:shadow-gold-glow transition-all duration-200 transform hover:scale-105"
            >
              RSVP
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-leaf p-1.5 hover:text-terracotta focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-burgundy-dark/95 backdrop-blur-lg pt-20 px-6 pb-8 flex flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <div className="text-center pb-4 border-b border-gold/20">
              <span className="font-script text-3xl text-gold">
                {weddingConfig.couple.bride.firstName} &amp; {weddingConfig.couple.groom.firstName}
              </span>
              <p className="text-xs text-champagne/80 tracking-widest mt-1 font-serif">
                {weddingConfig.weddingDetails.displayDate}
              </p>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center space-x-3 text-ivory hover:text-gold text-base tracking-wider py-2.5 border-b border-white/5 text-left"
                >
                  <Icon size={18} className="text-gold" />
                  <span className="font-serif">{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-gold/20 flex flex-col items-center space-y-3">
            {typeof totalVisitors === 'number' && (
              <div className="flex items-center space-x-1.5 text-xs text-champagne/80">
                <Users size={14} className="text-gold" />
                <span>{totalVisitors} {totalVisitors === 1 ? 'Guest' : 'Guests'} Visited</span>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShareModal();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-full border border-gold text-gold text-sm font-medium hover:bg-gold/10"
            >
              <Share2 size={16} />
              <span>Share Wedding Invitation</span>
            </button>
            <p className="text-[11px] text-champagne/60 tracking-wider">
              {weddingConfig.couple.hashtag}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
