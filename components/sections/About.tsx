import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { aboutFeatures } from "@/data/navigation";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.photoWrap}>
          <div className={styles.photoOuter}>
            <Image
              src="/jessica-rose.jpeg"
              alt="Jessica Rose — Técnica em Segurança do Trabalho"
              fill
              className={styles.photo}
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
            <div className={styles.photoOverlay}>
              <div className={styles.name}>Jessica Rose</div>
              <div className={styles.role}>Técnica em Segurança do Trabalho</div>
              <div className={styles.badges}>
                <div className={styles.badge}>CREA Ativo</div>
                <div className={styles.badge}>NR Certified</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className={styles.textContent}>
          <Reveal>
            <span className="section-label">Sobre</span>
            <h2 className={styles.heading}>
              Compromisso com a{" "}
              <span className={styles.headingAccent}>segurança</span> e a{" "}
              <span className={styles.headingAccent}>saúde</span> da sua equipe
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.description}>
              Com mais de 8 anos de experiência em Segurança e Saúde do
              Trabalho, ofereço soluções completas e personalizadas para
              empresas que valorizam seus colaboradores e buscam conformidade com
              as Normas Regulamentadoras.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.descriptionLast}>
              Meu diferencial é o atendimento humanizado e técnico, com foco em
              prevenção de riscos, redução de custos com afastamentos e total
              adequação legal da sua empresa.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className={styles.checkList}>
              {aboutFeatures.map((item, i) => (
                <div key={i} className={styles.checkItem}>
                  <span className={styles.checkIcon}>
                    <CircleCheck size={20} />
                  </span>
                  <span className={styles.checkText}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
