import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getBlessings, addBlessing, isSupabaseConfigured } from '../../lib/supabase';
import type { BlessingItem } from '../../lib/supabase';
import { GoldDivider } from '../Common/DecorativeElements';
import { weddingConfig } from '../../data/weddingConfig';

export const Blessings: React.FC = () => {
  const [blessings, setBlessings] = useState<BlessingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [honeyPot, setHoneyPot] = useState(''); // Spam honeypot trap

  const MAX_CHARS = 350;

  // Load blessings
  useEffect(() => {
    let mounted = true;
    getBlessings()
      .then((data) => {
        if (mounted) {
          setBlessings(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Spam honeypot check
    if (honeyPot.trim().length > 0) {
      return;
    }

    if (!name.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your name.' });
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setFeedback({ type: 'error', message: 'Please write a blessing (at least 5 characters).' });
      return;
    }

    setSubmitting(true);

    try {
      const created = await addBlessing({
        name,
        relation: relation || 'Well-wisher',
        city: city || '',
        message,
      });

      setBlessings((prev) => [created, ...prev]);
      setName('');
      setRelation('');
      setCity('');
      setMessage('');

      setFeedback({
        type: 'success',
        message: 'Thank you! Your heartfelt blessings have been shared with the couple.',
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#C49A50', '#781C32', '#BC7563'],
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Could not submit your blessing. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="blessings" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-ivory via-ivory-warm to-ivory relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-terracotta-dark font-semibold">
            Shubhkamnayein
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy font-bold mt-1">
            Guest Blessings &amp; Wishes
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-maroon/80 font-serif italic">
            "Your warm prayers and loving wishes are the most precious gift the couple can receive."
          </p>

          {!isSupabaseConfigured && (
            <div className="inline-flex items-center space-x-1.5 text-[11px] text-terracotta bg-ivory-dark px-3 py-1 rounded-full border border-gold/30 mt-3">
              <Sparkles size={12} className="text-gold" />
              <span>Running in interactive demo mode (instant local sync)</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-white rounded-sm p-6 sm:p-8 border border-gold/30 shadow-sm"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-burgundy fill-burgundy" size={18} />
              <h3 className="font-serif text-xl font-bold text-burgundy">
                Send Your Blessings
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam honeypot hidden field */}
              <input
                type="text"
                name="website_url_check"
                value={honeyPot}
                onChange={(e) => setHoneyPot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-deep mb-1">
                  Your Full Name <span className="text-burgundy">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh & Sunita Gupta"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold/40 bg-ivory/40 text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                  maxLength={60}
                />
              </div>

              {/* Relation & City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-deep mb-1">
                    Relation
                  </label>
                  <input
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="e.g. Chacha ji / Friend"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-ivory/40 text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                    maxLength={35}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-deep mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-ivory/40 text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all"
                    maxLength={35}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-deep">
                    Blessing Message <span className="text-burgundy">*</span>
                  </label>
                  <span className="text-[10px] text-maroon/60 font-sans">
                    {message.length}/{MAX_CHARS}
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
                  placeholder={`Share your loving wishes, prayers, or memories for ${weddingConfig.couple.groom.firstName} and ${weddingConfig.couple.bride.firstName}...`}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold/40 bg-ivory/40 text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all resize-none"
                />
              </div>

              {/* Quick Emojis */}
              <div className="flex items-center space-x-2 text-sm pt-1">
                <span className="text-xs text-maroon/70">Add:</span>
                {['🌸', '🪔', '✨', '💐', '🙏'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setMessage((prev) => (prev + ' ' + emoji).slice(0, MAX_CHARS))}
                    className="hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-50 text-rose-800 border border-rose-300'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle size={16} className="flex-shrink-0 text-rose-600" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl gold-gradient-bg text-burgundy-dark font-serif font-bold text-sm hover:shadow-gold-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <span>Sending Blessings...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Blessings</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Blessings Display Wall (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gold/30">
              <div className="flex items-center space-x-2">
                <MessageCircle size={18} className="text-burgundy" />
                <h3 className="font-serif text-lg font-bold text-burgundy">
                  Recent Blessings ({blessings.length})
                </h3>
              </div>
              <span className="text-xs text-maroon/70 font-sans">
                Shared with love
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-maroon/60 text-sm font-serif">
                Loading blessings...
              </div>
            ) : blessings.length === 0 ? (
              <div className="py-12 text-center text-maroon/70 text-sm font-serif bg-white/60 rounded-2xl border border-gold/30 p-6">
                Be the first to leave your warm blessings for {weddingConfig.couple.groom.firstName} and {weddingConfig.couple.bride.firstName}!
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
                {blessings.map((blessing) => (
                  <motion.div
                    key={blessing.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-gold/30 shadow-sm hover:border-gold transition-colors text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        {/* Avatar initials with gold badge */}
                        <div className="w-10 h-10 rounded-full gold-gradient-bg text-burgundy-dark font-serif font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                          {blessing.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-bold text-burgundy">
                            {blessing.name}
                          </h4>
                          <span className="text-[11px] text-terracotta-dark font-sans block">
                            {blessing.relation}
                            {blessing.city ? ` • ${blessing.city}` : ''}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] text-maroon/50 font-sans">
                        {formatTime(blessing.created_at)}
                      </span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-maroon-deep/90 font-serif italic leading-relaxed pl-13">
                      "{blessing.message}"
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
