"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const cardColors = [
  {
    background: "#1D3557",
    foreground: "#F1FAEE",
    accent: "#E63946",
  },
  {
    background: "#A8DADC",
    foreground: "#1D3557",
    accent: "#E63946",
  },
  {
    background: "#457B9D",
    foreground: "#F1FAEE",
    accent: "#A8DADC",
  },
  {
    background: "#E63946",
    foreground: "#F1FAEE",
    accent: "#1D3557",
  },
  {
    background: "#F1FAEE",
    foreground: "#1D3557",
    accent: "#457B9D",
  },
  {
    background: "#1D3557",
    foreground: "#F1FAEE",
    accent: "#A8DADC",
  },
];

const CARD_HEADER_HEIGHT = 48;

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const deckTimelineRef =
    useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const cards = cardsRef.current;
      const stage = stageRef.current;

      if (!cards.length || !stage) return;

      const mm = gsap.matchMedia();

      // ============================================================
      // DESKTOP
      // ============================================================

      mm.add("(min-width: 768px)", () => {
        const firstCard = cards[0];

        if (!firstCard) return;

        const cardHeight = firstCard.offsetHeight;

        /*
         * Cards 02-06 begin completely underneath
         * the visible stage.
         */
        const hiddenY = cardHeight + 40;

        /*
         * Initial positions.
         */
        cards.forEach((card, index) => {
          gsap.set(card, {
            y: index === 0 ? 0 : hiddenY,
            x: 0,
            scale: 1,
            rotation: 0,
            zIndex: index + 1,
          });
        });

        /*
         * The heading starts above the deck.
         *
         * The deck initially sits lower down.
         * During the first part of the pinned
         * sequence it moves upward into the
         * position previously occupied by
         * "Selected work."
         */
        gsap.set(".project-deck", {
          y: 0,
        });

        const deck = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top top",

            /*
             * Extra scroll space gives us:
             *
             * 1. Heading disappearing
             * 2. Deck moving upward
             * 3. Cards stacking
             */
            end: `+=${(projects.length + 1) * 150}vh`,

            pin: stage,

            scrub: 1.5,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });

        deckTimelineRef.current = deck;

        // ============================================================
        // PHASE 1
        // Move the deck into the heading's position
        // ============================================================

        deck.to(
          ".project-deck",
          {
            y: -190,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );

        // ============================================================
        // PHASE 2
        // Build the stack
        // ============================================================

        for (let index = 1; index < cards.length; index++) {
          const currentCard = cards[index];

          deck.to(
            currentCard,
            {
              y: index * CARD_HEADER_HEIGHT,
              duration: 1,
              ease: "none",
            },
            index
          );
        }

        /*
         * Keep the final stack completely still.
         *
         * There is intentionally no movement after
         * Card 06 reaches its final position.
         */

        return () => {
          deckTimelineRef.current = null;

          deck.scrollTrigger?.kill();
          deck.kill();
        };
      });

      // ============================================================
      // MOBILE
      // ============================================================

      mm.add("(max-width: 767px)", () => {
        const firstCard = cards[0];

        if (!firstCard) return;

        const cardHeight = firstCard.offsetHeight;

        const hiddenY = cardHeight + 30;

        const mobileHeaderHeight = 42;

        cards.forEach((card, index) => {
          gsap.set(card, {
            y: index === 0 ? 0 : hiddenY,
            x: 0,
            scale: 1,
            rotation: 0,
            zIndex: index + 1,
          });
        });

        gsap.set(".project-deck", {
          y: 0,
        });

        const deck = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top top",

            end: `+=${(projects.length + 1) * 140}vh`,

            pin: stage,

            scrub: 1.5,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });

        deckTimelineRef.current = deck;

        // ============================================================
        // PHASE 1
        // Bring deck upward after heading disappears
        // ============================================================

        deck.to(
          ".project-deck",
          {
            y: -150,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );

        // ============================================================
        // PHASE 2
        // Stack cards
        // ============================================================

        for (let index = 1; index < cards.length; index++) {
          deck.to(
            cards[index],
            {
              y: index * mobileHeaderHeight,
              duration: 1,
              ease: "none",
            },
            index
          );
        }

        return () => {
          deckTimelineRef.current = null;

          deck.scrollTrigger?.kill();
          deck.kill();
        };
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    }
  );

  /*
   * Navigate to a specific project when
   * its header is clicked.
   */
  const handleHeaderClick = (index: number) => {
    const deck = deckTimelineRef.current;

    if (!deck) return;

    gsap.to(deck, {
      time: index + 1,
      duration: 1,
      ease: "power3.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="
        relative
        bg-[var(--off-white)]
        px-6
        pb-24
        pt-16
        md:px-10
        md:pb-36
        md:pt-20
      "
    >
      {/* ============================================================
          SECTION HEADING
      ============================================================ */}

      <div className="mb-8 md:mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--blue)]">
          03 / Work
        </p>

        <div className="mt-5 flex items-end justify-between gap-8">
          <h2 className="text-5xl leading-[0.86] tracking-[-0.06em] md:text-7xl lg:text-8xl">
            Selected{" "}
            <span className="text-[var(--red)]">
              work.
            </span>
          </h2>

          <p className="hidden max-w-xs pb-1 text-sm leading-6 text-[var(--blue)] md:block">
            Research, experiments and systems built around
            artificial intelligence.
          </p>
        </div>
      </div>

      {/* ============================================================
          CARD DECK
      ============================================================ */}

      <div
        ref={stageRef}
        className="
          project-stage
          relative
          mx-auto
          mt-8
          h-[760px]
          w-full
          max-w-[980px]
          md:mt-10
          md:h-[760px]
        "
      >
        <div className="project-deck absolute inset-0">
          {projects.map((project, index) => {
            const colors =
              cardColors[index % cardColors.length];

            return (
              <article
                key={project.number}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element;
                  }
                }}
                className="
                  project-card
                  absolute
                  inset-0
                  flex
                  flex-col
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-black/10
                  shadow-[0_30px_80px_rgba(29,53,87,0.16)]
                "
                style={{
                  backgroundColor: colors.background,
                  color: colors.foreground,
                }}
              >
                {/* ==================================================
                    CLICKABLE CARD HEADER
                ================================================== */}

                <button
                  type="button"
                  onClick={() =>
                    handleHeaderClick(index)
                  }
                  className="
                    group
                    flex
                    h-[48px]
                    shrink-0
                    items-center
                    justify-between
                    border-b
                    border-black/10
                    px-5
                    text-left
                    transition-colors
                    duration-300
                    hover:bg-black/5
                    md:px-7
                  "
                  aria-label={`View ${project.title}`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-xs font-medium opacity-60">
                      {project.number}
                    </span>

                    <span className="truncate text-xs uppercase tracking-[0.12em]">
                      {project.title}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="
                      shrink-0
                      opacity-60
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </button>

                {/* ==================================================
                    IMAGE
                ================================================== */}

                <div
                  className="
                    relative
                    h-[46%]
                    w-full
                    shrink-0
                    overflow-hidden
                    md:h-[48%]
                  "
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 900px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7">
                    <span className="text-xs uppercase tracking-[0.18em]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div className="flex min-h-0 flex-1 flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="max-w-[760px] text-3xl leading-[0.95] tracking-[-0.045em] md:text-5xl">
                        {project.title}
                      </h3>

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                        "
                        style={{
                          backgroundColor:
                            colors.accent,
                          color:
                            colors.foreground,
                        }}
                      >
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.7}
                        />
                      </div>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-6 opacity-75 md:text-base md:leading-7">
                      {project.description}
                    </p>
                  </div>

                  {/* ==================================================
                      TAGS
                  ================================================== */}

                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3 py-1.5 text-xs"
                        style={{
                          borderColor: `${colors.foreground}40`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <div
        className="
          mx-auto
          mt-10
          flex
          max-w-[980px]
          items-center
          justify-between
          border-t
          border-[var(--navy)]/15
          pt-5
          text-xs
          uppercase
          tracking-[0.18em]
          text-[var(--blue)]
        "
      >
        <span>Scroll through projects</span>
        <span>01 — 06</span>
      </div>
    </section>
  );
}