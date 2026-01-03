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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 60%" : "top 50%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Header fade in
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0,
      );

      // Inputs apparaissent
      tl.fromTo(
        inputsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)" },
        0.3,
      );

      // WU Card avec shake
      tl.fromTo(
        wuCardRef.current,
        {
          opacity: 0,
          x: isMobile ? 0 : -50,
          y: isMobile ? 40 : 0,
        },
        { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" },
        1.3,
      ).to(
        wuCardRef.current,
        { x: -3, duration: 0.05, repeat: 3, yoyo: true, ease: "power1.inOut" },
        1.8,
      );

      // Frais WU en cascade
      wuFeesRefs.current.forEach((fee, index) => {
        if (!fee) return;
        tl.fromTo(
          fee,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          1.6 + index * 0.15,
        );
      });

      // VP Card avec glow
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

      // Frais VP rapidement
      vpFeesRefs.current.forEach((fee, index) => {
        if (!fee) return;
        tl.fromTo(
          fee,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
          2.8 + index * 0.1,
        );
      });

      // Savings explosion
      tl.fromTo(
        savingsRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(2)" },
        3.5,
      );

      // Double pulse sur le montant
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

  // Counter animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

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

  // Hover micro-interactions
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const inputs = inputsRef.current?.querySelectorAll("input, select");
    inputs?.forEach((input) => {
      const handleFocus = () => {
        gsap.to(input, { scale: 1.02, duration: 0.2, ease: "power2.out" });
      };

      const handleBlur = () => {
        gsap.to(input, { scale: 1, duration: 0.2, ease: "power2.in" });
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
      className="cost-section py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div
            ref={headerRef}
            style={{ opacity: 0 }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "var(--vp-text-primary)",
              }}
            >
              Calculate Your Savings
            </h2>
            <p
              className="text-lg"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              Enter your transfer details to see how much you&apos;ll save with
              VaultPay.
            </p>
          </div>

          {/* Calculator Inputs */}
          <div
            ref={inputsRef}
            style={{ opacity: 0 }}
            className="rounded-2xl p-6 mb-8 glass-card"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--vp-text-secondary)" }}
                >
                  Amount per transfer
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--vp-text-secondary)" }}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="pl-8 h-12 w-full text-base font-semibold rounded-xl outline-none transition-all"
                    style={{
                      backgroundColor: "var(--vp-surface)",
                      color: "var(--vp-text-primary)",
                      border: "2px solid var(--vp-border-default)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--vp-primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px var(--vp-primary-light)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--vp-border-default)";
                      e.target.style.boxShadow = "none";
                    }}
                    min={50}
                    max={10000}
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--vp-text-secondary)" }}
                >
                  Times per month
                </label>
                <input
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="h-12 w-full text-base font-semibold rounded-xl outline-none transition-all px-4"
                  style={{
                    backgroundColor: "var(--vp-surface)",
                    color: "var(--vp-text-primary)",
                    border: "2px solid var(--vp-border-default)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--vp-primary)";
                    e.target.style.boxShadow =
                      "0 0 0 3px var(--vp-primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--vp-border-default)";
                    e.target.style.boxShadow = "none";
                  }}
                  min={1}
                  max={10}
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--vp-text-secondary)" }}
                >
                  Destination
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-12 w-full px-4 text-base font-semibold rounded-xl outline-none transition-all"
                  style={{
                    backgroundColor: "var(--vp-surface)",
                    color: "var(--vp-text-primary)",
                    border: "2px solid var(--vp-border-default)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--vp-primary)";
                    e.target.style.boxShadow =
                      "0 0 0 3px var(--vp-primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--vp-border-default)";
                    e.target.style.boxShadow = "none";
                  }}
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
              className="comparison-card rounded-2xl p-6"
            >
              <div className="text-center mb-6">
                <div
                  className="text-sm mb-1"
                  style={{ color: "var(--vp-text-tertiary)" }}
                >
                  Traditional providers
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--vp-text-primary)",
                  }}
                >
                  Western Union
                </div>
              </div>

              <div
                className="space-y-3 mb-6 pb-6"
                style={{ borderBottom: "1px solid var(--vp-border-subtle)" }}
              >
                <div
                  ref={(el) => {
                    wuFeesRefs.current[0] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span style={{ color: "var(--vp-text-secondary)" }}>
                    Transfer fee
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--vp-text-primary)" }}
                  >
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
                  <span style={{ color: "var(--vp-text-secondary)" }}>
                    Exchange markup
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--vp-text-primary)" }}
                  >
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
                  <span style={{ color: "var(--vp-text-secondary)" }}>
                    Hidden fees
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--vp-text-primary)" }}
                  >
                    ${westernUnionHidden.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-sm mb-1"
                  style={{ color: "var(--vp-text-secondary)" }}
                >
                  Cost per transfer
                </div>
                <div
                  className="text-3xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--vp-text-primary)",
                  }}
                >
                  ${westernUnionTotal.toFixed(2)}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--vp-text-tertiary)" }}
                >
                  ${(westernUnionTotal * annualTransfers).toFixed(0)}/year
                </div>
              </div>
            </div>

            {/* VaultPay */}
            <div
              ref={vpCardRef}
              style={{ opacity: 0 }}
              className="relative comparison-card-recommended rounded-2xl p-6"
            >
              {/* Recommended badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div
                  className="px-4 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--vp-primary)",
                    color: "var(--vp-primary-foreground)",
                  }}
                >
                  Recommended
                </div>
              </div>

              <div className="text-center mb-6 mt-2">
                <div
                  className="text-sm mb-1 font-medium"
                  style={{ color: "var(--vp-success)" }}
                >
                  FINTRAC Licensed
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--vp-text-primary)",
                  }}
                >
                  VaultPay
                </div>
              </div>

              <div
                className="space-y-3 mb-6 pb-6"
                style={{ borderBottom: "1px solid var(--vp-border-subtle)" }}
              >
                <div
                  ref={(el) => {
                    vpFeesRefs.current[0] = el;
                  }}
                  style={{ opacity: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span style={{ color: "var(--vp-text-secondary)" }}>
                    Transfer fee
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--vp-text-primary)" }}
                  >
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
                  <span style={{ color: "var(--vp-text-secondary)" }}>
                    Exchange markup
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--vp-text-primary)" }}
                  >
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
                  <span style={{ color: "var(--vp-text-secondary)" }}>
                    Hidden fees
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--vp-text-primary)" }}
                  >
                    $0.00
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-sm mb-1"
                  style={{ color: "var(--vp-text-secondary)" }}
                >
                  Cost per transfer
                </div>
                <div
                  className="text-3xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--vp-primary)",
                  }}
                >
                  ${vaultPayTotal.toFixed(2)}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--vp-text-tertiary)" }}
                >
                  ${(vaultPayTotal * annualTransfers).toFixed(0)}/year
                </div>
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          <div
            ref={savingsRef}
            style={{ opacity: 0 }}
            className="text-center rounded-2xl p-8 glass-card"
          >
            <div
              className="text-sm mb-2"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              Your annual savings with VaultPay
            </div>
            <div
              className="savings-amount text-5xl md:text-6xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "var(--vp-primary)",
              }}
            >
              ${annualSavings.toFixed(0)}
            </div>
            <p
              className="text-sm"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              Based on {annualTransfers} transfers per year
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
