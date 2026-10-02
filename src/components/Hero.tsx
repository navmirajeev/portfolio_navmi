"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import VantaBackground from "./VantaBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".hero-label", {
          y: 30,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-line",
          {
            y: 100,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        );

      // Hero content leaves the screen as one composition
      gsap.to(".hero-content", {
        y: -180,
        scale: 0.92,
        opacity: 0,

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "70% top",
          scrub: 1,
        },
      });

      // Vanta drifts away separately
      gsap.to(".vanta-layer", {
        y: -120,
        scale: 1.12,
        opacity: 0,

        scrollTrigger: {
          trigger: heroRef.current,
          start: "20% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Slight movement on the hero itself
      gsap.to(heroRef.current, {
        scale: 0.97,

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      className="
        relative
        flex
        min-h-screen
        flex-col
        justify-between
        overflow-hidden
        bg-[var(--navy)]
        px-6
        pb-8
        pt-28
        text-[var(--off-white)]
        md:px-10
        md:pb-10
        md:pt-32
      "
    >
      {/* Vanta */}

      <div className="vanta-layer absolute inset-0">
        <VantaBackground />
      </div>

      {/* Dark gradient to keep the text readable */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-gradient-to-r
          from-[var(--navy)]
          via-[var(--navy)]/95
          to-transparent
        "
      />

      {/* Content */}

      <div className="hero-content relative z-10 flex flex-1 flex-col justify-center">
        <p
          className="
            hero-label
            mb-6
            text-xs
            font-medium
            uppercase
            tracking-[0.25em]
            text-[var(--light-blue)]
            md:text-sm
          "
        >
          AI / ML Engineer · Researcher · Builder
        </p>

        <h1
          className="
            hero-title
            max-w-6xl
            text-[clamp(4rem,11vw,10rem)]
            font-medium
            leading-[0.82]
            tracking-[-0.075em]
            text-[var(--off-white)]
          "
        >
          <span className="hero-line block">
            Building
          </span>

          <span className="hero-line block">
            intelligent
          </span>

          <span className="hero-line block text-[var(--red)]">
            systems.
          </span>
        </h1>

        <p
          className="
            hero-description
            mt-10
            max-w-md
            text-sm
            leading-relaxed
            text-[var(--light-blue)]
            md:text-base
          "
        >
          Exploring artificial intelligence through research, engineering and
          things worth building.
        </p>
      </div>

      {/* Bottom */}

      <div className="hero-scroll relative z-10 flex justify-end">
        <a
          href="#work"
          className="
            text-sm
            uppercase
            tracking-[0.15em]
            text-[var(--off-white)]
            transition-colors
            duration-300
            hover:text-[var(--red)]
          "
        >
          Scroll to explore ↓
        </a>
      </div>
    </section>
  );
}