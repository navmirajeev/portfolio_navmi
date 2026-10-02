"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail } from "lucide-react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    label: "GitHub",
    href: "https://github.com/navmirajeev",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/navmi-rajeev/",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=9_CDsU8AAAAJ",
  },
  {
    label: "Resume",
    href: "/Resumeportfolio.pdf",
  },
];


export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-label", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".contact-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".contact-description", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.from(".contact-email", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      gsap.from(".contact-links", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
        },
      });

      // Slow floating motion for the accent circle
      gsap.to(".contact-orbit", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // Small floating movement
      gsap.to(".contact-orbit-inner", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--navy)]
        px-6
        py-28
        text-[var(--off-white)]
        md:px-10
        md:py-36
      "
    >
      {/* ============================================================
          BACKGROUND ACCENT
      ============================================================ */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[18%]
          hidden
          h-[420px]
          w-[420px]
          rounded-full
          border
          border-[var(--light-blue)]/10
          md:block
        "
      />

      <div
        className="
          contact-orbit
          pointer-events-none
          absolute
          right-[-20px]
          top-[30%]
          hidden
          h-[260px]
          w-[260px]
          rounded-full
          border
          border-[var(--red)]/20
          md:block
        "
      >
        <div
          className="
            contact-orbit-inner
            absolute
            left-1/2
            top-0
            h-3
            w-3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--red)]
          "
        />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-224px)] max-w-[1400px] flex-col justify-between">
        {/* Top */}

        <div>
          <p
            className="
              contact-label
              text-xs
              uppercase
              tracking-[0.25em]
              text-[var(--light-blue)]
            "
          >
            05 / Contact
          </p>

          <div className="mt-24">
            <h2
              className="
                max-w-6xl
                text-[clamp(4rem,11vw,10rem)]
                leading-[0.82]
                tracking-[-0.075em]
              "
            >
              <span className="contact-line block">
                Let&apos;s build
              </span>

              <span className="contact-line block text-[var(--red)]">
                something.
              </span>
            </h2>

            <p
              className="
                contact-description
                mt-10
                max-w-xl
                text-base
                leading-7
                text-[var(--light-blue)]
                md:text-lg
              "
            >
              Have a research idea, an interesting problem or something worth
              building? I&apos;d love to hear about it.
            </p>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-24">
          {/* Email */}

          <a
            href="mailto:navmi2003@gmail.com"
            className="
              contact-email
              group
              inline-flex
              items-center
              gap-4
              border-b
              border-[var(--light-blue)]/40
              pb-3
              text-xl
              tracking-[-0.02em]
              transition-colors
              duration-300
              hover:border-[var(--red)]
              hover:text-[var(--red)]
              md:text-2xl
            "
          >
            <Mail
              size={21}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:-rotate-12
              "
            />

            <span>navmi2003@gmail.com</span>

            <ArrowUpRight
              size={20}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>

          {/* Links */}

          <div
            className="
              contact-links
              mt-20
              flex
              flex-wrap
              gap-x-10
              gap-y-5
              border-t
              border-[var(--off-white)]/15
              pt-6
            "
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[var(--light-blue)]
                  transition-colors
                  duration-300
                  hover:text-[var(--red)]
                "
              >
                {link.label}

                <ArrowUpRight
                  size={13}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            ))}
          </div>

          {/* Footer line */}

          <div
            className="
              mt-10
              flex
              flex-col
              justify-between
              gap-3
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[var(--off-white)]/40
              md:flex-row
            "
          >
            <span>
              AI / ML · Research · Engineering
            </span>

            <span>
              © {new Date().getFullYear()} Navmi Rajeev
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}