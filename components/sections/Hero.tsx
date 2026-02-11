"use client";

import { useCallback } from "react";
import { ArrowRight, ChevronDown, FileText, CircleCheck } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="hero" className={styles.section}>
      <div className={`deco-circle ${styles.decoCircle1}`} />
      <div className={`deco-circle ${styles.decoCircle2}`} />

      <div className={styles.shape1} />
      <div className={styles.shape2} />
      <div className={styles.shape3} />

      <div className={styles.inner}>
        <div className={styles.textContent}>
          <div className={styles.labelWrap}>
            <span className="section-label">Segurança do Trabalho</span>
          </div>
          <h1 className={styles.heading}>
            Proteja sua empresa.{" "}
            <span className={styles.headingAccent}>Valorize sua equipe.</span>
          </h1>
          <p className={styles.description}>
            Consultoria especializada em SST com atendimento personalizado. PGR,
            PCMSO, laudos e treinamentos com a qualidade e agilidade que sua
            empresa merece.
          </p>
          <div className={styles.ctas}>
            <button className="btn-whatsapp" onClick={() => scrollTo("contact")}>
              <WhatsAppIcon />
              Fale pelo WhatsApp
            </button>
            <button className="btn-outline" onClick={() => scrollTo("services")}>
              Nossos Serviços
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.outerCircle}>
            <div className={styles.innerCircle}>
              <div className={styles.innerContent}>
                <div className={styles.shield}>🛡️</div>
                <div className={styles.sstLabel}>SST</div>
                <div className={styles.sstSub}>ESPECIALISTA</div>
              </div>
            </div>

            <div className={styles.badgePgr}>
              <div className={styles.badgeIconGreen}>
                <FileText size={32} strokeWidth={1.5} />
              </div>
              <div>
                <div className={styles.badgeTitle}>PGR</div>
                <div className={styles.badgeSub}>Atualizado</div>
              </div>
            </div>

            <div className={styles.badgeConforme}>
              <div className={styles.badgeIconWhatsapp}>
                <CircleCheck size={20} strokeWidth={2} />
              </div>
              <div>
                <div className={styles.badgeTitle}>Conforme</div>
                <div className={styles.badgeSub}>NR-01</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Explorar</div>
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
