"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className={styles.section}>
      <div className={`deco-circle ${styles.decoCircle}`} />

      <div className={styles.inner}>
        <Reveal>
          <span className="section-label">Depoimentos</span>
          <h2 className={styles.heading}>
            O que dizem nossos{" "}
            <span className={styles.headingAccent}>clientes</span>
          </h2>
        </Reveal>

        <div className={styles.cardsWrap}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card ${i === activeTestimonial ? styles.cardActive : styles.cardInactive}`}
            >
              <div className={styles.stars}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <blockquote className={styles.blockquote}>
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className={styles.authorName}>{t.name}</div>
              <div className={styles.authorRole}>{t.role}</div>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={i === activeTestimonial ? styles.dotActive : styles.dot}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
