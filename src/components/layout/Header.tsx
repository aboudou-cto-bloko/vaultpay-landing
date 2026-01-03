"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const HEADER_HEIGHT = 64;

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#cost-breakdown" },
  { label: "Reviews", href: "#testimonials" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const scrollToHero = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 will-change-[background-color,box-shadow]"
      style={{
        backgroundColor: isScrolled ? "var(--vp-surface)" : "transparent",
        backdropFilter: isScrolled ? "var(--vp-backdrop-blur)" : "none",
        borderBottom: `1px solid ${isScrolled ? "var(--vp-border-subtle)" : "transparent"}`,
        boxShadow: isScrolled ? "var(--vp-shadow-sm)" : "none",
        transform: "translateZ(0)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <button
            onClick={scrollToHero}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                background: "var(--vp-gradient-brand)",
                boxShadow: "var(--vp-shadow-sm)",
              }}
            >
              <span
                className="font-bold text-lg"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--vp-primary-foreground)",
                }}
              >
                V
              </span>
            </div>
            <span
              className="font-bold text-lg transition-colors duration-300"
              style={{
                fontFamily: "var(--font-outfit)",
                color: isScrolled
                  ? "var(--vp-text-primary)"
                  : "var(--vp-text-inverse)",
              }}
            >
              VaultPay
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: isScrolled
                    ? "var(--vp-text-secondary)"
                    : "var(--vp-text-inverse)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isScrolled
                    ? "var(--vp-text-primary)"
                    : "var(--vp-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isScrolled
                    ? "var(--vp-text-secondary)"
                    : "var(--vp-text-inverse)";
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button
              onClick={() => handleNavClick("#final-cta")}
              className="font-semibold rounded-lg px-6 py-2.5 text-sm transition-all"
              style={{
                backgroundColor: "var(--vp-primary)",
                color: "var(--vp-primary-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--vp-primary-light)";
                e.currentTarget.style.boxShadow =
                  "var(--vp-shadow-lg), var(--vp-shadow-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--vp-primary)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{
              color: isScrolled
                ? "var(--vp-text-primary)"
                : "var(--vp-text-inverse)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isScrolled
                ? "var(--vp-bg-subtle)"
                : "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: "var(--vp-surface)",
            borderTop: "1px solid var(--vp-border-subtle)",
            boxShadow: "var(--vp-shadow-lg)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-left py-2 transition-colors font-medium"
                  style={{ color: "var(--vp-text-primary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--vp-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--vp-text-primary)";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => handleNavClick("#final-cta")}
              className="w-full font-semibold rounded-lg py-3 text-sm"
              style={{
                backgroundColor: "var(--vp-primary)",
                color: "var(--vp-primary-foreground)",
              }}
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
