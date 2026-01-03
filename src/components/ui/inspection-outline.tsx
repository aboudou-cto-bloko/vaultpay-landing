"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface InspectionOutlineProps {
  /**
   * Ref de l'élément à tracer
   */
  targetRef: React.RefObject<HTMLElement | null>;

  /**
   * Couleur du contour (rgba recommandé)
   */
  color?: string;

  /**
   * Épaisseur de la ligne
   */
  strokeWidth?: number;

  /**
   * Animation type
   * "draw" = lignes se dessinent
   * "fade" = apparition simple
   * "pulse" = pulse continu
   */
  animation?: "draw" | "fade" | "pulse";

  /**
   * Délai avant animation (ms)
   */
  delay?: number;

  /**
   * Corner radius (pour suivre les border-radius de l'élément)
   */
  borderRadius?: number;

  /**
   * Padding offset (espace entre l'élément et le contour)
   */
  offset?: number;
}

export function InspectionOutline({
  targetRef,
  color = "rgba(16, 185, 129, 0.2)",
  strokeWidth = 1.5,
  animation = "draw",
  delay = 0,
  borderRadius = 0,
  offset = 0,
}: InspectionOutlineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!targetRef.current || !svgRef.current || !pathRef.current) return;

    const updatePosition = () => {
      const target = targetRef.current;
      const svg = svgRef.current;
      if (!target || !svg) return;

      const rect = target.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // Position absolue de l'élément dans la page
      const top = rect.top + scrollTop - offset;
      const left = rect.left + scrollLeft - offset;
      const width = rect.width + offset * 2;
      const height = rect.height + offset * 2;

      // Positionner le SVG
      svg.style.position = "absolute";
      svg.style.top = `${top}px`;
      svg.style.left = `${left}px`;
      svg.style.width = `${width}px`;
      svg.style.height = `${height}px`;
      svg.style.pointerEvents = "none";
      svg.style.overflow = "visible";

      // Créer le path avec border-radius
      const path = pathRef.current;
      if (!path) return;

      const r = borderRadius;
      const w = width;
      const h = height;

      // Path avec coins arrondis (suit les border-radius)
      const d = `
        M ${r} 0
        L ${w - r} 0
        Q ${w} 0 ${w} ${r}
        L ${w} ${h - r}
        Q ${w} ${h} ${w - r} ${h}
        L ${r} ${h}
        Q 0 ${h} 0 ${h - r}
        L 0 ${r}
        Q 0 0 ${r} 0
        Z
      `;

      path.setAttribute("d", d);
    };

    // Initial positioning
    updatePosition();

    // Update on resize/scroll
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    // Animation
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(pathRef.current, { strokeDashoffset: 0, opacity: 1 });
    } else {
      const path = pathRef.current;
      const length = path.getTotalLength();

      if (animation === "draw") {
        gsap.fromTo(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
            delay: delay / 1000,
            scrollTrigger: {
              trigger: targetRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      } else if (animation === "fade") {
        gsap.fromTo(
          path,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: delay / 1000,
            scrollTrigger: {
              trigger: targetRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      } else if (animation === "pulse") {
        gsap.fromTo(
          path,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: delay / 1000,
            scrollTrigger: {
              trigger: targetRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.to(path, {
          opacity: 0.4,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay / 1000 + 0.8,
        });
      }
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [targetRef, color, strokeWidth, animation, delay, borderRadius, offset]);

  return (
    <svg
      ref={svgRef}
      className="inspection-outline"
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
