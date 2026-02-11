"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./FaqItem.module.css";

interface FaqItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function FaqItem({ q, a, isOpen, onClick }: FaqItemProps) {
  const contentRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className={styles.item}>
      <button onClick={onClick} className={styles.button}>
        {q}
        <span className={isOpen ? styles.chevronOpen : styles.chevron}>
          <ChevronDown size={20} />
        </span>
      </button>
      <div
        className={isOpen ? styles.contentOpen : styles.content}
        style={{
          maxHeight: isOpen
            ? `${contentRef.current?.scrollHeight || 200}px`
            : "0",
        }}
      >
        <p ref={contentRef} className={styles.answer}>
          {a}
        </p>
      </div>
    </div>
  );
}
