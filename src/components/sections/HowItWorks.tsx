"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "1",
    title: "Download App",
    description: "Available on iOS and Android. Quick 30-second setup.",
    icon: Smartphone,
  },
  {
    number: "2",
    title: "Verify Identity",
    description: "Government ID verification in under 3 minutes.",
    icon: ShieldCheck,
  },
  {
    number: "3",
    title: "Add Recipient",
    description: "Enter recipient details. Save favorites for next time.",
    icon: CheckCircle2,
  },
  {
    number: "4",
    title: "Send Money",
    description: "Transfer completes in under 60 seconds. Track in real-time.",
    icon: Zap,
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(-1);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<HTMLDivElement | null>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const securityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          headlineRef.current,
          subheadlineRef.current,
          ...stepsRefs.current,
          securityRef.current,
        ],
        { opacity: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      /* ───────────────── Header ───────────────── */

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
      );

      headerTl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );

      /* ───────────────── Path ───────────────── */

      gsap.fromTo(
        pathRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        },
      );

      /* ───────────────── Steps ───────────────── */

      stepsRefs.current.forEach((stepRef, idx) => {
        if (!stepRef) return;

        const circle = stepRef.querySelector<HTMLDivElement>(".step-circle");
        const iconWrapper = stepRef.querySelector<HTMLDivElement>(".step-icon");
        const icon = iconWrapper?.querySelector<SVGSVGElement>("svg");
        const title = stepRef.querySelector<HTMLHeadingElement>(".step-title");
        const desc = stepRef.querySelector<HTMLParagraphElement>(".step-desc");

        if (!circle || !iconWrapper || !icon || !title || !desc) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stepRef,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveStep(idx),
            onLeaveBack: () => setActiveStep(idx - 1),
          },
        });

        tl.fromTo(
          circle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
        )
          .fromTo(
            iconWrapper,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.2",
          )
          .fromTo(
            icon,
            { rotation: -90 },
            { rotation: 0, duration: 0.6, ease: "back.out(1.5)" },
            "-=0.5",
          )
          .fromTo(
            title,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            "-=0.3",
          )
          .fromTo(
            desc,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          );

        gsap.to(stepRef, {
          opacity: 0.4,
          scrollTrigger: {
            trigger: stepRef,
            start: "top 10%",
            end: "top -10%",
            scrub: 0.5,
          },
        });
      });

      /* ───────────────── Security ───────────────── */

      const securityIcon =
        securityRef.current?.querySelector<HTMLDivElement>(".security-icon");
      const securityTitle =
        securityRef.current?.querySelector<HTMLHeadingElement>(
          ".security-title",
        );
      const securityDesc =
        securityRef.current?.querySelector<HTMLParagraphElement>(
          ".security-desc",
        );

      if (!securityIcon || !securityTitle || !securityDesc) return;

      const securityTl = gsap.timeline({
        scrollTrigger: {
          trigger: securityRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      securityTl
        .fromTo(
          securityRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        )
        .fromTo(
          securityIcon,
          { rotation: -180, scale: 0 },
          { rotation: 0, scale: 1, duration: 0.8, ease: "back.out(2)" },
          "-=0.6",
        )
        .fromTo(
          securityTitle,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.5",
        )
        .fromTo(
          securityDesc,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        )
        .to(
          securityIcon,
          {
            scale: 1.05,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          "+=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="howitworks-section py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2
              ref={headlineRef}
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "var(--vp-text-primary)",
              }}
            >
              4 Steps. Under 5 Minutes.
            </h2>
            <p
              ref={subheadlineRef}
              className="text-lg mt-3"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              From download to first transfer, you&apos;ll be up and running
              fast.
            </p>
          </div>

          <div className="relative">
            {/* Background path */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: "var(--vp-border-default)" }}
            />

            {/* Active path (animated) */}
            <div
              ref={pathRef}
              className="absolute left-6 top-0 w-0.5 origin-top"
              style={{
                background: "var(--vp-gradient-primary)",
                height: "100%",
              }}
            />

            <div className="space-y-16">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep >= idx;
                const isFilled = activeStep > idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      stepsRefs.current[idx] = el;
                    }}
                    className="relative pl-20"
                  >
                    {/* Circle number */}
                    <div
                      className="step-circle absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                      style={{
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: isFilled
                          ? "var(--vp-primary)"
                          : "var(--vp-border-default)",
                        backgroundColor: isFilled
                          ? "var(--vp-primary)"
                          : "var(--vp-surface)",
                      }}
                    >
                      <span
                        className="font-bold text-lg"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: isFilled
                            ? "var(--vp-primary-foreground)"
                            : "var(--vp-text-tertiary)",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Icon wrapper */}
                    <div
                      className="step-icon w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all"
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: isActive
                          ? "var(--vp-primary)"
                          : "var(--vp-border-subtle)",
                        backgroundColor: isActive
                          ? "var(--vp-success-bg)"
                          : "var(--vp-bg-subtle)",
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{
                          color: isActive
                            ? "var(--vp-primary)"
                            : "var(--vp-text-tertiary)",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <h3
                      className="step-title text-2xl font-bold mb-2"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "var(--vp-text-primary)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="step-desc max-w-md"
                      style={{ color: "var(--vp-text-secondary)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Card */}
          <div
            ref={securityRef}
            className="mt-20 rounded-2xl p-8 text-center glass-card"
          >
            <div
              className="security-icon w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "var(--vp-primary)" }}
            >
              <ShieldCheck
                className="w-6 h-6"
                style={{ color: "var(--vp-primary-foreground)" }}
              />
            </div>
            <h3
              className="security-title text-2xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "var(--vp-text-primary)",
              }}
            >
              Bank-Grade Security
            </h3>
            <p
              className="security-desc max-w-2xl mx-auto"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              Fully licensed and regulated by FINTRAC in Canada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
