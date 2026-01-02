"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CheckCircle2, Zap, ChevronDown } from "lucide-react";

export function HeroSection() {
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const gradientRef = useRef<HTMLSpanElement | null>(null);
  const socialProofRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animation du bouton lors de la soumission
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Email submitted:", email);

      // Success micro-animation
      gsap.fromTo(
        formRef.current,
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
      );
    }, 1500);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          badgeRef.current,
          headlineRef.current,
          subheadlineRef.current,
          gradientRef.current,
          socialProofRef.current,
          formRef.current,
          scrollHintRef.current,
        ],
        { opacity: 1 },
      );
      return;
    }

    // TIMELINE NARRATIVE OPTIMISÉE
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // ═══════════════════════════════════════════════════════
    // ACTE 1 : L'ACCROCHE (0-0.8s)
    // ═══════════════════════════════════════════════════════

    // 1.1 Badge - BURST entrance
    tl.fromTo(
      badgeRef.current,
      {
        opacity: 0,
        scale: 0.5,
        y: -20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(2.5)",
      },
      0, // Start at 0s
    );

    // 1.2 Headline (partie fixe) - SNAP entrance
    tl.fromTo(
      headlineRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power4.out",
      },
      0.25, // Overlap avec badge
    );

    // PAUSE NARRATIVE (0.2s) - Le visiteur lit "Send Money to Africa"

    // ═══════════════════════════════════════════════════════
    // ACTE 2 : LA RÉVÉLATION (0.8-1.6s)
    // ═══════════════════════════════════════════════════════

    // 2.1 Gradient - EXPLOSION de la promesse de valeur
    tl.fromTo(
      gradientRef.current,
      {
        opacity: 0,
        scale: 0.7,
        filter: "blur(30px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.out",
      },
      0.8, // Après la pause
    );

    // 2.2 Double pulse sur le gradient (souligne l'économie)
    tl.to(
      gradientRef.current,
      {
        scale: 1.03,
        duration: 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 2, // 2 pulses seulement, puis stop
      },
      1.3,
    );

    // 2.3 Subheadline - CONTEXTUALISATION
    tl.fromTo(
      subheadlineRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      1.4, // Pendant le pulse
    );

    // PAUSE NARRATIVE (0.3s) - Absorption du message complet

    // ═══════════════════════════════════════════════════════
    // ACTE 3 : LA RÉASSURANCE → ACTION (2.3-3.5s)
    // ═══════════════════════════════════════════════════════

    // 3.1 Social Proof AVANT le form (réassure d'abord)
    tl.fromTo(
      socialProofRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
      },
      2.3,
    );

    // 3.2 Form - APPEL À L'ACTION (maintenant qu'on est rassuré)
    tl.fromTo(
      formRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      2.7,
    );

    // 3.3 Scroll Hint - INVITATION subtile à découvrir la suite
    tl.fromTo(
      scrollHintRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 0.6,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      3.2,
    );

    // 3.4 Scroll Hint - BOUNCE infini (invite à scroller)
    tl.to(
      scrollHintRef.current,
      {
        y: 8,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      },
      3.8,
    );
  }, []);

  // Magnetic CTA Button (interaction premium)
  useEffect(() => {
    const button = buttonRef.current;
    if (!button || window.innerWidth < 768) return; // Desktop only

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero-section min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div ref={badgeRef} style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border-2 border-[var(--vp-primary)] bg-white text-[var(--vp-primary)] font-medium rounded-full shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="text-sm">Launching March 2026</span>
            </div>
          </div>

          {/* Headline avec gradient intégré */}
          <h1
            ref={headlineRef}
            style={{ opacity: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 max-w-4xl mx-auto leading-tight"
          >
            Send Money to Africa.{" "}
            <span
              ref={gradientRef}
              style={{ opacity: 0 }}
              className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
            >
              Save $1,000+/Year.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            style={{ opacity: 0 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-normal"
          >
            FINTRAC-licensed transfers in under 60 seconds. Pay $7.50, not $45.
          </p>

          {/* Social Proof (apparaît AVANT le form) */}
          <div ref={socialProofRef} style={{ opacity: 0 }} className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  8,200+ people waiting
                </span>
              </div>

              <div className="hidden sm:block w-px h-6 bg-gray-300" />

              <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">FINTRAC Licensed</span>
              </div>
            </div>
          </div>

          {/* Form (apparaît APRÈS la réassurance) */}
          <div ref={formRef} style={{ opacity: 0 }}>
            <div className="max-w-lg mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    md:flex-1
                    h-14
                    px-5
                    text-base
                    bg-white
                    border-2 border-gray-300
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-200
                    rounded-xl
                    transition-all
                    duration-200
                    outline-none
                  "
                />

                <button
                  ref={buttonRef}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[var(--vp-primary)] hover:bg-[var(--vp-primary-dark)] text-white font-semibold d h-14 px-10 rounded-xl text-base whitespace-nowrap transition-all duration-200 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Free to join. No credit card required.
              </p>
            </div>
          </div>

          {/* Scroll Hint - Invite à découvrir la suite */}
          <div
            ref={scrollHintRef}
            style={{ opacity: 0 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: "smooth",
              })
            }
          >
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Discover how
            </span>
            <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
