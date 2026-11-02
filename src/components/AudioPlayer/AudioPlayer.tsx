import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Pause } from 'lucide-react';
import { weddingConfig } from '../../data/weddingConfig';

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  showControls: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioRef, showControls }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => console.warn('Wedding background audio failed to load.');
    audio.volume = volume;
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [audioRef, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current.play().catch((error: unknown) => {
        console.warn('Wedding music could not start:', error);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <>
    <audio
      ref={audioRef}
      src={weddingConfig.music?.audioUrl}
      loop
      preload="auto"
    />
    {showControls && (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center group select-none"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {/* Expanded Track Information & Volume Pill */}
      <div
        className={`hidden sm:flex items-center space-x-3 bg-burgundy-deep/90 backdrop-blur-md text-ivory px-4 py-2 rounded-full border border-gold/40 shadow-xl mr-2 transition-all duration-300 ${
          showVolumeSlider ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col text-xs text-left max-w-[140px]">
          <span className="font-serif font-semibold text-gold truncate">
            {weddingConfig.music?.title || 'Wedding Music'}
          </span>
          <span className="text-[10px] text-ivory/70 truncate">
            {weddingConfig.music?.artist || 'Instrumental Symphony'}
          </span>
        </div>

        <button
          onClick={toggleMute}
          className="text-gold hover:text-ivory transition-colors p-1"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-burgundy-dark rounded-lg appearance-none cursor-pointer accent-gold"
          aria-label="Volume slider"
        />
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={togglePlay}
        className={`relative flex items-center justify-center w-13 h-13 rounded-full border-2 border-gold p-3.5 shadow-gold-glow transition-transform duration-300 hover:scale-105 active:scale-95 ${
          isPlaying
            ? 'bg-burgundy text-ivory'
            : 'bg-burgundy-deep text-gold hover:text-ivory'
        }`}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        title={isPlaying ? 'Pause Shehnai & Flute music' : 'Play Shehnai & Flute music'}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Visualizer soundwave bars */}
            <div className="flex items-center space-x-0.5 h-4 mr-1">
              <span className="w-0.5 bg-gold rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-gold rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-4" />
              <span className="w-0.5 bg-gold rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2.5" />
            </div>
            <Pause size={16} className="text-gold fill-gold" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Music size={18} className="text-gold animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold" />
            </span>
          </div>
        )}
      </button>
    </div>
    )}
    </>
  );
};
