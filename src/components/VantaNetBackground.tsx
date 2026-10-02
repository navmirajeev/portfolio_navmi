"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaNetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function initializeVanta() {
      if (!containerRef.current) return;

      const module = await import("vanta/dist/vanta.net.min");

      if (cancelled || !containerRef.current) return;

      const NET = module.default ?? module;

      if (typeof NET !== "function") {
        console.error("Vanta NET module:", module);
        throw new Error("Vanta NET effect could not be loaded.");
      }

      effectRef.current = NET({
        el: containerRef.current,
        THREE,

        // Your existing palette
        backgroundColor: 0xf1faee,
        color: 0x457b9d,

        // Network appearance
        points: 10,
        maxDistance: 22,
        spacing: 18,
        showDots: true,

        // Interaction
        mouseControls: true,
        touchControls: true,
        gyroControls: false,

        minHeight: 200,
        minWidth: 200,

        scale: 1,
        scaleMobile: 1,
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
        inset-0
        h-full
        w-full
        overflow-hidden
        opacity-35
      "
      aria-hidden="true"
    />
  );
}