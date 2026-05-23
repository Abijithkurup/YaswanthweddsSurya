import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MapPin, Calendar, Clock, ArrowLeft, Music, Music2, Sparkles, Flower2, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import couple from "@/assets/couple.jpg";
import { useMusic } from "@/hooks/use-music";

import photo4 from "@/assets/photo4.jpeg";
import photo5 from "@/assets/photo5.jpeg";
import photo2 from "@/assets/photo2.jpeg";
import photo3 from "@/assets/photo3.jpeg";

const images = [couple, photo4, photo5,photo2,photo3];





export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Surya & Yaswanth" },
      { name: "description", content: "Thank you for joyfully accepting our wedding invitation." },
    ],
  }),
  component: ThankYou,
});

const WEDDING = {
  bride: "Surya",
  groom: "Yaswanth",
  dateLabel: "23 August 2026",
  day: "Sunday",
  time: "10:30 to 11:30",
  venue: "Sri Kalyana Mandapam",
  address: "Athaloor, Thavanoor, Malappuram, Kerala",
  mapsUrl: "https://maps.google.com/?q=Sri+Kalyana+Mandapam+Hyderabad",
};

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M10 110 C 30 90, 50 80, 70 60 S 100 30, 110 10" />
        <circle cx="30" cy="90" r="6" />
        <circle cx="55" cy="70" r="5" />
        <circle cx="80" cy="45" r="4" />
      </g>
    </svg>
  );
}

function ThankYou() {
  const { isPlaying: music, togglePlay: toggleMusic, playTrack } = useMusic();

  const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    playTrack("wedding");
  }, [playTrack]);

  useEffect(() => {
    const rose = ["#c0392b", "#e74c3c", "#ff6b6b", "#d4af37", "#f8c8d8"];
    const fire = (particleRatio: number, opts: confetti.Options) =>
      confetti({ origin: { y: 0.7 }, colors: rose, ...opts, particleCount: Math.floor(220 * particleRatio) });

    fire(0.25, { spread: 26, startVelocity: 55, scalar: 1.2, shapes: ["circle"] });
    fire(0.2, { spread: 60, scalar: 1 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const interval = setInterval(() => {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors: rose, scalar: 1.1 });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors: rose, scalar: 1.1 });
    }, 600);
    const stop = setTimeout(() => clearInterval(interval), 5500);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  const shareWA = () => {
    const text = `I'll be celebrating ${WEDDING.bride} & ${WEDDING.groom}'s wedding on ${WEDDING.dateLabel}!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <Flower2 className="pointer-events-none fixed left-6 top-32 text-gold opacity-40 animate-float" size={36} />
      <Sparkles className="pointer-events-none fixed right-8 top-1/3 text-gold opacity-50 animate-shimmer" size={28} />
      <Flower2 className="pointer-events-none fixed right-6 bottom-40 text-sage opacity-40 animate-float" size={32} style={{ animationDelay: "2s" }} />
      <Sparkles className="pointer-events-none fixed left-10 bottom-24 text-gold opacity-40 animate-float" size={20} style={{ animationDelay: "3s" }} />

      <button
        onClick={toggleMusic}
        className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full bg-card/90 backdrop-blur border border-gold/30 shadow-soft hover:scale-105 transition"
        aria-label="Toggle music"
      >
        {music ? <Music className="text-gold" size={18} /> : <Music2 className="text-muted-foreground" size={18} />}
      </button>

      <main className="relative min-h-screen px-4 sm:px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/details"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold hover:underline mb-8"
          >
            <ArrowLeft size={14} /> Back
          </Link>

          {/* PORTRAIT — appears immediately with zoom-in */}
        <div className="mx-auto max-w-xl animate-scale-in">
            <div className="relative overflow-hidden rounded-3xl border border-gold/40 shadow-soft aspect-[4/5]">
            <img
              key={currentImage}
              src={images[currentImage]}
              alt={`${WEDDING.bride} and ${WEDDING.groom}`}
              className="
                h-full 
                w-full 
                object-cover 
                transition-all 
                duration-[2000ms] 
                ease-in-out 
                animate-smoothFade
              "
            />
              
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-3xl pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold mb-1">
                  Forever Begins
                </p>

                <p className="font-script text-4xl sm:text-5xl text-white drop-shadow">
                  {WEDDING.bride} &amp; {WEDDING.groom}
                </p>
              </div>

            </div>
          </div>

          {/* HERO — compact ribbon below photo */}
          <div className="relative mx-auto max-w-2xl text-center mt-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-card/80 backdrop-blur px-5 py-2 shadow-soft">
              <Sparkles className="text-gold animate-shimmer" size={16} />
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold">With Gratitude</span>
              <Sparkles className="text-gold animate-shimmer" size={16} />
            </div>
            <h1 className="mt-5 font-script text-6xl sm:text-7xl leading-none text-gradient-sage">
              Thank You
            </h1>
            <div className="flex items-center justify-center gap-3 text-gold mt-3">
              <span className="h-px w-10 bg-gold" />
              <Heart className="fill-current animate-shimmer" size={16} />
              <span className="h-px w-10 bg-gold" />
            </div>
            <p className="mt-4 font-serif-display italic text-base sm:text-lg text-primary/90 max-w-lg mx-auto">
              "Your presence is the greatest blessing we could ask for. Together, let us begin a journey of forever — woven with love, laughter and grace."
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold">— With love, the couple</p>
          </div>

          {/* DETAILS */}
          <div className="mt-12">
            <p className="gold-divider mx-auto w-fit mb-6 block text-center">Save the Date</p>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { icon: Calendar, label: "Date", value: WEDDING.dateLabel, sub: WEDDING.day },
                { icon: Clock, label: "Time", value: WEDDING.time, sub: "Muhurtham" },
                { icon: MapPin, label: "Venue", value: WEDDING.venue, sub: WEDDING.address },
              ].map((it, i) => (
                <div
                  key={i}
                  className="ornate-card p-7 text-center animate-fade-up"
                  style={{ animationDelay: `${0.5 + i * 0.15}s` }}
                >
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gold/10 border border-gold/40">
                    <it.icon className="text-gold" size={22} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{it.label}</p>
                  <p className="mt-2 font-serif-display text-xl text-primary">{it.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground italic">{it.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "1s" }}>
            <a href={WEDDING.mapsUrl} target="_blank" rel="noreferrer" className="btn-gold">
              <MapPin size={16} /> Open Directions
            </a>
            <button
              onClick={shareWA}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card px-8 py-4 text-sm font-medium text-primary hover:bg-secondary transition uppercase tracking-[0.2em]"
            >
              <Share2 size={16} /> Share the Joy
            </button>
          </div>

          {/* FOOTER */}
          <div className="mt-16 text-center">
            <Heart className="mx-auto text-gold mb-3 animate-shimmer" size={22} />
            <p className="font-script text-5xl text-gradient-sage">
              {WEDDING.bride} &amp; {WEDDING.groom}
            </p>
            <p className="mt-4 font-serif-display italic text-muted-foreground max-w-xl mx-auto">
              We look forward to celebrating our special day with you.
            </p>
            <p className="gold-divider mt-6">{WEDDING.dateLabel}</p>
          </div>
        </div>
      </main>
    </>
  );
}
