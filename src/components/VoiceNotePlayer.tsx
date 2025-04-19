"use client";

import React, { useRef, useEffect, useState } from "react";

interface VoiceNotePlayerProps {
  audioUrl: string;
}

const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Optional: track playing state

  // Effect to load new audio source when URL changes
  useEffect(() => {
    setError(null);
    setIsPlaying(false); // Reset playing state
    const audioElement = audioRef.current;

    if (audioUrl && audioElement) {
      audioElement.src = audioUrl;
      audioElement.load(); // Load the new source
      // We will play in the onCanPlayThrough handler
    } else if (audioElement) {
      // If URL is cleared, reset the audio element
      audioElement.pause();
      audioElement.removeAttribute("src");
      audioElement.load(); // Important to reset internal state
    }

    // Cleanup: Pause audio if component unmounts or URL changes before playback finishes
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioUrl]);

  // Handler for when the audio is ready to play through
  const handleCanPlayThrough = () => {
    const audioElement = audioRef.current;
    if (audioElement && audioUrl) {
      // Check if we are not already trying to play
      if (!isPlaying) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          setIsPlaying(true);
          playPromise
            .then(() => {
              console.log("Audio playback started.");
              // setIsPlaying(false); // Reset if needed after playback ends (using 'onended' event)
            })
            .catch((err) => {
              console.error("Audio playback failed:", err);
              setError(
                "لم يتمكن المتصفح من تشغيل الصوت تلقائيًا. قد تحتاج إلى التفاعل مع الصفحة أولاً."
              );
              setIsPlaying(false);
            });
        }
      }
    }
  };

  // Handler for audio errors
  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error("Audio playback error:", e);
    const mediaError = (e.target as HTMLAudioElement).error;
    setError(`حدث خطأ أثناء تشغيل الصوت. ${mediaError?.message || ""}`);
    setIsPlaying(false);
  };

  // Handler for when playback ends
  const handleEnded = () => {
    setIsPlaying(false);
    console.log("Audio playback finished.");
  };

  // Don't render the component if there's no URL
  if (!audioUrl) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 text-center">
      {/* Hidden audio element for playback */}
      <audio
        ref={audioRef}
        className="hidden"
        preload="auto"
        onCanPlayThrough={handleCanPlayThrough}
        onError={handleError}
        onEnded={handleEnded} // Handle end of playback
      >
        عذرًا، متصفحك لا يدعم تشغيل الصوت.
      </audio>

      {/* Display status */}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {/* Optional: Display playing indicator */}
      {/* {isPlaying && <p className="text-sm text-blue-600 mt-2">جاري تشغيل الملاحظة...</p>} */}
    </div>
  );
};

export default VoiceNotePlayer;
