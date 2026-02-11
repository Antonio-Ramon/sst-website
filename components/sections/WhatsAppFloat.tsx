"use client";

import { useState, useEffect } from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import styles from "./WhatsAppFloat.module.css";

export default function WhatsAppFloat() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`whatsapp-float ${scrollY > 300 ? styles.visible : styles.hidden}`}
    >
      <WhatsAppIcon />
    </button>
  );
}
