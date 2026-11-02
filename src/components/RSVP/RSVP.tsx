import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, User, Heart, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoldDivider, KalashIcon } from '../Common/DecorativeElements';
import { weddingConfig } from '../../data/weddingConfig';
import { submitRSVP, type RSVPAttendance } from '../../utils/submitRSVP';

export const RSVP: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [attendance, setAttendance] = useState<RSVPAttendance>('attending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validate phone number (must contain at least 8 to 15 digits)
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[^\d]/g, '');
    return cleaned.length >= 8 && cleaned.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!guestName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!whatsappNumber.trim()) {
      setErrorMessage('Please enter your WhatsApp number.');
      return;
    }

    if (!validatePhone(whatsappNumber)) {
      setErrorMessage('Please enter a valid WhatsApp number (8–15 digits).');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitRSVP({
        name: guestName.trim(),
        whatsapp: whatsappNumber.trim(),
        attendance,
      });
      setSubmitted(true);
      setConfirmationMessage(
        attendance === 'attending'
          ? `Thank you, ${guestName.trim()}! We are delighted that you will be joining our wedding celebrations in ${weddingConfig.venue.city}.`
          : `Thank you for letting us know, ${guestName.trim()}. We will miss your gracious presence, but your blessings accompany us.`
      );

      if (attendance === 'attending') {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#C49A50', '#781C32', '#FFF7EA', '#BC7563'],
        });
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 bg-ivory relative overflow-hidden">
      {/* Background Indian pattern */}
      <div className="absolute inset-0 bg-mandap-mesh opacity-50 pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <KalashIcon className="mx-auto mb-2 text-gold" size={44} />
          <span className="text-xs uppercase tracking-[0.3em] text-terracotta-dark font-semibold">
            Kindly Respond
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy font-bold mt-1">
            Wedding RSVP
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-maroon/80 font-serif italic max-w-md mx-auto">
            "Your presence will add boundless joy and warmth to our sacred celebrations."
          </p>
        </div>

        {/* Minimal RSVP Card */}
        <div className="bg-white rounded-sm border border-gold/30 shadow-sm p-6 sm:p-10">
          
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full gold-gradient-bg text-burgundy-dark flex items-center justify-center mb-4 shadow-gold-glow">
                <CheckCircle2 size={36} />
              </div>

              <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
                RSVP Recorded in Registry
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-burgundy font-bold mt-1">
                {attendance === 'attending' ? 'We Await Your Gracious Presence!' : 'Thank You For Your Response'}
              </h3>

              <p className="text-sm sm:text-base text-maroon/85 font-serif italic mt-3 max-w-md leading-relaxed">
                {confirmationMessage}
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-xs font-serif uppercase tracking-wider text-burgundy underline hover:text-gold transition-colors"
              >
                Update your response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* FIELD 1: Your Name (Text input, Required) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-deep mb-2">
                  Your Name <span className="text-burgundy">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-dark" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gold/40 bg-ivory/40 text-sm sm:text-base focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                  />
                </div>
              </div>

              {/* FIELD 2: Your WhatsApp Number (Telephone input, Required, Validated) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-deep mb-2">
                  Your WhatsApp Number <span className="text-burgundy">*</span>
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-dark" />
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gold/40 bg-ivory/40 text-sm sm:text-base focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                  />
                </div>
                <span className="text-[11px] text-maroon/60 mt-1 block">
                  Used for wedding updates and itinerary coordination.
                </span>
              </div>

              {/* FIELD 3: Attendance Confirmation (Exactly two options) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-deep mb-2.5">
                  Attendance Confirmation <span className="text-burgundy">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Fully attending */}
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-3.5 px-4 rounded-xl border-2 flex items-center justify-center space-x-2 text-sm font-serif transition-all ${
                      attendance === 'attending'
                        ? 'border-gold bg-burgundy text-ivory shadow-md font-bold'
                        : 'border-gold/30 bg-ivory/40 text-maroon-deep hover:border-gold'
                    }`}
                  >
                    <Heart
                      size={16}
                      className={attendance === 'attending' ? 'text-gold fill-gold' : 'text-maroon'}
                    />
                    <span>Fully attending</span>
                  </button>

                  {/* Option 2: Regretfully unable to attend */}
                  <button
                    type="button"
                    onClick={() => setAttendance('unable')}
                    className={`py-3.5 px-4 rounded-xl border-2 flex items-center justify-center space-x-2 text-sm font-serif transition-all ${
                      attendance === 'unable'
                        ? 'border-gold bg-burgundy text-ivory shadow-md font-bold'
                        : 'border-gold/30 bg-ivory/40 text-maroon-deep hover:border-gold'
                    }`}
                  >
                    <span>Regretfully unable to attend</span>
                  </button>
                </div>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-300 text-xs flex items-center space-x-2">
                  <AlertCircle size={16} className="flex-shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* FIELD 4: Button text: "CONFIRM MY RSVP" */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl gold-gradient-bg text-burgundy-dark font-serif font-bold text-sm sm:text-base tracking-wider uppercase hover:shadow-gold-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Recording Your RSVP...' : 'CONFIRM MY RSVP'}
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-gold/20 pt-5 text-center">
            <p className="text-xs uppercase tracking-wider text-maroon/70">
              For RSVP assistance, contact {weddingConfig.contact.rsvpName1}
            </p>
            <a
              href={`tel:${weddingConfig.contact.rsvpPhone1.replace(/[^\d+]/g, '')}`}
              className="mt-1 inline-block font-serif text-lg font-semibold text-burgundy hover:text-gold-dark"
            >
              {weddingConfig.contact.rsvpPhone1}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
