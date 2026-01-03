"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    name: "Amara Okonkwo",
    role: "Small Business Owner",
    location: "Toronto, Canada",
    initials: "AO",
    quote:
      "I was sending $800 to my family in Lagos every month and paying nearly $70 in fees with Western Union. With VaultPay, I pay less than $12. That's over $700 saved per year — money that now goes to my kids' education instead of bank fees.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emmanuel Mensah",
    role: "Software Engineer",
    location: "Vancouver, Canada",
    initials: "EM",
    quote:
      "Speed was everything when my brother needed emergency funds in Accra. VaultPay transferred $500 in under 45 seconds. Traditional banks would have taken 3-5 days. The real-time tracking gave me peace of mind that my money was moving instantly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Fatima Diallo",
    role: "Healthcare Professional",
    location: "Montreal, Canada",
    initials: "FD",
    quote:
      "As someone sending money to elderly parents, security is non-negotiable. Knowing VaultPay is FINTRAC-licensed and uses bank-grade encryption means I sleep well at night. Plus, their 24/7 support actually responds — unlike the big names who ghost you for days.",
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isVisible) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isVisible]);

  // GSAP Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headlineRef.current && sublineRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        headerTl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        );

        headerTl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );
      }

      // Dots animation
      if (dotsRef.current) {
        gsap.fromTo(
          dotsRef.current.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dotsRef.current,
              start: "top 90%",
            },
          },
        );
      }

      // Social proof animation
      if (socialProofRef.current) {
        gsap.fromTo(
          socialProofRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: socialProofRef.current,
              start: "top 90%",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Card transition animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const currentCard = cardsRef.current[currentIndex];
    if (!currentCard) return;

    const stars = currentCard.querySelectorAll(".star");
    const quote = currentCard.querySelector(".quote");
    const avatar = currentCard.querySelector(".avatar");
    const authorInfo = currentCard.querySelector(".author-info");

    const tl = gsap.timeline();

    tl.fromTo(
      currentCard,
      { opacity: 0, x: 100, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" },
    );

    tl.fromTo(
      stars,
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(2)",
      },
      "-=0.3",
    );

    tl.fromTo(
      quote,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.2",
    );

    tl.fromTo(
      avatar,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)" },
      "-=0.4",
    );

    tl.fromTo(
      authorInfo,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3",
    );
  }, [currentIndex]);

  // Active dot pulse
  useEffect(() => {
    if (!dotsRef.current) return;

    const activeDot = dotsRef.current.children[currentIndex] as HTMLElement;
    if (!activeDot) return;

    gsap.fromTo(
      activeDot,
      { scale: 1 },
      { scale: 1.2, duration: 0.3, ease: "back.out(3)", yoyo: true, repeat: 1 },
    );
  }, [currentIndex]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-24"
      style={{ backgroundColor: "var(--vp-bg-base)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-12">
            <h2
              ref={headlineRef}
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{
                opacity: 0,
                fontFamily: "var(--font-outfit)",
                color: "var(--vp-text-primary)",
              }}
            >
              Trusted by Thousands
            </h2>
            <p
              ref={sublineRef}
              className="text-lg"
              style={{
                opacity: 0,
                color: "var(--vp-text-secondary)",
              }}
            >
              Real people, real savings.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0"
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                  >
                    <div
                      className="rounded-2xl p-8 md:p-10 mx-2"
                      style={{
                        backgroundColor: "var(--vp-surface)",
                        border: "1px solid var(--vp-border-default)",
                        boxShadow: "var(--vp-shadow-md)",
                      }}
                    >
                      {/* Stars Rating */}
                      <div className="flex gap-1 mb-6 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="star w-5 h-5"
                            style={{
                              fill: "var(--vp-warning)",
                              color: "var(--vp-warning)",
                            }}
                          />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <blockquote className="quote text-center mb-8">
                        <p
                          className="text-xl leading-relaxed font-normal"
                          style={{ color: "var(--vp-text-primary)" }}
                        >
                          &quot;{testimonial.quote}&quot;
                        </p>
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <div
                          className="avatar w-14 h-14 rounded-full flex items-center justify-center mb-3"
                          style={{
                            backgroundColor: "var(--vp-bg-subtle)",
                            border: "1px solid var(--vp-border-subtle)",
                          }}
                        >
                          <span
                            className="text-base font-semibold"
                            style={{
                              fontFamily: "var(--font-outfit)",
                              color: "var(--vp-text-secondary)",
                            }}
                          >
                            {testimonial.initials}
                          </span>
                        </div>

                        {/* Name & Details */}
                        <div className="author-info text-center">
                          <div
                            className="font-semibold mb-0.5"
                            style={{ color: "var(--vp-text-primary)" }}
                          >
                            {testimonial.name}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: "var(--vp-text-secondary)" }}
                          >
                            {testimonial.role}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: "var(--vp-text-tertiary)" }}
                          >
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div
            ref={dotsRef}
            className="flex items-center justify-center gap-2 mt-8"
          >
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: index === currentIndex ? "2rem" : "0.5rem",
                  backgroundColor:
                    index === currentIndex
                      ? "var(--vp-primary)"
                      : "var(--vp-border-default)",
                }}
              />
            ))}
          </div>

          {/* Social Proof Stats */}
          <div
            ref={socialProofRef}
            className="mt-12 text-center"
            style={{ opacity: 0 }}
          >
            <p
              className="text-sm"
              style={{ color: "var(--vp-text-secondary)" }}
            >
              Join{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--vp-text-primary)" }}
              >
                8,200+ people
              </span>{" "}
              already on the waitlist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
