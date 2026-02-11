import {
  FileText,
  ClipboardCheck,
  Shield,
  HardHat,
  Users,
  Award,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";
import styles from "./Services.module.css";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  ClipboardCheck,
  Shield,
  HardHat,
  Users,
  Award,
};

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={`deco-circle ${styles.decoCircle}`} />

      <div className={styles.inner}>
        <div className={styles.header}>
          <Reveal>
            <span className="section-label">Serviços</span>
            <h2 className={styles.heading}>
              Soluções completas em{" "}
              <span className={styles.headingAccent}>SST</span>
            </h2>
            <p className={styles.subtitle}>
              Todos os documentos e serviços que sua empresa precisa para operar
              com segurança e em conformidade com a legislação.
            </p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="service-card">
                  <div className={styles.iconWrap}>
                    {Icon && <Icon size={32} strokeWidth={1.5} />}
                  </div>
                  <h3 className={styles.cardTitle}>{svc.title}</h3>
                  <div className={styles.cardSubtitle}>{svc.subtitle}</div>
                  <p className={styles.cardDesc}>{svc.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
