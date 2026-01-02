"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-white/5 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="vp-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={scrollToHero}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--vp-primary)] to-[var(--vp-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span
              className={`font-bold text-lg transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              VaultPay
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-normal transition-colors duration-200 hover:text-[var(--vp-primary)] ${
                  isScrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#final-cta"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#final-cta");
              }}
            >
              <Button className="bg-[var(--vp-primary)] hover:bg-[var(--vp-primary-dark)] text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                Join Waitlist
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? "text-foreground hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="vp-container py-4">
            <nav className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-normal text-foreground hover:text-[var(--vp-primary)] text-left py-2 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <a
              href="#final-cta"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#final-cta");
              }}
              className="block"
            >
              <Button className="bg-[var(--vp-primary)] hover:bg-[var(--vp-primary-dark)] text-white font-semibold rounded-lg w-full py-3 text-sm transition-all duration-200">
                Join Waitlist
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
