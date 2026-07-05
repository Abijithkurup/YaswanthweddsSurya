import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isPlayingRef = useRef(false);
  const currentTrackRef = useRef<TrackType>(null);
  const timeoutRef = useRef<any>(null);

  const pause = useCallback(() => {
    const track = currentTrackRef.current;
    if (track && audioRefs.current[track]) {
      audioRefs.current[track]!.pause();
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      pause();
    }, 60000);
  }, [pause]);

  const playTrack = useCallback((track: TrackType) => {
    if (!track) {
      pause();
      return;
    }

    if (currentTrackRef.current === track && isPlayingRef.current) {
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
      currentTrackRef.current = track;
      setCurrentTrack(track);
      currentAudio.play()
        .then(() => {
          isPlayingRef.current = true;
          setIsPlaying(true);
          startTimeout();
        })
        .catch((err) => {
          console.log(`Playback failed for track ${track}:`, err);
          isPlayingRef.current = false;
          setIsPlaying(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        });
    }
  }, [pause, startTimeout]);

  const togglePlay = useCallback(() => {
    const track = currentTrackRef.current;
    if (!track) return;

    const currentAudio = audioRefs.current[track];
    if (currentAudio) {
      if (isPlayingRef.current) {
        currentAudio.pause();
        isPlayingRef.current = false;
        setIsPlaying(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } else {
        currentAudio.play()
          .then(() => {
            isPlayingRef.current = true;
            setIsPlaying(true);
            startTimeout();
          })
          .catch(() => {
            isPlayingRef.current = false;
            setIsPlaying(false);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          });
      }
    }
  }, [startTimeout]);

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
