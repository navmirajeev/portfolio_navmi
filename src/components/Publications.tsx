"use client";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

import { publications } from "@/data/publications";

const cardColors = [
  {
    background: "#1D3557",
    foreground: "#F1FAEE",
    accent: "#E63946",
  },
  {
    background: "#F1FAEE",
    foreground: "#1D3557",
    accent: "#E63946",
  },
  {
    background: "#457B9D",
    foreground: "#F1FAEE",
    accent: "#A8DADC",
  },
];

const DESKTOP_POSITIONS = {
  left: {
    x: -430,
    scale: 0.78,
    opacity: 0.45,
    rotateY: 18,
    zIndex: 1,
  },
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    rotateY: 0,
    zIndex: 3,
  },
  right: {
    x: 430,
    scale: 0.78,
    opacity: 0.45,
    rotateY: -18,
    zIndex: 1,
  },
  hiddenLeft: {
    x: -760,
    scale: 0.65,
    opacity: 0,
    rotateY: 25,
    zIndex: 0,
  },
  hiddenRight: {
    x: 760,
    scale: 0.65,
    opacity: 0,
    rotateY: -25,
    zIndex: 0,
  },
};

const MOBILE_POSITIONS = {
  left: {
    x: -280,
    scale: 0.78,
    opacity: 0,
    rotateY: 12,
    zIndex: 1,
  },
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    rotateY: 0,
    zIndex: 3,
  },
  right: {
    x: 280,
    scale: 0.78,
    opacity: 0,
    rotateY: -12,
    zIndex: 1,
  },
  hiddenLeft: {
    x: -350,
    scale: 0.7,
    opacity: 0,
    rotateY: 15,
    zIndex: 0,
  },
  hiddenRight: {
    x: 350,
    scale: 0.7,
    opacity: 0,
    rotateY: -15,
    zIndex: 0,
  },
};

type PositionName =
  | "left"
  | "center"
  | "right"
  | "hiddenLeft"
  | "hiddenRight";

