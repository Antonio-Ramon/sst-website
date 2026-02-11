import { Phone, Mail, MapPin, Instagram, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { contactInfo } from "@/data/navigation";
import styles from "./Contact.module.css";

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Mail,
  MapPin,
};

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={`deco-circle ${styles.decoCircle}`} />

      <div className={styles.inner}>
        <Reveal>
          <span className="section-label">Contato</span>
          <h2 className={styles.heading}>
            Pronta para cuidar da{" "}
            <span className={styles.headingAccent}>segurança</span> da sua
            empresa
          </h2>
          <p className={styles.subtitle}>
            Entre em contato para um diagnóstico gratuito. Vamos avaliar as
            necessidades da sua empresa e encontrar a melhor solução.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className={styles.infoGrid}>
            {contactInfo.map((info, i) => {
              const Icon = iconMap[info.icon];
              return (
                <div key={i} className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    {Icon && <Icon size={20} strokeWidth={1.5} />}
                  </div>
                  <div className={styles.infoLabel}>{info.label}</div>
                  <div className={styles.infoSub}>{info.sub}</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <button className={`btn-whatsapp ${styles.btnLarge}`}>
            <WhatsAppIcon />
            Solicitar Orçamento Gratuito
          </button>
        </Reveal>

        <Reveal delay={0.35}>
          <div className={styles.socialRow}>
            <button className={styles.socialBtn}>
              <Instagram size={20} strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
