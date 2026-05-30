'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type VideoReview = {
  name: string;
  role: string;
  /** MP4/WebM URL — use CDN env vars in production */
  src: string;
  /** WebP/JPG poster — shown until play; keeps LCP fast */
  poster?: string;
};

type Props = VideoReview & { className?: string };

export function VideoReviewCard({ name, role, src, poster, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: '120px', threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    if (video.readyState < 2) video.load();
    void video.play().catch(() => setPlaying(false));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-900/15 transition-all duration-300 card-gradient-border ${className}`}
    >
      <div className="relative aspect-[9/16] max-h-[min(62dvh,480px)] sm:max-h-[min(72vh,560px)] mx-auto bg-gray-950">
        {/* Video loads only after user taps play — no multi‑MB download on page load */}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            playing ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
          playsInline
          controls={playing}
          preload="none"
          onLoadedData={() => setLoaded(true)}
          onPause={() => {
            if (videoRef.current?.ended) setPlaying(false);
          }}
          onEnded={() => setPlaying(false)}
        >
          {inView && <source src={src} type="video/mp4" />}
        </video>

        {/* Poster / facade */}
        <div
          className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
            playing ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {poster && inView ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-emerald-950/40" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />

          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play video review from ${name}`}
            className="touch-target absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
          >
            <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-500/90 text-gray-950 shadow-xl shadow-emerald-500/40 transition-transform active:scale-95 sm:group-hover:scale-110 sm:group-hover:bg-emerald-400">
              <svg className="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-gray-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-sm">
              Watch review
            </span>
          </button>

          {playing && !loaded && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-950/80">
              <svg className="h-8 w-8 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}

          <div className="relative z-10 mt-auto p-5 text-left">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-bold text-white">{name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
