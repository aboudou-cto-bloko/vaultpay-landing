"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface InspectionOutlineProps {
  /**
   * Ref de l'élément à tracer (FIXED: accepte null)
   */
  targetRef: React.RefObject<HTMLElement | null>;

  /**
   * Couleur du contour
   */
  color?: string;

  /**
   * Épaisseur de la ligne
   */
  strokeWidth?: number;

  /**
   * Animation type
   */
  animation?: "draw" | "fade" | "pulse";

  /**
   * Délai avant animation (ms)
   */
  delay?: number;

  /**
   * Prolonger les lignes jusqu'aux bords de la page (effet grille)
   */
  extendLines?: boolean;

  /**
   * Z-index (utilise une valeur basse pour passer derrière le header)
   */
  zIndex?: number;
}

export function InspectionOutline({
  targetRef,
  color = "rgba(16, 185, 129, 0.2)",
  strokeWidth = 1.5,
  animation = "draw",
  delay = 0,
  extendLines = true,
  zIndex = 1,
}: InspectionOutlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!targetRef.current || !containerRef.current || !linesRef.current)
      return;

    const updatePosition = () => {
      const target = targetRef.current;
      const container = containerRef.current;
      if (!target || !container) return;

      const rect = target.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // Position absolue de l'élément dans la page
      const top = rect.top + scrollTop;
      const left = rect.left + scrollLeft;
      const width = rect.width;
      const height = rect.height;
      const right = left + width;
      const bottom = top + height;

      // Le SVG couvre toute la page
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "100%";
      container.style.height = "100vh";
      container.style.pointerEvents = "none";
      container.style.zIndex = zIndex.toString();

      // Convertir positions en coordonnées viewport
      const viewportTop = rect.top;
      const viewportLeft = rect.left;
      const viewportRight = viewportLeft + width;
      const viewportBottom = viewportTop + height;

      const lines = linesRef.current;
      if (!lines) return;

      // Clear previous lines
      lines.innerHTML = "";

      if (extendLines) {
        // GRILLE COMPLÈTE - lignes qui traversent toute la page

        // Ligne verticale GAUCHE (traverse toute la hauteur)
        const leftLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        leftLine.setAttribute("x1", viewportLeft.toString());
        leftLine.setAttribute("y1", "0");
        leftLine.setAttribute("x2", viewportLeft.toString());
        leftLine.setAttribute("y2", "100%");
        leftLine.setAttribute("stroke", color);
        leftLine.setAttribute("stroke-width", strokeWidth.toString());
        leftLine.setAttribute("vector-effect", "non-scaling-stroke");
        leftLine.classList.add("grid-line", "vertical");
        lines.appendChild(leftLine);

        // Ligne verticale DROITE (traverse toute la hauteur)
        const rightLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        rightLine.setAttribute("x1", viewportRight.toString());
        rightLine.setAttribute("y1", "0");
        rightLine.setAttribute("x2", viewportRight.toString());
        rightLine.setAttribute("y2", "100%");
        rightLine.setAttribute("stroke", color);
        rightLine.setAttribute("stroke-width", strokeWidth.toString());
        rightLine.setAttribute("vector-effect", "non-scaling-stroke");
        rightLine.classList.add("grid-line", "vertical");
        lines.appendChild(rightLine);

        // Ligne horizontale TOP (traverse toute la largeur)
        const topLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        topLine.setAttribute("x1", "0");
        topLine.setAttribute("y1", viewportTop.toString());
        topLine.setAttribute("x2", "100%");
        topLine.setAttribute("y2", viewportTop.toString());
        topLine.setAttribute("stroke", color);
        topLine.setAttribute("stroke-width", strokeWidth.toString());
        topLine.setAttribute("vector-effect", "non-scaling-stroke");
        topLine.classList.add("grid-line", "horizontal");
        lines.appendChild(topLine);

        // Ligne horizontale BOTTOM (traverse toute la largeur)
        const bottomLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        bottomLine.setAttribute("x1", "0");
        bottomLine.setAttribute("y1", viewportBottom.toString());
        bottomLine.setAttribute("x2", "100%");
        bottomLine.setAttribute("y2", viewportBottom.toString());
        bottomLine.setAttribute("stroke", color);
        bottomLine.setAttribute("stroke-width", strokeWidth.toString());
        bottomLine.setAttribute("vector-effect", "non-scaling-stroke");
        bottomLine.classList.add("grid-line", "horizontal");
        lines.appendChild(bottomLine);
      } else {
        // RECTANGLE SIMPLE (ancien comportement)
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );
        rect.setAttribute("x", viewportLeft.toString());
        rect.setAttribute("y", viewportTop.toString());
        rect.setAttribute("width", width.toString());
        rect.setAttribute("height", height.toString());
        rect.setAttribute("fill", "none");
        rect.setAttribute("stroke", color);
        rect.setAttribute("stroke-width", strokeWidth.toString());
        rect.setAttribute("vector-effect", "non-scaling-stroke");
        lines.appendChild(rect);
      }
    };

    // Initial update
    updatePosition();

    // Update on resize/scroll
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    // Animation
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      const allLines = linesRef.current?.querySelectorAll(".grid-line");

      if (animation === "draw" && allLines) {
        gsap.fromTo(
          allLines,
          {
            strokeDasharray: 3000,
            strokeDashoffset: 3000,
            opacity: 0,
          },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
            stagger: 0.1, // Lignes apparaissent une par une
            delay: delay / 1000,
            scrollTrigger: {
              trigger: targetRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      } else if (animation === "fade" && allLines) {
        gsap.fromTo(
          allLines,
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
      } else if (animation === "pulse" && allLines) {
        gsap.fromTo(
          allLines,
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

        gsap.to(allLines, {
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
  }, [targetRef, color, strokeWidth, animation, delay, extendLines, zIndex]);

  return (
    <div ref={containerRef} className="inspection-grid">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <g ref={linesRef} />
      </svg>
    </div>
  );
}
