"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import FaqItem from "@/components/ui/FaqItem";
import { faqs } from "@/data/faqs";
import styles from "./Faq.module.css";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Reveal>
            <span className="section-label">Dúvidas Frequentes</span>
            <h2 className={styles.heading}>
              Perguntas{" "}
              <span className={styles.headingAccent}>frequentes</span>
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className={styles.listBorder}>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
