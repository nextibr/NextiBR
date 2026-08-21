import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05, // Trigger when 5% of the element is in view
        rootMargin: "0px 0px -40px 0px", // Trigger slightly before it fully rolls in
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getDirectionClasses = () => {
    if (isVisible) return "opacity-100 translate-x-0 translate-y-0 scale-100";
    
    switch (direction) {
      case "up":
        return "opacity-0 translate-y-12";
      case "down":
        return "opacity-0 -translate-y-12";
      case "left":
        return "opacity-0 translate-x-12";
      case "right":
        return "opacity-0 -translate-x-12";
      case "fade":
      default:
        return "opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transform transition-all duration-700 ease-out ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
