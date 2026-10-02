"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);

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

      gsap.to(container.current, {
        opacity: 0,
        y: -100,
        scale: 0.96,

        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden="true"
    />
  );
}