"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CostBreakdown() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const inputsRef = useRef<HTMLDivElement | null>(null);
  const wuCardRef = useRef<HTMLDivElement | null>(null);
  const vpCardRef = useRef<HTMLDivElement | null>(null);
  const savingsRef = useRef<HTMLDivElement | null>(null);

  // Refs pour les lignes de frais (pour animation stagger)
  const wuFeesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const vpFeesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [amount, setAmount] = useState(500);
  const [frequency, setFrequency] = useState(2);
  const [country, setCountry] = useState("Nigeria");

  // Calculs dynamiques
  const westernUnionFee = amount * 0.05;
  const westernUnionExchange = amount * 0.036;
  const westernUnionHidden = 2;
  const westernUnionTotal =
    westernUnionFee + westernUnionExchange + westernUnionHidden;

  const vaultPayFee = 5;
  const vaultPayExchange = amount * 0.005;
  const vaultPayTotal = vaultPayFee + vaultPayExchange;

  const annualTransfers = frequency * 12;
  const annualSavings = (westernUnionTotal - vaultPayTotal) * annualTransfers;

  // Animation principale au scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          headerRef.current,
          inputsRef.current,
          wuCardRef.current,
          vpCardRef.current,
          savingsRef.current,
        ],
        { opacity: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // ═══════════════════════════════════════════════════════
      // TIMELINE PRINCIPALE - Déclenchée au scroll
      // ═══════════════════════════════════════════════════════

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 60%" : "top 50%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // ═══════════════════════════════════════════════════════
      // ACTE 1 : CONTEXTE - "Voyons vos données" (0-1s)
      // ═══════════════════════════════════════════════════════

      // 1.1 Header fade in
      tl.fromTo(
        headerRef.current,
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
        0,
      );

      // 1.2 Inputs apparaissent avec bounce subtil (contrôle)
      tl.fromTo(
        inputsRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.3)",
        },
        0.3,
      );

      // PAUSE (0.3s) - Temps de voir les inputs

      // ═══════════════════════════════════════════════════════
      // ACTE 2 : LA DOULEUR - Western Union (1.3-2.5s)
      // ═══════════════════════════════════════════════════════

      // 2.1 WU Card apparaît (avec léger shake = inconfort)
      tl.fromTo(
        wuCardRef.current,
        {
          opacity: 0,
          x: isMobile ? 0 : -50,
          y: isMobile ? 40 : 0,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        1.3,
      ).to(
        wuCardRef.current,
        {
          x: -3,
          duration: 0.05,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut",
        },
        1.8,
      );

      // 2.2 Frais WU apparaissent en cascade (accumulation = douleur)
      wuFeesRefs.current.forEach((fee, index) => {
        if (!fee) return;
        tl.fromTo(
          fee,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          1.6 + index * 0.15, // Stagger
        );
      });

      // ═══════════════════════════════════════════════════════
      // ACTE 3 : LE SOULAGEMENT - VaultPay (2.5-3.5s)
      // ═══════════════════════════════════════════════════════

      // 3.1 VP Card apparaît avec glow (solution = lumière)
      tl.fromTo(
        vpCardRef.current,
        {
          opacity: 0,
          x: isMobile ? 0 : 50,
          y: isMobile ? 40 : 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        },
        2.5,
      );

      // 3.2 Subtle glow effect (premium feel)
      tl.to(
        vpCardRef.current,
        {
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)",
          duration: 0.5,
          ease: "power2.inOut",
        },
        2.9,
      );

      // 3.3 Frais VP apparaissent rapidement (simplicité)
      vpFeesRefs.current.forEach((fee, index) => {
        if (!fee) return;
        tl.fromTo(
          fee,
          {
            opacity: 0,
            x: 20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          2.8 + index * 0.1, // Stagger plus rapide
        );
      });

      // ═══════════════════════════════════════════════════════
      // ACTE 4 : LA RÉVÉLATION - Économies (3.5-4.5s)
      // ═══════════════════════════════════════════════════════

      // 4.1 Savings box explose sur l'écran
      tl.fromTo(
        savingsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(2)",
        },
        3.5,
      );

      // 4.2 Double pulse sur le montant (WOW effect)
      const savingsAmount =
        savingsRef.current?.querySelector(".savings-amount");
      if (savingsAmount) {
        tl.to(
          savingsAmount,
          {
            scale: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 2,
            ease: "power2.inOut",
          },
          4,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Counter animation pour les montants (appelée au changement de valeur)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Animer le montant des économies
    const savingsAmount = savingsRef.current?.querySelector(".savings-amount");
    if (savingsAmount) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: annualSavings,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          savingsAmount.textContent = `$${Math.floor(obj.val).toLocaleString()}`;
        },
      });
    }
  }, [amount, frequency, annualSavings]);

  // Hover micro-interactions sur les inputs (desktop)
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const inputs = inputsRef.current?.querySelectorAll("input, select");
    inputs?.forEach((input) => {
      const handleFocus = () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleBlur = () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.2,
          ease: "power2.in",
        });
      };

      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);

      return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      };
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cost-breakdown"
      className="cost-section py-20 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div
            ref={headerRef}
            style={{ opacity: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
              Calculate Your Savings
            </h2>
            <p className="text-lg text-gray-600">
              Enter your transfer details to see how much you&apos;ll save with
              VaultPay.
            </p>
          </div>

          {/* Calculator Inputs */}
          <div
            ref={inputsRef}
            style={{ opacity: 0 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Amount per transfer
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="pl-8 h-12 w-full text-base font-semibold border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    min={50}
                    max={10000}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Times per month
                </label>
                <input
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="h-12 w-full text-base font-semibold border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all px-4"
                  min={1}
                  max={10}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Destination
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-12 w-full px-4 text-base font-semibold border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                >
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>Kenya</option>
                  <option>South Africa</option>
                  <option>Senegal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Western Union */}
            <div
              ref={wuCardRef}
              style={{ opacity: 0 }}
              className="comparison-card border-2 border-gray-200 rounded-2xl p-6"
            >
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-1">
                  Traditional providers
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  Western Union
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div
                  ref={(el) => {
                    wuFeesRefs.current[0] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">Transfer fee</span>
                  <span className="font-semibold">
                    ${westernUnionFee.toFixed(2)}
                  </span>
                </div>
                <div
                  ref={(el) => {
                    wuFeesRefs.current[1] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">Exchange markup</span>
                  <span className="font-semibold">
                    ${westernUnionExchange.toFixed(2)}
                  </span>
                </div>
                <div
                  ref={(el) => {
                    wuFeesRefs.current[2] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">Hidden fees</span>
                  <span className="font-semibold">
                    ${westernUnionHidden.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">
                  Cost per transfer
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-3">
                  ${westernUnionTotal.toFixed(2)}
                </div>
                <div className="text-xs text-gray-600">
                  ${(westernUnionTotal * annualTransfers).toFixed(0)}/year
                </div>
              </div>
            </div>

            {/* VaultPay */}
            <div
              ref={vpCardRef}
              style={{ opacity: 0 }}
              className="relative comparison-card:recommended border-2 border-[var(--vp-primary)] rounded-2xl p-6"
            >
              {/* Recommended badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className=" bg-[var(--vp-primary)] text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Recommended
                </div>
              </div>

              <div className="text-center mb-6 mt-2">
                <div className="text-sm text-emerald-600 mb-1 font-medium">
                  FINTRAC Licensed
                </div>
                <div className="text-2xl font-bold text-gray-900">VaultPay</div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div
                  ref={(el) => {
                    vpFeesRefs.current[0] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">Transfer fee</span>
                  <span className="font-semibold">
                    ${vaultPayFee.toFixed(2)}
                  </span>
                </div>
                <div
                  ref={(el) => {
                    vpFeesRefs.current[1] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">Exchange markup</span>
                  <span className="font-semibold">
                    ${vaultPayExchange.toFixed(2)}
                  </span>
                </div>
                <div
                  ref={(el) => {
                    vpFeesRefs.current[2] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">Hidden fees</span>
                  <span className="font-semibold">$0.00</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">
                  Cost per transfer
                </div>
                <div className="text-3xl font-bold text-[var(--vp-primary)] mb-3">
                  ${vaultPayTotal.toFixed(2)}
                </div>
                <div className="text-xs text-gray-600">
                  ${(vaultPayTotal * annualTransfers).toFixed(0)}/year
                </div>
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          <div
            ref={savingsRef}
            style={{ opacity: 0 }}
            className="text-center bg-gray-50 border border-gray-200 rounded-2xl p-8"
          >
            <div className="text-sm text-gray-600 mb-2">
              Your annual savings with VaultPay
            </div>
            <div className="savings-amount text-5xl md:text-6xl font-bold text-[var(--vp-primary)] mb-3">
              ${annualSavings.toFixed(0)}
            </div>
            <p className="text-sm text-gray-600">
              Based on {annualTransfers} transfers per year
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
