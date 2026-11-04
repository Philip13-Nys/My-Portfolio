import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import soundtrack from "./assets/na-para-bang.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoStartRef = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let disposed = false;
    audio.volume = 0.25;

    const removeGestures = () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
    const tryAutoplay = () => {
      if (!autoStartRef.current || disposed) return;
      void audio.play().then(() => {
        if (disposed) return;
        autoStartRef.current = false;
        removeGestures();
      }).catch((error: unknown) => {
        if (disposed) return;
        if (error instanceof DOMException &&
            (error.name === "NotAllowedError" || error.name === "AbortError")) return;
        setUnavailable(true);
      });
    };
    const isPlayerControl = (event: Event) =>
      event.target instanceof Element && Boolean(event.target.closest(".portfolio-music"));
    function onPointerDown(event: PointerEvent) {
      if (!isPlayerControl(event)) tryAutoplay();
    }
    function onKeyDown(event: KeyboardEvent) {
      if ((event.key === "Enter" || event.key === " ") && !isPlayerControl(event)) {
        tryAutoplay();
      }
    }

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    tryAutoplay();

    return () => {
      disposed = true;
      removeGestures();
      audio.pause();
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // A deliberate pause stays paused after later page interactions.
    autoStartRef.current = false;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setUnavailable(false);
    void audio.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setUnavailable(true);
    });
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const changeVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    audio.muted = false;
    setVolume(value);
    setMuted(false);
  };

  return (
    <aside className="portfolio-music" aria-label="Background music player">
      <audio
        ref={audioRef}
        src={soundtrack}
        loop
        preload="auto"
        onPlay={() => { setPlaying(true); setUnavailable(false); }}
        onPause={() => setPlaying(false)}
        onError={() => { setUnavailable(true); setPlaying(false); }}
      />
      <div className="music-track">
        <span className="music-status">
          {unavailable ? "MUSIC UNAVAILABLE" : playing ? "NOW PLAYING" : "PLAY MUSIC"}
        </span>
        <strong>Na Para Bang</strong>
        <small>Mariah Deborah · Wish 107.5</small>
      </div>
      <button
        type="button"
        className="music-play"
        onClick={togglePlayback}
        aria-label={playing ? "Pause background music" : "Play Na Para Bang"}
      >
        {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      </button>
      <div className="music-volume">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          aria-pressed={muted}
        >
          {muted || volume === 0
            ? <VolumeX size={14} aria-hidden="true" />
            : <Volume2 size={14} aria-hidden="true" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => changeVolume(Number(event.target.value))}
          aria-label="Background music volume"
          aria-valuetext={`${Math.round(volume * 100)} percent${muted ? ", muted" : ""}`}
        />
        <span>{muted ? "MUTED" : `${Math.round(volume * 100)}%`}</span>
      </div>
    </aside>
  );
}
