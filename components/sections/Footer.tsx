import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>JR</div>
          <span className={styles.brandName}>
            Jessica Rose — Segurança do Trabalho
          </span>
        </div>
        <p className={styles.copyright}>
          © 2026 Jessica Rose. Todos os direitos reservados.
        </p>
        <p className={styles.services}>
          Segurança e Saúde do Trabalho — PGR • PCMSO • LTCAT • PPP •
          Treinamentos NR
        </p>
      </div>
    </footer>
  );
}
