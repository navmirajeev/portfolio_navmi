"use client";

import { useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Research", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const target = document.querySelector(href);

    if (!target) return;

    const lenis = (
      window as typeof window & {
        __lenis?: {
          scrollTo: (
            target: HTMLElement,
            options?: {
              offset?: number;
              duration?: number;
              easing?: (t: number) => number;
            }
          ) => void;
        };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        offset: 0,
        duration: 2,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

  return (
    <header
      className="
        absolute
        left-0
        top-0
        z-50
        w-full
        px-5
        py-4
        text-[var(--off-white)]
        md:px-8
        md:py-5
      "
    >
      <nav className="flex items-center justify-between">
        {/* Logo */}

        <a
          href="#"
          onClick={(event) => handleNavigation(event, "body")}
          className="
            text-xs
            font-semibold
            tracking-[-0.02em]
            md:text-sm
          "
        >
          NAVMI.
        </a>

        {/* Desktop navigation */}

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) =>
                handleNavigation(event, link.href)
              }
              className="
                group
                relative
                text-[10px]
                uppercase
                tracking-[0.14em]
                md:text-xs
              "
            >
              {link.label}

              <span
                className="
                  absolute
                  -bottom-1
                  left-0
                  h-px
                  w-0
                  bg-[var(--red)]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </div>

        {/* Mobile menu */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            text-[10px]
            uppercase
            tracking-[0.14em]
            md:hidden
          "
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="
            mt-4
            flex
            flex-col
            gap-3
            border-t
            border-[var(--off-white)]/20
            pt-4
            md:hidden
          "
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) =>
                handleNavigation(event, link.href)
              }
              className="text-xl"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}