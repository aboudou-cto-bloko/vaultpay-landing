"use client";

import { useEffect, useRef } from "react";
import { TrendingUp, Users, Globe2, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: TrendingUp,
    value: "$12M",
    numericValue: 12,
    suffix: "M",
    prefix: "$",
    label: "Sent by beta users",
  },
  {
    icon: Users,
    value: "8,200+",
    numericValue: 8200,
    suffix: "+",
    prefix: "",
    label: "Already waiting",
  },
  {
    icon: Globe2,
    value: "18",
    numericValue: 18,
    suffix: "",
    prefix: "",
    label: "Countries across Africa",
  },
  {
    icon: ShieldCheck,
    value: "FINTRAC",
    numericValue: null,
    label: "Licensed & regulated",
  },
];

export function ProofBar() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      statsRefs.current.forEach((stat, index) => {
        if (!stat) return;

        const icon = stat.querySelector<HTMLElement>(".stat-icon-wrapper");
        const valueEl = stat.querySelector<HTMLElement>(".stat-value");
        const label = stat.querySelector<HTMLElement>(".stat-label");
        const divider = stat.querySelector<HTMLElement>(".stat-divider");

        if (!icon || !valueEl || !label) return;

        // Timeline dédiée à cet élément
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stat,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Icon
        tl.from(icon, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        })
          // Value
          .from(
            valueEl,
            { opacity: 0, y: 20, duration: 0.4, ease: "power2.out" },
            "-=0.2",
          )
          // Label
          .from(
            label,
            { opacity: 0, y: 10, duration: 0.3, ease: "power2.out" },
            "-=0.3",
          );

        // Counter only if numericValue exists
        const statData = stats[index];
        if (statData.numericValue !== null) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: statData.numericValue,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              const formatted =
                statData.numericValue >= 1000
                  ? Math.floor(obj.val).toLocaleString()
                  : Math.floor(obj.val);
              valueEl.textContent = `${statData.prefix ?? ""}${formatted}${statData.suffix ?? ""}`;
            },
          });
        }

        // Divider
        if (divider) {
          tl.from(
            divider,
            { height: 0, opacity: 0, duration: 0.4, ease: "power2.out" },
            "-=0.4",
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="proofbar-section relative py-8 md:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isLast = index === stats.length - 1;
            return (
              <div
                key={index}
                ref={(el) => {
                  statsRefs.current[index] = el; // assignation
                }}
                className="relative group text-center"
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div
                    className="stat-icon-wrapper w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: "var(--vp-bg-subtle)",
                      border: "1px solid var(--vp-border-subtle)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--vp-bg-muted)";
                      e.currentTarget.style.borderColor =
                        "var(--vp-border-default)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--vp-bg-subtle)";
                      e.currentTarget.style.borderColor =
                        "var(--vp-border-subtle)";
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "var(--vp-primary)" }}
                    />
                  </div>
                </div>

                {/* Value */}
                <div
                  className="stat-value text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--vp-text-primary)",
                  }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <p
                  className="stat-label text-sm"
                  style={{ color: "var(--vp-text-secondary)" }}
                >
                  {stat.label}
                </p>

                {/* Vertical Divider - Desktop only, pas sur le dernier */}
                {!isLast && (
                  <div
                    className="stat-divider hidden md:block absolute top-1/2 right-0 w-px h-16 -translate-y-1/2"
                    style={{ backgroundColor: "var(--vp-border-subtle)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