export default function Publications() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cardsRef = useRef<HTMLElement[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef(0);
  const autoplayRef = useRef<number | null>(null);  const isAnimatingRef = useRef(false);

  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragCurrentXRef = useRef(0);
  const didDragRef = useRef(false);

  /*
   * ------------------------------------------------------------
   * Figure out where each card should be.
   * ------------------------------------------------------------
   */

  const getCardPosition = useCallback(
    (
      cardIndex: number,
      currentIndex: number
    ): PositionName => {
      const total = publications.length;

      if (total === 1) {
        return "center";
      }

      if (total === 2) {
        const difference =
          (cardIndex - currentIndex + total) % total;

        return difference === 0 ? "center" : "right";
      }

      let difference =
        (cardIndex - currentIndex + total) % total;

      if (difference > total / 2) {
        difference -= total;
      }

      if (difference === 0) {
        return "center";
      }

      if (difference === -1) {
        return "left";
      }

      if (difference === 1) {
        return "right";
      }

      if (difference < 0) {
        return "hiddenLeft";
      }

      return "hiddenRight";
    },
    []
  );

  /*
   * ------------------------------------------------------------
   * Move all cards into their correct positions.
   * ------------------------------------------------------------
   */

  const animateCarousel = useCallback(
    (newIndex: number, immediate = false) => {
      if (!cardsRef.current.length) return;

      const positions =
        window.innerWidth < 768
          ? MOBILE_POSITIONS
          : DESKTOP_POSITIONS;

      cardsRef.current.forEach((card, cardIndex) => {
        if (!card) return;

        const positionName = getCardPosition(
          cardIndex,
          newIndex
        );

        const position = positions[positionName];

        gsap.to(card, {
          x: position.x,
          scale: position.scale,
          opacity: position.opacity,
          rotateY: position.rotateY,
          rotateX: 0,
          zIndex: position.zIndex,
          duration: immediate ? 0 : 0.8,
          ease: "power3.inOut",
          overwrite: true,
        });
      });
    },
    [getCardPosition]
  );

  /*
   * ------------------------------------------------------------
   * Change active publication.
   * ------------------------------------------------------------
   */

  const goTo = useCallback(
    (index: number) => {
      if (isAnimatingRef.current) return;

      const total = publications.length;

      if (!total) return;

      const newIndex =
        ((index % total) + total) % total;

      if (newIndex === activeIndexRef.current) {
        animateCarousel(newIndex);
        return;
      }

      isAnimatingRef.current = true;

      activeIndexRef.current = newIndex;
      setActiveIndex(newIndex);

      animateCarousel(newIndex);

      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, 820);
    },
    [animateCarousel]
  );

  /*
   * ------------------------------------------------------------
   * Next / previous.
   * ------------------------------------------------------------
   */

  const next = useCallback(() => {
    goTo(activeIndexRef.current + 1);
  }, [goTo]);

  const previous = useCallback(() => {
    goTo(activeIndexRef.current - 1);
  }, [goTo]);

  /*
   * ------------------------------------------------------------
   * Autoplay.
   * ------------------------------------------------------------
   */

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();

    autoplayRef.current = window.setInterval(() => {
      next();
    }, 5000);
  }, [next, stopAutoplay]);

  /*
   * ------------------------------------------------------------
   * Initial setup.
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      animateCarousel(0, true);
    }, 50);

    const autoplayTimer = window.setTimeout(() => {
      startAutoplay();
    }, 500);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(autoplayTimer);
      stopAutoplay();
    };
  }, [animateCarousel, startAutoplay, stopAutoplay]);

  /*
   * ------------------------------------------------------------
   * Resize.
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const handleResize = () => {
      animateCarousel(
        activeIndexRef.current,
        true
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [animateCarousel]);

  /*
   * ------------------------------------------------------------
   * Hover behavior.
   * ------------------------------------------------------------
   */

  const handleMouseEnter = () => {
    stopAutoplay();
  };

  const handleMouseLeave = () => {
    if (draggingRef.current) return;

    startAutoplay();

    const activeCard =
      cardsRef.current[activeIndexRef.current];

    if (!activeCard) return;

    gsap.to(activeCard, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  /*
   * ------------------------------------------------------------
   * Small 3D movement when moving the mouse over carousel.
   * ------------------------------------------------------------
   */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (draggingRef.current) return;

    const activeCard =
      cardsRef.current[activeIndexRef.current];

    if (!activeCard) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const mouseX =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const mouseY =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    gsap.to(activeCard, {
      rotateX: -mouseY * 3,
      rotateY: mouseX * 3,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  /*
   * ------------------------------------------------------------
   * Drag start.
   * ------------------------------------------------------------
   */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    draggingRef.current = true;
    didDragRef.current = false;

    dragStartXRef.current = event.clientX;
    dragCurrentXRef.current = event.clientX;

    stopAutoplay();

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  /*
   * ------------------------------------------------------------
   * Drag movement.
   * ------------------------------------------------------------
   */

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!draggingRef.current) return;

    dragCurrentXRef.current =
      event.clientX;

    const delta =
      dragCurrentXRef.current -
      dragStartXRef.current;

    if (Math.abs(delta) > 8) {
      didDragRef.current = true;
    }

    if (!didDragRef.current) return;

    const activeCard =
      cardsRef.current[activeIndexRef.current];

    if (!activeCard) return;

    /*
     * Only move the active card while dragging.
     * The other cards stay in their positions.
     */

    gsap.to(activeCard, {
      x: delta * 0.5,
      duration: 0.12,
      ease: "none",
      overwrite: true,
    });
  };

  /*
   * ------------------------------------------------------------
   * Drag release.
   * ------------------------------------------------------------
   */

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!draggingRef.current) return;

    const delta =
      dragCurrentXRef.current -
      dragStartXRef.current;

    draggingRef.current = false;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture may already have been released.
    }

    const threshold = 80;

    if (Math.abs(delta) >= threshold) {
      if (delta < 0) {
        next();
      } else {
        previous();
      }
    } else {
      animateCarousel(
        activeIndexRef.current
      );
    }

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 50);

    startAutoplay();
  };

  /*
   * ------------------------------------------------------------
   * Drag cancellation.
   * ------------------------------------------------------------
   */

  const handlePointerCancel = () => {
    if (!draggingRef.current) return;

    draggingRef.current = false;

    animateCarousel(
      activeIndexRef.current
    );

    didDragRef.current = false;

    startAutoplay();
  };

  /*
   * ------------------------------------------------------------
   * Clicking a card.
   * ------------------------------------------------------------
   */

  const handleCardClick = (
    index: number,
    event: React.MouseEvent
  ) => {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (index !== activeIndexRef.current) {
      goTo(index);
    }
  };

  return (
    <section
      id="publications"
      className="
        relative
        overflow-hidden
        bg-[var(--light-blue)]
        px-6
        py-28
        md:px-10
        md:py-36
      "
    >
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--blue)]">
          04 / Publications
        </p>

        <h2 className="mt-5 text-5xl leading-[0.88] tracking-[-0.06em] md:text-8xl">
          Research
          <br />
          <span className="text-[var(--red)]">
            published.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[var(--blue)] md:text-base">
          Research across artificial intelligence,
          machine learning, computer vision and
          intelligent systems.
        </p>
      </div>

      {/* ======================================================
          CAROUSEL
          ====================================================== */}

      <div
        ref={carouselRef}
        className="
          relative
          mx-auto
          mt-16
          flex
          h-[590px]
          w-full
          max-w-[1400px]
          touch-pan-y
          select-none
          items-center
          justify-center
          md:mt-20
          md:h-[640px]
        "
        style={{
          perspective: "1600px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Center guide */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-1/2
            h-px
            -translate-y-1/2
            bg-[var(--navy)]/10
          "
        />

        {/* ==================================================
            PUBLICATION CARDS
            ================================================== */}

        {publications.map(
          (publication, index) => {
            const palette =
              cardColors[
                index % cardColors.length
              ];

            return (
              <article
                key={publication.number}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element;
                  }
                }}
                onClick={(event) =>
                  handleCardClick(
                    index,
                    event
                  )
                }
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[450px]
                  w-[82vw]
                  max-w-[720px]
                  -translate-x-1/2
                  -translate-y-1/2
                  cursor-grab
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-black/10
                  shadow-[0_35px_90px_rgba(29,53,87,0.20)]
                  active:cursor-grabbing
                  md:h-[500px]
                "
                style={{
                  backgroundColor:
                    palette.background,
                  color:
                    palette.foreground,
                  transformStyle:
                    "preserve-3d",
                  willChange:
                    "transform, opacity",
                }}
              >
                {/* Card top bar */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-black/10
                    px-6
                    py-4
                    md:px-8
                  "
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium opacity-50">
                      {publication.number}
                    </span>

                    <span className="text-xs uppercase tracking-[0.16em]">
                      {publication.type}
                    </span>
                  </div>

                  <span className="text-xs opacity-50">
                    {publication.year}
                  </span>
                </div>

                {/* Card body */}

                <div
                  className="
                    flex
                    h-[calc(100%-57px)]
                    flex-col
                    justify-between
                    p-7
                    md:p-10
                  "
                >
                  <div>
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                      "
                      style={{
                        color:
                          palette.accent,
                      }}
                    >
                      {publication.venue}
                    </p>

                    <h3
                      className="
                        mt-6
                        max-w-2xl
                        text-3xl
                        leading-[0.95]
                        tracking-[-0.05em]
                        md:text-5xl
                      "
                    >
                      {publication.title}
                    </h3>

                    <p
                      className="
                        mt-7
                        max-w-2xl
                        text-sm
                        leading-7
                        opacity-75
                        md:text-base
                      "
                    >
                      {publication.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}

                    <div className="flex flex-wrap gap-2">
                      {publication.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-xs
                            "
                            style={{
                              borderColor: `${palette.foreground}40`,
                            }}
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>

                    {/* Bottom row */}

                    <div
                      className="
                        mt-8
                        flex
                        items-center
                        justify-between
                        border-t
                        border-black/10
                        pt-5
                      "
                    >
                      <span
                        className="
                          max-w-[60%]
                          text-xs
                          uppercase
                          tracking-[0.16em]
                          opacity-50
                        "
                      >
                        {publication.venue}
                      </span>

                      <a
                        href={publication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onPointerDown={(event) => event.stopPropagation()}
                        onPointerUp={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className="
                          group
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          uppercase
                          tracking-[0.14em]
                          text-[var(--blue)]
                          transition-colors
                          duration-300
                          hover:text-[var(--red)]
                        "
                      >
                        View paper
                        <ArrowUpRight
                          size={15}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                          "
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>

      {/* ======================================================
          CONTROLS
          ====================================================== */}

      <div
        className="
          mx-auto
          flex
          max-w-[720px]
          items-center
          justify-between
        "
      >
        {/* Previous */}

        <button
          type="button"
          onClick={previous}
          aria-label="Previous publication"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[var(--navy)]/20
            transition-all
            duration-300
            hover:bg-[var(--navy)]
            hover:text-[var(--off-white)]
          "
        >
          <ArrowLeft size={18} />
        </button>

        {/* Dots */}

        <div className="flex items-center gap-2">
          {publications.map(
            (publication, index) => (
              <button
                key={publication.number}
                type="button"
                onClick={() =>
                  goTo(index)
                }
                aria-label={`Go to publication ${
                  index + 1
                }`}
                className="p-2"
              >
                <span
                  className={`
                    block
                    h-1
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      index === activeIndex
                        ? "w-10 bg-[var(--red)]"
                        : "w-2 bg-[var(--navy)]/25"
                    }
                  `}
                />
              </button>
            )
          )}
        </div>

        {/* Next */}

        <button
          type="button"
          onClick={next}
          aria-label="Next publication"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[var(--navy)]/20
            transition-all
            duration-300
            hover:bg-[var(--navy)]
            hover:text-[var(--off-white)]
          "
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Interaction hint */}

      <p
        className="
          mt-8
          text-center
          text-[10px]
          uppercase
          tracking-[0.22em]
          text-[var(--blue)]
        "
      >
        Drag or swipe to explore
      </p>
    </section>
  );
}