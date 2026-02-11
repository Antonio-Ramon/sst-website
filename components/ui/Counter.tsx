"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function Counter({
  target,
  suffix = "",
  duration = 2000,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count}
      {suffix}
    </span>
  );
}
