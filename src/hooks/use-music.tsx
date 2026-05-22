import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import weddingMusic from "@/assets/wedding.mp3";
import wedding12Music from "@/assets/wedding12.mp3";

type TrackType = "wedding" | "wedding12" | null;

interface MusicContextType {
  isPlaying: boolean;
  currentTrack: TrackType;
  togglePlay: () => void;
  playTrack: (track: TrackType) => void;
  pause: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackType>(null);
  
  const audioRefs = useRef<{
    wedding: HTMLAudioElement | null;
    wedding12: HTMLAudioElement | null;
  }>({
    wedding: null,
    wedding12: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audioWedding = new Audio(weddingMusic);
      audioWedding.loop = true;
      audioWedding.volume = 0.65;

      const audioWedding12 = new Audio(wedding12Music);
      audioWedding12.loop = true;
      audioWedding12.volume = 0.65;

      audioRefs.current = {
        wedding: audioWedding,
        wedding12: audioWedding12,
      };
    }

    return () => {
      if (audioRefs.current.wedding) {
        audioRefs.current.wedding.pause();
      }
      if (audioRefs.current.wedding12) {
        audioRefs.current.wedding12.pause();
      }
    };
  }, []);

  const playTrack = (track: TrackType) => {
    if (!track) {
      pause();
      return;
    }

    if (currentTrack === track && isPlaying) {
      return;
    }

    // Stop the other track if it was playing
    const otherTrack = track === "wedding" ? "wedding12" : "wedding";
    if (audioRefs.current[otherTrack]) {
      audioRefs.current[otherTrack]!.pause();
      audioRefs.current[otherTrack]!.currentTime = 0;
    }

    const currentAudio = audioRefs.current[track];
    if (currentAudio) {
      setCurrentTrack(track);
      currentAudio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log(`Playback failed for track ${track}:`, err);
          setIsPlaying(false);
        });
    }
  };

  const pause = () => {
    if (currentTrack && audioRefs.current[currentTrack]) {
      audioRefs.current[currentTrack]!.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    
    const currentAudio = audioRefs.current[currentTrack];
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, currentTrack, togglePlay, playTrack, pause }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
