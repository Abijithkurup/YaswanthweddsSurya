import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Calendar, Clock, MapPin, Heart, Music2, Music, Share2,
  Sparkles, Flower2, CheckCircle2, XCircle, ArrowLeft,
} from "lucide-react";
import { useMusic } from "@/hooks/use-music";

import photo1 from "@/assets/photo1.jpeg";
import photo2 from "@/assets/photo2.jpeg";
import photo3 from "@/assets/photo3.jpeg";
import photo4 from "@/assets/photo4.jpeg";
import photo5 from "@/assets/photo5.jpeg";
import photo6 from "@/assets/photo6.jpeg";


export const Route = createFileRoute("/details")({
  head: () => ({
    meta: [
      { title: "Wedding Details — Surya & Yaswanth" },
      { name: "description", content: "Wedding details, venue, and RSVP for Surya & Yaswanth's wedding." },
    ],
  }),
  component: Details,
});


const galleryImages = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
];



const WEDDING = {
  bride: "Surya",
  groom: "Yaswanth",
  dateISO: "2026-08-25T10:00:00+05:30",
  dateLabel: "23 August 2026",
  day: "Saturday",
  time: "10:30 to 11:30",
  venue: "Sri Kalyana Mandapam",
  address: "Athaloor, Thavanoor, Malappuram, Kerala",
  mapsUrl: "https://maps.google.com/?q=Sri+Kalyana+Mandapam+Hyderabad",
};

const STORY = [
  { year: "2021", title: "First Meeting", text: "We accidentally met at our college bus stop, and it became a beautiful friendship" },
  { year: "2022", title: "He proposed me", text: "he proposed to me, but even though I liked him, I rejected him." },
  { year: "2023", title: "Fall in love", text: "I thought about this a lot… and my answer is yes I happily accept your proposal" },
  { year: "2025", title: "It become Official", text: " we introduced our relationship to our families, and both families accepted it." },
];

const FAMILY = [
  { side: "Bride's Family", parents: "Raghavan & Subhashni", note: "Daughter of" },
  { side: "Groom's Family", parents: "Velayoudhan & Sarojini", note: "Son of" },
];

function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, mounted: now !== null };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("in-view")),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
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
      </g>
    </svg>
  );
}

