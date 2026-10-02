"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function initializeVanta() {
      if (!containerRef.current) return;

      const module = await import("vanta/dist/vanta.birds.min");

      if (cancelled || !containerRef.current) return;

      const BIRDS = module.default ?? module;

      if (typeof BIRDS !== "function") {
        console.error("Vanta BIRDS module:", module);
        throw new Error(
          "Vanta BIRDS effect could not be loaded."
        );
      }

      effectRef.current = BIRDS({
        el: containerRef.current,
        THREE,

        // Dark hero
        backgroundColor: 0x1d3557,

        // Light birds
        color1: 0xf1faee,
        color2: 0xa8dadc,

        birdSize: 1.4,
        wingSpan: 20,
        speedLimit: 2.4,
        separation: 50,
        alignment: 35,
        cohesion: 25,
        quantity: 3,

        mouseControls: true,
        touchControls: true,
        gyroControls: false,

        minHeight: 200,
        minWidth: 200,
      });
    }

    initializeVanta();

    return () => {
      cancelled = true;

      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-none
        absolute
        right-0
        top-0
        h-full
        w-full
        overflow-hidden
        opacity-100
        md:w-[65%]
      "
      aria-hidden="true"
    />
  );
}