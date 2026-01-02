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
    numericValue: null, // Pas de counter pour texte
    label: "Licensed & regulated",
  },
];

export function ProofBar() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      statsRefs.current.forEach((stat, index) => {
        if (!stat) return;

        const icon = stat.querySelector<HTMLElement>(".stat-icon-wrapper");
        const valueEl = stat.querySelector<HTMLElement>(".stat-value");
        const label = stat.querySelector<HTMLElement>(".stat-label");
        const divider = stat.querySelector<HTMLElement>(".stat-divider");

        if (!icon || !valueEl || !label) return;

        tl.from(
          icon,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          index * 0.15,
        ).from(
          valueEl,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        );

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

        tl.from(
          label,
          {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3",
        );

        if (divider) {
          tl.from(
            divider,
            {
              height: 0,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.4",
          );
        }
      });

      // Hover interactions (desktop only)
      if (window.innerWidth >= 768) {
        statsRefs.current.forEach((stat) => {
          if (!stat) return;

          const icon = stat.querySelector<HTMLElement>(".stat-icon-wrapper");
          if (!icon) return;

          const onEnter = () => {
            gsap.to(icon, {
              scale: 1.1,
              rotate: 5,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(stat, {
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const onLeave = () => {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.3,
              ease: "power2.in",
            });
            gsap.to(stat, {
              y: 0,
              duration: 0.3,
              ease: "power2.in",
            });
          };

          stat.addEventListener("mouseenter", onEnter);
          stat.addEventListener("mouseleave", onLeave);

          ScrollTrigger.addEventListener("refresh", () => {
            stat.removeEventListener("mouseenter", onEnter);
            stat.removeEventListener("mouseleave", onLeave);
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 bg-white border-y border-gray-200"
    >
      <div className="vp-container proofbar-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isLast = index === stats.length - 1;
            return (
              <div
                key={index}
                ref={(el) => {
                  statsRefs.current[index] = el;
                }}
                className="relative group text-center"
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className="stat-icon-wrapper w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-[var(--vp-primary)]" />
                  </div>
                </div>

                {/* Value */}
                <div className="stat-value vp-h2 font-bold text-foreground mb-1">
                  {stat.value}
                </div>

                {/* Label */}
                <p className="stat-label vp-body-sm text-muted-foreground">
                  {stat.label}
                </p>

                {/* Vertical Divider - Desktop only, not on last item */}
                {!isLast && (
                  <div className="stat-divider hidden md:block absolute top-1/2 right-0 w-px h-16 bg-gray-200 -translate-y-1/2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