function Details() {
  const navigate = useNavigate();
  const { d, h, m, s, mounted } = useCountdown(WEDDING.dateISO);
  const [rsvp, setRsvp] = useState<"decline" | null>(null);
  const { isPlaying: music, togglePlay: toggleMusic, playTrack } = useMusic();

  useEffect(() => {
    playTrack("wedding12");
  }, [playTrack]);

  const handleAccept = () => {
    playTrack("wedding");
    navigate({ to: "/thank-you" });
  };

  const shareWA = () => {
    const text = `You're invited to ${WEDDING.bride} & ${WEDDING.groom}'s wedding on ${WEDDING.dateLabel}. ${typeof window !== "undefined" ? window.location.href : ""}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main className="relative overflow-hidden">
      <Flower2 className="pointer-events-none fixed left-4 top-24 text-sage opacity-30 animate-float" size={48} />
      <Sparkles className="pointer-events-none fixed right-6 top-1/3 text-gold opacity-40 animate-float" size={32} style={{ animationDelay: "2s" }} />
      <Flower2 className="pointer-events-none fixed left-8 bottom-32 text-gold opacity-25 animate-float" size={40} style={{ animationDelay: "4s" }} />

      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        <button
          onClick={toggleMusic}
          className="grid h-11 w-11 place-items-center rounded-full bg-card/90 backdrop-blur border border-gold/30 shadow-soft hover:scale-105 transition"
          aria-label="Toggle music"
        >
          {music ? <Music className="text-gold" size={18} /> : <Music2 className="text-muted-foreground" size={18} />}
        </button>
        <button
          onClick={shareWA}
          className="grid h-11 w-11 place-items-center rounded-full bg-card/90 backdrop-blur border border-gold/30 shadow-soft hover:scale-105 transition"
          aria-label="Share on WhatsApp"
        >
          <Share2 className="text-primary" size={18} />
        </button>
      </div>

      <div className="px-6 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold hover:underline">
          <ArrowLeft size={14} /> Back to Poster
        </Link>
      </div>

      {/* HERO RECAP */}
      <section className="relative px-6 pt-10 pb-16 text-center">
        <div className="mx-auto max-w-3xl poster-frame px-8 py-14 animate-fade-up">
          <FloralCorner className="absolute -top-4 -left-4 h-20 w-20 text-gold/60" />
          <FloralCorner className="absolute -bottom-4 -right-4 h-20 w-20 text-gold/60 rotate-180" />

          <p className="gold-divider mb-6">॥ Wedding Invitation ॥</p>
          <p className="font-serif-display italic text-base sm:text-lg text-muted-foreground leading-relaxed">
            With the blessings of our parents and Lord Ganesha,
            <br />
            we joyfully invite you to celebrate the wedding of
          </p>

          <div className="my-8 flex flex-col items-center gap-2">
            <h1 className="font-script text-5xl sm:text-7xl leading-none text-gradient-gold">{WEDDING.bride}</h1>
            <div className="flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold" />
              <Heart className="fill-current animate-shimmer" size={18} />
              <span className="h-px w-10 bg-gold" />
            </div>
            <h1 className="font-script text-5xl sm:text-7xl leading-none text-gradient-gold">{WEDDING.groom}</h1>
          </div>

          <p className="gold-divider mt-6">{WEDDING.dateLabel}</p>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center pb-10 animate-bounce">
  
          <p className="mb-2 text-xs tracking-[0.3em] text-gold uppercase">
            Scroll Down
          </p>

          <div className="flex h-14 w-8 items-start justify-center rounded-full border-2 border-gold p-1">
            <div className="h-3 w-3 rounded-full bg-gold animate-scroll"></div>
          </div>

      </div>

      {/* DETAILS */}
      <section className="px-6 py-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="gold-divider mb-4">Save the Date</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-primary">Wedding Details</h2>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {[
            { icon: Calendar, label: "Date", value: `${WEDDING.dateLabel} • ${WEDDING.day}` },
            { icon: Clock, label: "Muhurtham", value: WEDDING.time },
            { icon: MapPin, label: "Venue", value: WEDDING.venue },
            { icon: MapPin, label: "Address", value: WEDDING.address },
          ].map((it, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="ornate-card p-8 h-full">
                <it.icon className="text-gold mb-3" size={26} />
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{it.label}</p>
                <p className="mt-2 font-serif-display text-xl text-primary">{it.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center" delay={200}>
          <a href={WEDDING.mapsUrl} target="_blank" rel="noreferrer" className="btn-gold">
            <MapPin size={16} /> Open in Google Maps
          </a>
        </Reveal>
      </section>

      {/* COUNTDOWN */}
      <section className="px-6 py-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="gold-divider mb-4">Counting the Moments</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-primary">Until We Say "I Do"</h2>
        </Reveal>
        <Reveal className="mx-auto mt-10 grid max-w-3xl grid-cols-4 gap-3 sm:gap-6">
          {[
            { v: d, l: "Days" },
            { v: h, l: "Hours" },
            { v: m, l: "Minutes" },
            { v: s, l: "Seconds" },
          ].map((c, i) => (
            <div key={i} className="ornate-card py-6 sm:py-8 text-center">
              <div className="font-serif-display text-3xl sm:text-5xl text-gradient-gold tabular-nums">
                {mounted ? String(c.v).padStart(2, "0") : "--"}
              </div>
              <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">{c.l}</div>
            </div>
          ))}
        </Reveal>
      </section>
        {/*Calender */}


      <div className="mt-10 flex justify-center">
        <a
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Day&dates=20260823T100000Z/20260823T180000Z&details=Join+us+for+our+wedding+celebration&location=Wedding+Venue"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold bg-gold/10 px-8 py-3 text-sm uppercase tracking-[0.25em] text-gold transition duration-300 hover:bg-gold hover:text-white"
        >
          Mark Our Date
        </a>
      </div>
      {/* STORY */}
      <section className="px-6 py-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="gold-divider mb-4">Our Journey</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-primary">Our Story</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {STORY.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="ornate-card p-8 h-full text-center">
                <p className="font-script text-4xl text-gradient-gold">{s.year}</p>
                <h3 className="mt-2 font-serif-display text-2xl text-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-6 py-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="gold-divider mb-4">Cherished Memories</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-primary">Photo Gallery</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((image, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                onClick={() => setSelectedImage(selectedImage === i ? null : i)}
                className="relative ornate-card aspect-[3/4] overflow-hidden rounded-3xl border border-white/20 shadow-2xl cursor-pointer transition duration-500"
              >

                <img
                  src={image}
                  alt={`Gallery ${i + 1}`}
                  className={`h-full w-full object-cover transition duration-700 ${
                    selectedImage === i ? "scale-110" : ""
                  }`}
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/40 transition duration-500 ${
                    selectedImage === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3 className="font-serif-display text-1xl text-white/60">
                    Forever Together
                  </h3>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground italic">Photos coming soon ✦</p>
      </section>

      {/* FAMILY */}
      <section className="px-6 py-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="gold-divider mb-4">With Love From</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-primary">Our Families</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {FAMILY.map((f, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="ornate-card p-10 text-center h-full">
                <p className="gold-divider mb-4">{f.side}</p>
                <p className="text-sm italic text-muted-foreground">{f.note}</p>
                <p className="mt-2 font-serif-display text-2xl text-primary">{f.parents}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BLESSINGS */}
      <section className="px-6 py-12">
        <Reveal className="mx-auto max-w-3xl">
          <div className="ornate-card p-10 sm:p-14 text-center">
            <Sparkles className="mx-auto text-gold mb-4 animate-shimmer" size={28} />
            <p className="font-serif-display italic text-2xl sm:text-3xl leading-relaxed text-primary">
              "May this union be blessed with eternal love, unwavering trust, and endless joy.
              May Lord Ganesha remove all obstacles from their path."
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">— Ancient Blessing</p>
          </div>
        </Reveal>
      </section>

      {/* RSVP */}
      <section className="px-6 py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="gold-divider mb-4">Your Presence Matters</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-primary">RSVP</h2>
          <p className="mt-4 text-muted-foreground">Please let us know if you can join us on our special day.</p>

          {rsvp === "decline" ? (
            <div className="ornate-card mt-10 p-10">
              <p className="font-serif-display text-2xl text-primary">
                We'll miss you — thank you for letting us know. 🌿
              </p>
              <button onClick={() => setRsvp(null)} className="mt-4 text-xs uppercase tracking-[0.25em] text-gold hover:underline">
                Change response
              </button>
            </div>
          ) : (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleAccept} className="btn-gold">
                <CheckCircle2 size={16} /> Joyfully Accept
              </button>
              <button
                onClick={() => setRsvp("decline")}
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card px-8 py-4 text-sm font-medium text-primary hover:bg-secondary transition uppercase tracking-[0.2em]"
              >
                <XCircle size={16} /> Regretfully Decline
              </button>
            </div>
          )}
        </Reveal>
      </section>

      <footer className="px-6 py-16 text-center">
        <Reveal>
          <Heart className="mx-auto text-gold mb-4 animate-shimmer" size={24} />
          <p className="font-script text-4xl sm:text-5xl text-gradient-gold">
            {WEDDING.bride} &amp; {WEDDING.groom}
          </p>
          <p className="mt-6 max-w-xl mx-auto font-serif-display italic text-lg text-muted-foreground">
            We look forward to celebrating our special day with you.
          </p>
          <p className="gold-divider mt-8">{WEDDING.dateLabel}</p>
        </Reveal>
      </footer>
    </main>
  );
}
