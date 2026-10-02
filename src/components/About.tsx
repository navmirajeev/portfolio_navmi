"use client";

import VantaNetBackground from "./VantaNetBackground";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Main statement
      gsap.fromTo(
        ".about-heading",
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // AI accent changes from blue to red
      gsap.fromTo(
        ".about-accent",
        {
          color: "#457b9d",
        },
        {
          color: "#e63946",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      // First paragraph
      gsap.fromTo(
        ".about-paragraph-1",
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-paragraphs",
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          },
        }
      );

      // Second paragraph
      gsap.fromTo(
        ".about-paragraph-2",
        {
          x: 80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-paragraphs",
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Small label
      gsap.fromTo(
        ".about-label",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 65%",
            scrub: 1,
          },
        }
      );
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--light-blue)]
        px-6
        py-24
        md:px-10
        md:py-36
      "
    >
      {/* Vanta NET background */}

      <div className="absolute inset-0 z-0">
        <VantaNetBackground />
      </div>

      {/* Content */}

      <div className="relative z-10">
        {/* Section label */}

        <p className="about-label text-xs uppercase tracking-[0.25em] text-[var(--blue)]">
          01 / About
        </p>

        {/* Main statement */}

        <div className="mt-20">
          <h2
            className="
              about-heading
              max-w-6xl
              text-4xl
              leading-[1.02]
              tracking-[-0.055em]
              md:text-7xl
              lg:text-8xl
            "
          >
            I work at the intersection of{" "}
            <span className="about-accent">AI</span>, research and engineering.
          </h2>
        </div>

        {/* Supporting text */}

        <div
          className="
            about-paragraphs
            mt-24
            grid
            gap-12
            md:grid-cols-2
            md:gap-24
          "
        >
          <p
            className="
              about-paragraph-1
              max-w-xl
              text-base
              leading-8
              text-[var(--blue)]
              md:text-lg
            "
          >
            My work spans machine learning, computer vision and
            vision-language models, with a particular interest in understanding
            how intelligent systems process information and make decisions.
          </p>

          <p
            className="
              about-paragraph-2
              max-w-xl
              text-base
              leading-8
              text-[var(--blue)]
              md:text-lg
            "
          >
            I enjoy taking research ideas and turning them into systems that
            can be tested, understood and improved. My interests sit between
            experimentation, engineering and finding practical ways to use AI.
          </p>
        </div>

        {/* Bottom details */}

        <div
          className="
            mt-32
            grid
            gap-10
            border-t
            border-[var(--navy)]/20
            pt-8
            md:grid-cols-3
          "
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)]">
              Focus
            </p>

            <p className="mt-3 text-lg">
              AI / ML
              <br />
              Computer Vision
              <br />
              VLMs
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)]">
              Approach
            </p>

            <p className="mt-3 text-lg">
              Research
              <br />
              Experimentation
              <br />
              Engineering
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--blue)]">
              Currently
            </p>

            <p className="mt-3 text-lg">
              Building
              <br />
              Learning
              <br />
              Exploring
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}