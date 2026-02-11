"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <nav className={styles.nav} data-solid={String(navSolid)}>
        <div className={styles.inner}>
          <div className={styles.logo} onClick={() => scrollTo("hero")}>
            <div className={styles.logoIcon}>JR</div>
            <span className={styles.logoText}>
              Jessica<span className={styles.logoAccent}>Rose</span>
            </span>
          </div>

          <div className="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="nav-link"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button
              className={`btn-primary ${styles.navCta}`}
              onClick={() => scrollTo("contact")}
            >
              Solicitar Orçamento
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`nav-link ${styles.mobileNavLink}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button
              className={`btn-primary ${styles.mobileCta}`}
              onClick={() => scrollTo("contact")}
            >
              Solicitar Orçamento
            </button>
          </div>
        </>
      )}
    </>
  );
}
