"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

const directionClassMap = {
  up: styles.dirUp,
  down: styles.dirDown,
  left: styles.dirLeft,
  right: styles.dirRight,
  none: styles.dirNone,
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: RevealProps) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${styles.base} ${directionClassMap[direction]} ${inView ? styles.visible : styles.hidden} ${className}`}
      style={{ "--delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
