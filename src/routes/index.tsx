import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Flower2, Heart, Sparkles, ArrowRight, Music, Music2, Share2 } from "lucide-react";
import { useMusic } from "@/hooks/use-music";

export const Route = createFileRoute("/")({
  component: Poster,
});

const WEDDING = {
  bride: "Surya",
  groom: "Yaswanth",
  dateLabel: "23 August 2026",
  day: "Sunday",
  venue: "Sri Kalyana Mandapam, Hyderabad",
};

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => onDoneRef.current(), 400);
      }
    }, 30);
    return () => clearInterval(id);
  }, []);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-background">
     <div className="flex flex-col items-center justify-center text-center px-6">
        <Flower2 className="text-gold mb-6" size={48} />
        <p className="gold-divider mb-4">Shubh Vivah</p>
        <h2 className="font-script text-5xl sm:text-6xl text-primary mb-10">
          {WEDDING.bride} &amp; {WEDDING.groom}
        </h2>
        
        {/* Beautiful Ornate Circular Progress Loader */}
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
          {/* Decorative Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-gold/30 animate-[spin_20s_linear_infinite]" />
          
          {/* Decorative Inner Ring with soft gold glow */}
          <div className="absolute inset-2 rounded-full border border-gold/15 shadow-[0_0_15px_oklch(0.74_0.13_80_/_0.1)]" />

          {/* SVG Progress Arc with explicit viewBox to guarantee centering in all mobile viewports */}
          <svg className="h-full transform -rotate-90" viewBox="0 0 144 144">
            {/* Background track circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="text-secondary/40"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Active progress circle with gradient color */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="text-gold transition-[stroke-dashoffset] duration-150 ease-out"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0px 2px 4px oklch(0.74 0.13 80 / 0.3))"
              }}
            />
          </svg>

          {/* Center text showing percentage with inset-0 to guarantee true dead center alignment */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Heart className="text-gold/40 fill-gold/10 animate-pulse mb-0.5" size={16} />
            <span className="font-serif-display text-xl font-medium text-primary tabular-nums">
              {Math.floor(progress)}%
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
              Loading
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M10 110 C 30 90, 50 80, 70 60 S 100 30, 110 10" />
        <circle cx="30" cy="90" r="6" />
        <circle cx="55" cy="70" r="5" />
        <circle cx="80" cy="45" r="4" />
        <path d="M28 88 q -8 -6 -14 -2" />
        <path d="M53 68 q -6 -8 -12 -6" />
      </g>
    </svg>
  );
}

function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="100" cy="100" r="90" />
        <circle cx="100" cy="100" r="70" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="50" />
        <circle cx="100" cy="100" r="30" strokeDasharray="1 3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 100 + Math.cos(a) * 50;
          const y1 = 100 + Math.sin(a) * 50;
          const x2 = 100 + Math.cos(a) * 90;
          const y2 = 100 + Math.sin(a) * 90;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const cx = 100 + Math.cos(a) * 70;
          const cy = 100 + Math.sin(a) * 70;
          return <circle key={i} cx={cx} cy={cy} r="3" />;
        })}
      </g>
    </svg>
  );
}
function Poster() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { playTrack } = useMusic();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSeeMore = () => {
    playTrack("wedding12");
    navigate({ to: "/details" });
  };
  
  const shareWA = () => {
    const text = `You're invited to ${WEDDING.bride} & ${WEDDING.groom}'s wedding on ${WEDDING.dateLabel}. ${typeof window !== "undefined" ? window.location.href : ""}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <Flower2 className="pointer-events-none fixed left-4 top-24 text-sage opacity-30 animate-float" size={48} />
      <Sparkles className="pointer-events-none fixed right-6 top-1/3 text-gold opacity-40 animate-float" size={28} style={{ animationDelay: "2s" }} />
      <Flower2 className="pointer-events-none fixed left-8 bottom-32 text-gold opacity-25 animate-float" size={40} style={{ animationDelay: "4s" }} />
      <Sparkles className="pointer-events-none fixed right-10 bottom-20 text-sage opacity-30 animate-float" size={24} style={{ animationDelay: "1s" }} />

      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        <button
          onClick={shareWA}
          className="grid h-11 w-11 place-items-center rounded-full bg-card/90 backdrop-blur border border-gold/30 shadow-soft hover:scale-105 transition"
          aria-label="Share on WhatsApp"
        >
          <Share2 className="text-primary" size={18} />
        </button>
      </div>

      <main className="relative px-4 sm:px-6 py-10 sm:py-16 grid place-items-center">
        <Mandala className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[720px] max-w-none text-gold/15 animate-sparkle" />

        <div className="relative max-w-2xl poster-frame px-6 sm:px-12 py-14 sm:py-20 text-center animate-fade-up">
          <FloralCorner className="absolute -top-4 -left-4 h-24 w-24 text-gold/70" />
          <FloralCorner className="absolute -top-4 -right-4 h-24 w-24 text-gold/70 -scale-x-100" />
          <FloralCorner className="absolute -bottom-4 -left-4 h-24 w-24 text-gold/70 -scale-y-100" />
          <FloralCorner className="absolute -bottom-4 -right-4 h-24 w-24 text-gold/70 rotate-180" />

          <Sparkles className="mx-auto text-gold mb-3 animate-shimmer" size={22} />
          <p className="gold-divider mb-2">॥ Shubh Vivah ॥</p>
          <p className="mt-6 font-serif-display italic text-sm sm:text-base text-muted-foreground leading-relaxed">
            With the blessings of the Almighty
            <br />
            and our beloved families
          </p>

          <div className="my-8 sm:my-10 flex flex-col items-center gap-2 sm:gap-3">
            <h1 className="font-script text-7xl sm:text-9xl leading-none text-gradient-sage">
              {WEDDING.bride}
            </h1>
            <div className="flex items-center gap-4 text-gold">
              <span className="h-px w-14 bg-gold" />
              <Heart className="fill-current animate-shimmer" size={22} />
              <span className="h-px w-14 bg-gold" />
            </div>
            <p className="font-serif-display italic text-xs uppercase tracking-[0.4em] text-muted-foreground">
              weds
            </p>
            <div className="flex items-center gap-4 text-gold">
              <span className="h-px w-14 bg-gold" />
              <Heart className="fill-current animate-shimmer" size={22} />
              <span className="h-px w-14 bg-gold" />
            </div>
            <h1 className="font-script text-7xl sm:text-9xl leading-none text-gradient-sage">
              {WEDDING.groom}
            </h1>
          </div>

          <div className="space-y-2">
            <p className="gold-divider">{WEDDING.day}</p>
            <p className="font-serif-display text-2xl sm:text-3xl text-primary">{WEDDING.dateLabel}</p>
            <p className="text-xs sm:text-sm text-muted-foreground italic">{WEDDING.venue}</p>
          </div>

          <div className="mt-10">
            <button onClick={handleSeeMore} className="btn-gold">
              See More <ArrowRight size={16} />
            </button>
            <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              View Invitation Details
            </p>
          </div>
        </div>

        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-gold/70">
          ✦ Save the Date ✦
        </p>
        
      </main>
    </>
  );
}
