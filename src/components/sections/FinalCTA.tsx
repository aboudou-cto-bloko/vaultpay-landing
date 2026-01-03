"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, CheckCircle2, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const scarcityRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const benefitsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialProofRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const wave1Ref = useRef<HTMLDivElement>(null);
  const wave2Ref = useRef<HTMLDivElement>(null);
  const wave3Ref = useRef<HTMLDivElement>(null);

  const currentWaitlist = 8247;
  const maxSpots = 10000;
  const spotsRemaining = maxSpots - currentWaitlist;
  const percentageFilled = Math.round((currentWaitlist / maxSpots) * 100);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log("Email submitted:", email);
    }, 1500);
  };

  // Gradient wave animation
  useEffect(() => {
    if (!wave1Ref.current || !wave2Ref.current || !wave3Ref.current) return;

    gsap.to(wave1Ref.current, {
      x: "5%",
      y: "-3%",
      scale: 1.05,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(wave2Ref.current, {
      x: "-4%",
      y: "-5%",
      scale: 1.08,
      duration: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.5,
    });

    gsap.to(wave3Ref.current, {
      x: "3%",
      y: "-4%",
      scale: 1.06,
      duration: 12,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1,
    });
  }, []);

  // Animation principale
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          scarcityRef.current,
          headlineRef.current,
          subheadlineRef.current,
          progressContainerRef.current,
          formCardRef.current,
          ...benefitsRefs.current,
          socialProofRef.current,
        ],
        { opacity: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        scarcityRef.current,
        { y: -30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" },
        0,
      );

      tl.to(
        scarcityRef.current,
        { x: -3, duration: 0.05, repeat: 3, yoyo: true },
        0.5,
      );

      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        0.8,
      );

      tl.fromTo(
        subheadlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        1.2,
      );

      tl.fromTo(
        progressContainerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        1.6,
      );

      tl.fromTo(
        progressBarRef.current,
        { width: "0%" },
        { width: `${percentageFilled}%`, duration: 1.5, ease: "power2.out" },
        2,
      );

      tl.fromTo(
        formCardRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        2.8,
      );

      benefitsRefs.current.forEach((benefit, index) => {
        if (!benefit) return;

        tl.fromTo(
          benefit,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          3.2 + index * 0.15,
        );

        const checkIcon = benefit.querySelector("svg");
        if (checkIcon) {
          tl.fromTo(
            checkIcon,
            { scale: 0, rotation: -90 },
            { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" },
            3.2 + index * 0.15,
          );
        }
      });

      tl.fromTo(
        socialProofRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        3.7,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [percentageFilled]);

  // Success animation
  useEffect(() => {
    if (isSubmitted && formCardRef.current) {
      gsap.fromTo(
        formCardRef.current,
        { scale: 1 },
        {
          scale: 1.03,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
      );
    }
  }, [isSubmitted]);

  // Magnetic button
  useEffect(() => {
    const button = buttonRef.current;
    if (!button || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
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
    <>
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      <section
        id="final-cta"
        ref={sectionRef}
        className="relative overflow-hidden min-h-[650px] flex items-center"
      >
        {/* Background base - INVERSÉ */}
        {/* Light mode: dark gray-900 | Dark mode: light gray-100 */}
        <div className="absolute inset-0 bg-gray-900 dark:bg-gray-100" />

        {/* Animated gradient waves - INVERSÉ */}
        {/* Light mode: vibrant sur dark | Dark mode: très subtil sur light */}
        <div
          ref={wave1Ref}
          className="absolute inset-0 opacity-30 dark:opacity-[0.03]"
          style={{
            background: `radial-gradient(ellipse 140% 60% at 50% 100%, var(--vp-primary) 0%, transparent 60%)`,
            filter: "blur(60px)",
          }}
        />

        <div
          ref={wave2Ref}
          className="absolute inset-0 opacity-25 dark:opacity-[0.025]"
          style={{
            background: `radial-gradient(ellipse 130% 50% at 45% 100%, var(--vp-secondary) 0%, transparent 55%)`,
            filter: "blur(80px)",
          }}
        />

        <div
          ref={wave3Ref}
          className="absolute inset-0 opacity-20 dark:opacity-[0.02]"
          style={{
            background: `radial-gradient(ellipse 120% 45% at 55% 100%, var(--vp-info) 0%, transparent 50%)`,
            filter: "blur(90px)",
          }}
        />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Scarcity Alert */}
            <div
              ref={scarcityRef}
              className="mb-8 flex justify-center"
              style={{ opacity: 0 }}
            >
              <div className="inline-flex items-center gap-2 backdrop-blur-md rounded-full px-5 py-2.5 bg-red-500/10 dark:bg-red-400/10 border border-red-500/30 dark:border-red-400/30">
                <AlertCircle className="w-4 h-4 animate-pulse text-red-400 dark:text-red-300" />
                <span className="font-semibold text-sm text-red-400 dark:text-red-300">
                  Only {spotsRemaining.toLocaleString()} spots remaining
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center mb-10">
              <h2
                ref={headlineRef}
                className="text-5xl md:text-6xl font-bold mb-3 drop-shadow-lg text-white dark:text-gray-900"
                style={{
                  opacity: 0,
                  fontFamily: "var(--font-outfit)",
                }}
              >
                10,000 Spots.
              </h2>
              <p
                ref={subheadlineRef}
                className="text-2xl md:text-3xl font-normal mb-6 drop-shadow-md text-white/90 dark:text-gray-900/90"
                style={{ opacity: 0 }}
              >
                March 2026 Launch.
              </p>

              {/* Progress Bar - INVERSÉ */}
              <div
                ref={progressContainerRef}
                className="max-w-md mx-auto mb-8"
                style={{ opacity: 0 }}
              >
                {/* Container: light on dark bg (light mode), dark on light bg (dark mode) */}
                <div className="h-2.5 backdrop-blur-sm rounded-full overflow-hidden border bg-white/20 dark:bg-gray-900/20 border-white/30 dark:border-gray-900/30">
                  {/* Progress fill: white on dark (light mode), dark on light (dark mode) */}
                  <div
                    ref={progressBarRef}
                    className="h-full rounded-full relative overflow-hidden shadow-lg bg-white dark:bg-gray-900"
                    style={{ width: "0%" }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-gray-800/40 to-transparent"
                      style={{ animation: "shine 2s ease-in-out infinite" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            {!isSubmitted ? (
              <div
                ref={formCardRef}
                className="rounded-2xl p-8 backdrop-blur-sm bg-white dark:bg-gray-900 shadow-2xl"
                style={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full md:flex-1">
                      <label
                        htmlFor="email-input"
                        className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                      >
                        Email address
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 px-5 text-base rounded-xl transition-all duration-200 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700"
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--vp-primary)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(16, 185, 129, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.className =
                            "w-full h-14 px-5 text-base rounded-xl transition-all duration-200 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div className="sm:pt-7">
                      <button
                        ref={buttonRef}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto font-semibold h-14 px-8 rounded-xl text-base whitespace-nowrap transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: "var(--vp-primary)",
                          color: "white",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor =
                              "var(--vp-primary-light)";
                            e.currentTarget.style.boxShadow =
                              "0 10px 25px -5px rgba(16, 185, 129, 0.3)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--vp-primary)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {isSubmitting ? "Joining..." : "Get Early Access"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {[
                    "No credit card required",
                    "Early access when we launch",
                  ].map((benefit, idx) => (
                    <div
                      key={idx}
                      ref={(el) => {
                        benefitsRefs.current[idx] = el;
                      }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                      style={{ opacity: 0 }}
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <p
                  ref={socialProofRef}
                  className="text-xs text-center text-gray-500 dark:text-gray-400"
                  style={{ opacity: 0 }}
                >
                  Join 8,200+ people waiting · FINTRAC-licensed
                </p>
              </div>
            ) : (
              <div
                ref={formCardRef}
                className="rounded-2xl p-8 text-center backdrop-blur-sm bg-white dark:bg-gray-900 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-emerald-50 dark:bg-emerald-900/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>

                <h3
                  className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  You&apos;re on the list!
                </h3>

                <p className="text-base mb-6 text-gray-600 dark:text-gray-300">
                  We&apos;ll email you when we launch in March 2026.
                </p>

                <div className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700">
                  <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    You&apos;re #{(currentWaitlist + 1).toLocaleString()} on the
                    waitlist
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
