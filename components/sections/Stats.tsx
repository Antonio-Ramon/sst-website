import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { stats } from "@/data/navigation";
import styles from "./Stats.module.css";

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <Reveal key={i} delay={i * 0.1} className="stat-item">
            <div className="stat-number">
              <Counter target={stat.num} suffix={stat.suffix} />
            </div>
            <div className={styles.label}>{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
