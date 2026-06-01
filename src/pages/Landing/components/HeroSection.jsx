import { useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Activity, BrainCircuit, ChartColumnBig, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

const statChips = [
  { label: "Active Study Modes", value: "Flashcards • Quizzes • T/F" },
  { label: "Upload & Import", value: "PDFs (Cloudinary optional)" },
];

const floatingCards = [
  {
    title: "Realtime Insights",
    subtitle: "Performance signal updated",
    icon: Activity,
    xClass: "-left-8 top-16 sm:-left-12",
    depth: 10,
    notify: "3",
  },
  {
    title: "Adaptive Engine",
    subtitle: "Memory model calibrated",
    icon: BrainCircuit,
    xClass: "-bottom-2 right-2 sm:-right-8",
    depth: 17,
    notify: "1",
  },
  {
    title: "Compliance Shield",
    subtitle: "Secure sync active",
    icon: ShieldCheck,
    xClass: "right-10 top-0 sm:right-16",
    depth: 13,
    notify: "5",
  },
];

function getParticleSeed(index) {
  return {
    left: `${(index * 13.3) % 100}%`,
    top: `${(index * 29.7) % 100}%`,
    size: 4 + (index % 4),
    depth: 5 + (index % 9),
  };
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => getParticleSeed(i + 1)), []);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const visualEl = visualRef.current;

    if (!sectionEl || !visualEl) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionEl);

      const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTimeline
        .from(q("[data-hero-eyebrow]"), { y: 18, opacity: 0, duration: 0.8 })
        .from(
          q("[data-hero-title]"),
          { x: -72, opacity: 0, duration: 1.15, ease: "expo.out" },
          "<0.08"
        )
        .from(
          q("[data-hero-description] > span"),
          { x: -24, opacity: 0, duration: 0.7, stagger: 0.16 },
          "<0.16"
        )
        .from(
          q("[data-hero-cta]"),
          { y: 24, scale: 0.92, opacity: 0, duration: 0.75, stagger: 0.13 },
          "<0.1"
        )
        .from(
          q("[data-hero-graphic]"),
          { x: 96, opacity: 0, duration: 1.05, ease: "expo.out" },
          "<0.12"
        )
        .from(
          q("[data-float-card]"),
          { y: 26, opacity: 0, rotate: -4, duration: 0.7, stagger: 0.12 },
          "<0.04"
        )
        .from(
          q("[data-hero-chip]"),
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.2"
        );

      q("[data-draw-path]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.45,
        });
      });

      gsap.fromTo(
        q("[data-bar]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "center bottom",
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.6,
        }
      );

      gsap.to(q("[data-pulse-badge]"), {
        scale: 1.16,
        opacity: 0.78,
        duration: 0.9,
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(q("[data-geo-shape]"), {
        y: "random(-14, 14)",
        x: "random(-8, 8)",
        rotation: "random(-14, 14)",
        duration: "random(3.5, 5.2)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.24,
      });

      gsap.to(q("[data-float-card]"), {
        y: "random(-14, 14)",
        x: "random(-10, 10)",
        rotation: "random(-4, 4)",
        duration: "random(3.4, 5.8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(q("[data-ring]"), {
        rotation: "+=360",
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(q("[data-blob]"), {
        y: "random(-28, 22)",
        x: "random(-20, 20)",
        rotation: "random(-20, 20)",
        duration: "random(14, 18)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      gsap.to(q("[data-particle]"), {
        y: "random(-18, 18)",
        x: "random(-14, 14)",
        opacity: "random(0.3, 0.9)",
        duration: "random(2.6, 5.4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.03,
      });

      gsap.from(q("[data-scroll-reveal]"), {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 58%",
        },
      });

      gsap.to(q("[data-hero-graphic]"), {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      const depthElements = q("[data-depth]");
      const onMouseMove = (event) => {
        const bounds = visualEl.getBoundingClientRect();
        const normX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const normY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        depthElements.forEach((element) => {
          const depth = Number(element.getAttribute("data-depth")) || 6;
          gsap.to(element, {
            x: normX * depth,
            y: normY * depth,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      const onMouseLeave = () => {
        depthElements.forEach((element) => {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      visualEl.addEventListener("mousemove", onMouseMove);
      visualEl.addEventListener("mouseleave", onMouseLeave);

      return () => {
        visualEl.removeEventListener("mousemove", onMouseMove);
        visualEl.removeEventListener("mouseleave", onMouseLeave);
      };
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-premium-shell relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:pt-32 lg:px-8"
    >
      <div className="hero-premium-bg" aria-hidden="true">
        <div className="hero-grid-overlay" />
        <div className="hero-blob hero-blob-one" data-blob data-depth="4" />
        <div className="hero-blob hero-blob-two" data-blob data-depth="6" />
        {particles.map((particle) => (
          <span
            key={`particle-${particle.left}-${particle.top}`}
            data-particle
            data-depth={particle.depth}
            className="hero-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <p
            data-hero-eyebrow
            className="inline-flex items-center rounded-full border border-cyan-200/70 bg-cyan-100/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-900 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200"
          >
            AI Learning Platform
          </p>

          <h1
            data-hero-title
            className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.02] text-slate-950 sm:text-5xl md:text-6xl xl:text-[4rem] dark:text-white"
            style={{ fontFamily: "var(--hero-heading-font)" }}
          >
            FlashMind — AI-powered study platform
          </h1>

          <p
            data-hero-description
            className="mt-6 flex max-w-xl flex-col gap-2 text-base leading-8 text-slate-600 sm:text-base dark:text-slate-300"
          >
           <span>
                FlashMind is an AI-powered learning platform that helps students study using flashcards, quizzes, and true-or-false assessments. Create decks manually, upload PDFs, or generate study materials with AI.
                </span>
                <span>
                It also features an AI study assistant for explanations and Q&A, powered by Firebase and Gemini AI.
                </span>
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              data-hero-cta
              to="/signup"
              className="hero-cta-primary inline-flex items-center justify-center rounded-2xl bg-slate-950 px-7 py-4 text-sm font-bold tracking-wide text-white shadow-xl shadow-cyan-500/15 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              Get Started — It's Free
            </Link>
            <a
              data-hero-cta
              href="#features"
              className="hero-cta-secondary inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/70 px-7 py-4 text-sm font-bold tracking-wide text-slate-700 shadow-lg shadow-slate-300/30 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/15 dark:bg-slate-900/65 dark:text-slate-100 dark:hover:border-cyan-300/60 dark:hover:text-cyan-200"
            >
              See Product Tour
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            {statChips.map((chip) => (
              <div
                key={chip.label}
                data-hero-chip
                data-scroll-reveal
                className="hero-chip inline-flex items-center gap-3 px-4 py-2.5 text-xs"
              >
                <span className="font-extrabold text-slate-900 dark:text-white">{chip.value}</span>
                <span className="text-slate-600 dark:text-slate-300">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={visualRef}
          data-hero-graphic
          className="relative mx-auto flex h-[500px] w-full max-w-[560px] items-center justify-center sm:h-[560px]"
        >
          <div data-ring data-depth="10" className="hero-ring h-[74%] w-[74%]" />
          <div data-ring data-depth="12" className="hero-ring h-[90%] w-[90%] opacity-70" />

          <div data-depth="14" className="hero-dashboard-core p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">FlashMind Analytics</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-200">
                <ChartColumnBig size={14} />
                Live
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/60">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Retention Index</p>
                  <p className="text-2xl font-extrabold text-slate-950 dark:text-white">88.4%</p>
                </div>
                <span className="hero-notification-badge" data-pulse-badge>
                  +
                </span>
              </div>

              <svg className="mt-5 h-24 w-full" viewBox="0 0 280 92" fill="none" aria-label="learning graph">
                <path
                  data-draw-path
                  d="M8 70C29 72 51 64 69 56C89 48 105 42 126 48C142 53 154 67 176 61C197 55 212 38 233 32C248 28 261 30 272 36"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="176" cy="61" r="4" fill="#06b6d4" />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/50">
              <div className="flex h-20 items-end gap-3">
                {[34, 52, 70, 44, 82].map((bar) => (
                  <div key={bar} className="relative flex-1">
                    <div
                      data-bar
                      className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-sky-300"
                      style={{ height: `${bar}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {floatingCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                data-float-card
                data-depth={card.depth}
                className={`hero-float-card w-44 p-3 sm:w-48 sm:p-4 ${card.xClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                    <Icon size={16} />
                  </span>
                  <span className="hero-notification-badge" data-pulse-badge>
                    {card.notify}
                  </span>
                </div>
                <h3 className="mt-2 text-xs font-bold text-slate-900 sm:text-sm dark:text-white">{card.title}</h3>
                <p className="mt-1 text-[11px] leading-4 text-slate-600 dark:text-slate-300">{card.subtitle}</p>
              </article>
            );
          })}

          <svg
            data-depth="8"
            className="pointer-events-none absolute -right-2 top-1/2 h-40 w-40 -translate-y-1/2 opacity-70"
            viewBox="0 0 220 220"
            fill="none"
            aria-hidden="true"
          >
            <path
              data-draw-path
              d="M18 146C45 115 67 175 93 132C120 90 151 120 168 82C185 44 205 59 205 59"
              stroke="url(#shapeGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              data-draw-path
              d="M20 189C48 170 70 188 92 167C114 145 132 180 154 161C175 143 189 146 209 130"
              stroke="url(#shapeGradientTwo)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.82"
            />
            <defs>
              <linearGradient id="shapeGradient" x1="18" y1="146" x2="205" y2="59" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="shapeGradientTwo" x1="20" y1="189" x2="209" y2="130" gradientUnits="userSpaceOnUse">
                <stop stopColor="#67e8f9" />
                <stop offset="1" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>

          <div data-geo-shape data-depth="9" className="hero-geo-shape hero-geo-square left-4 top-12" />
          <div data-geo-shape data-depth="11" className="hero-geo-shape hero-geo-diamond right-14 bottom-10" />
          <div data-geo-shape data-depth="7" className="hero-geo-shape hero-geo-circle left-20 bottom-10" />
        </div>
      </div>
    </section>
  );
}
