"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    // Make Lenis accessible to other components
    (
      window as typeof window & {
        __lenis?: Lenis;
      }
    ).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();

      delete (
        window as typeof window & {
          __lenis?: Lenis;
        }
      ).__lenis;
    };
  }, []);

  return <>{children}</>;
}