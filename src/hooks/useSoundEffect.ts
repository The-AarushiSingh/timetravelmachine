import { useRef, useCallback } from "react";

export const useSoundEffect = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay blocked - user hasn't interacted yet
      });
    } else {
      audioRef.current = new Audio(src);
      audioRef.current.play().catch(() => {});
    }
  }, [src]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};
