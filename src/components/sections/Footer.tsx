"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const licenseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          logoRef.current,
          nameRef.current,
          descriptionRef.current,
          statusRef.current,
          dividerRef.current,
          copyrightRef.current,
          contactRef.current,
          licenseRef.current,
        ],
        { opacity: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Logo
      tl.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        0,
      );

      // Name
      tl.fromTo(
        nameRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.3,
      );

      // Description
      tl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.8,
      );

      // Status
      tl.fromTo(
        statusRef.current,
        { y: 15, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        1.2,
      );

      // Divider
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.out" },
        1.8,
      );

      // Bottom elements
      const bottomElements = [
        copyrightRef.current,
        contactRef.current,
        licenseRef.current,
      ];
      bottomElements.forEach((el, index) => {
        if (!el) return;
        tl.fromTo(
          el,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          2.2 + index * 0.12,
        );
      });

      // Hover effects
      if (window.innerWidth >= 768) {
        const logoContainer = logoRef.current?.parentElement;
        if (logoContainer) {
          logoContainer.addEventListener("mouseenter", () => {
            gsap.to(logoRef.current, {
              scale: 1.05,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          logoContainer.addEventListener("mouseleave", () => {
            gsap.to(logoRef.current, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.in",
            });
          });
        }

        if (contactRef.current) {
          contactRef.current.addEventListener("mouseenter", () => {
            gsap.to(contactRef.current, {
              scale: 1.02,
              duration: 0.2,
              ease: "power2.out",
            });
          });
          contactRef.current.addEventListener("mouseleave", () => {
            gsap.to(contactRef.current, {
              scale: 1,
              duration: 0.2,
              ease: "power2.in",
            });
          });
        }

        if (licenseRef.current) {
          const shieldIcon = licenseRef.current.querySelector("svg");
          licenseRef.current.addEventListener("mouseenter", () => {
            if (shieldIcon) {
              gsap.to(shieldIcon, {
                scale: 1.15,
                duration: 0.3,
                ease: "back.out(2)",
              });
            }
          });
          licenseRef.current.addEventListener("mouseleave", () => {
            if (shieldIcon) {
              gsap.to(shieldIcon, {
                scale: 1,
                duration: 0.3,
                ease: "power2.in",
              });
            }
          });
        }
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Content - Centered */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                ref={logoRef}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--vp-gradient-brand)" }}
              >
                <span
                  className="font-bold text-xl"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--vp-primary-foreground)",
                  }}
                >
                  V
                </span>
              </div>
              <span
                ref={nameRef}
                className="font-bold text-xl"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--vp-text-primary)",
                }}
              >
                VaultPay
              </span>
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-sm mb-4 max-w-md mx-auto"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              FINTRAC-licensed money transfers to Africa. Fast, secure, and
              affordable.
            </p>

            {/* Pre-launch Status */}
            <div
              ref={statusRef}
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--vp-success)" }}
              />
              <span>Launching March 2026</span>
            </div>
          </div>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="h-px mb-8"
            style={{
              backgroundColor: "var(--vp-border-default)",
              transformOrigin: "center",
            }}
          />

          {/* Bottom Row */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
            style={{ color: "var(--vp-text-secondary)" }}
          >
            {/* Copyright */}
            <p ref={copyrightRef}>
              © {currentYear} VaultPay Inc. All rights reserved.
            </p>

            {/* Contact */}
            <a
              ref={contactRef}
              href="mailto:hello@vaultpay.com"
              className="transition-colors duration-200"
              style={{ color: "var(--vp-text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--vp-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--vp-text-secondary)";
              }}
            >
              hello@vaultpay.com
            </a>

            {/* License */}
            <div ref={licenseRef} className="flex items-center gap-2">
              <ShieldCheck
                className="w-4 h-4"
                style={{ color: "var(--vp-success)" }}
              />
              <span>FINTRAC Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
