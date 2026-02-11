import { useState, useEffect, useRef, useCallback } from "react";

// ─── Intersection Observer Hook ───
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); obs.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isInView];
}

// ─── Animated Counter ───
function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Reveal Wrapper ───
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Icons (inline SVG) ───
const Icons = {
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  FileText: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  ),
  ClipboardCheck: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
  ),
  HardHat: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 15V6a2 2 0 0 1 4 0v9"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>
  ),
  Users: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Award: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  WhatsApp: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  ),
};

// ─── Services Data ───
const services = [
  {
    icon: Icons.FileText,
    title: "PGR",
    subtitle: "Programa de Gerenciamento de Riscos",
    desc: "Elaboração completa do PGR conforme NR-01, com inventário de riscos e plano de ação personalizado para sua empresa.",
  },
  {
    icon: Icons.ClipboardCheck,
    title: "PCMSO",
    subtitle: "Programa de Controle Médico",
    desc: "Desenvolvimento do programa de saúde ocupacional integrado ao PGR, garantindo a saúde dos seus colaboradores.",
  },
  {
    icon: Icons.Shield,
    title: "LTCAT",
    subtitle: "Laudo Técnico das Condições Ambientais",
    desc: "Laudos técnicos para fins previdenciários, com avaliações quantitativas e qualitativas dos agentes de risco.",
  },
  {
    icon: Icons.HardHat,
    title: "PPP",
    subtitle: "Perfil Profissiográfico Previdenciário",
    desc: "Elaboração do PPP para todos os colaboradores, documento essencial para aposentadoria especial.",
  },
  {
    icon: Icons.Users,
    title: "Treinamentos NR",
    subtitle: "Capacitação e Reciclagem",
    desc: "Treinamentos obrigatórios em NRs, CIPA, combate a incêndio, trabalho em altura e espaço confinado.",
  },
  {
    icon: Icons.Award,
    title: "Laudos e Perícias",
    subtitle: "Documentação Especializada",
    desc: "Laudos de insalubridade, periculosidade e ergonômicos. Assistência técnica em perícias trabalhistas.",
  },
];

const testimonials = [
  {
    name: "Carlos Mendonça",
    role: "Diretor — Construtora Alvorada",
    text: "A Jessica transformou completamente nossa gestão de SST. Documentação impecável e atendimento que realmente entende as necessidades do canteiro de obras.",
  },
  {
    name: "Marina Silveira",
    role: "RH — Grupo Tecnoval",
    text: "Profissionalismo exemplar. Todos os nossos PGRs e treinamentos foram entregues no prazo, com qualidade técnica que nos deu total segurança nas fiscalizações.",
  },
  {
    name: "Roberto Farias",
    role: "Sócio — RF Logística",
    text: "Desde que contratamos a Jessica, zeramos as notificações do MTE. Ela tem um olhar preventivo que faz toda diferença para a operação.",
  },
];

const faqs = [
  {
    q: "O que é o PGR e por que minha empresa precisa?",
    a: "O PGR (Programa de Gerenciamento de Riscos) é obrigatório conforme a NR-01 para todas as empresas com empregados. Ele identifica perigos, avalia riscos ocupacionais e define medidas de prevenção, protegendo seus colaboradores e sua empresa de penalidades legais.",
  },
  {
    q: "Qual a diferença entre PGR e PPRA?",
    a: "O PPRA foi substituído pelo PGR desde janeiro de 2022. O PGR é mais abrangente, englobando todos os riscos ocupacionais (físicos, químicos, biológicos, ergonômicos e de acidentes), enquanto o PPRA focava apenas em riscos ambientais.",
  },
  {
    q: "Com que frequência os documentos precisam ser atualizados?",
    a: "O PGR deve ser revisado a cada dois anos ou sempre que houver mudanças nos processos de trabalho. O PCMSO é anual. Já treinamentos como CIPA e NR-35 possuem prazos específicos de reciclagem conforme cada norma.",
  },
  {
    q: "Atende empresas de qualquer porte e segmento?",
    a: "Sim! Atendo desde MEIs e pequenas empresas até indústrias de grande porte, adaptando a documentação e os serviços à realidade e complexidade de cada negócio.",
  },
];

// ─── FAQ Accordion Item ───
function FaqItem({ q, a, isOpen, onClick }) {
  const contentRef = useRef(null);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(107,179,155,0.2)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Lato', sans-serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#0b0b0d",
          textAlign: "left",
          gap: "16px",
        }}
      >
        {q}
        <span
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            flexShrink: 0,
            color: "#6bb39b",
          }}
        >
          <Icons.ChevronDown />
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 200}px` : "0",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
          overflow: "hidden",
        }}
      >
        <p
          ref={contentRef}
          style={{
            margin: 0,
            paddingBottom: "24px",
            color: "#555",
            lineHeight: 1.7,
            fontSize: "1rem",
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───
export default function JessicaRoseSite() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setNavSolid(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navLinks = [
    { label: "Início", id: "hero" },
    { label: "Sobre", id: "about" },
    { label: "Serviços", id: "services" },
    { label: "Depoimentos", id: "testimonials" },
    { label: "FAQ", id: "faq" },
    { label: "Contato", id: "contact" },
  ];

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", color: "#0b0b0d", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f7f4e8; }
        ::-webkit-scrollbar-thumb { background: #6bb39b; border-radius: 4px; }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(107,179,155,0.4); }
          50% { box-shadow: 0 0 0 16px rgba(107,179,155,0); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes hero-text-reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; background: #6bb39b; color: #fff;
          border: none; border-radius: 60px; font-family: 'Lato', sans-serif;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none; letter-spacing: 0.02em;
        }
        .btn-primary:hover {
          background: #5a9e87; transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(107,179,155,0.35);
        }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; background: transparent; color: #6bb39b;
          border: 2px solid #6bb39b; border-radius: 60px; font-family: 'Lato', sans-serif;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none;
        }
        .btn-outline:hover {
          background: #6bb39b; color: #fff; transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(107,179,155,0.35);
        }
        .btn-whatsapp {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 18px 40px; background: #25d366; color: #fff;
          border: none; border-radius: 60px; font-family: 'Lato', sans-serif;
          font-size: 1.05rem; font-weight: 700; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none; animation: pulse-glow 2.5s infinite;
        }
        .btn-whatsapp:hover {
          background: #20bd5a; transform: translateY(-3px) scale(1.03);
          box-shadow: 0 16px 40px rgba(37,211,102,0.35);
        }

        .service-card {
          background: #fff; border-radius: 20px; padding: 40px 32px;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          border: 1px solid rgba(107,179,155,0.12); position: relative; overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #85e6c0, #6bb39b);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(107,179,155,0.15);
          border-color: rgba(107,179,155,0.3);
        }
        .service-card:hover::before { transform: scaleX(1); }

        .testimonial-card {
          transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
        }

        .nav-link {
          position: relative; color: inherit; text-decoration: none;
          font-weight: 600; font-size: 0.95rem; padding: 8px 0;
          transition: color 0.3s ease; cursor: pointer; background: none; border: none;
          font-family: 'Lato', sans-serif;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
          background: #6bb39b; transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover { color: #6bb39b; }
        .nav-link:hover::after { width: 100%; }

        .stat-item { text-align: center; }
        .stat-number {
          font-size: 3.2rem; font-weight: 900; color: #6bb39b;
          line-height: 1;
        }

        .section-label {
          display: inline-block; padding: 6px 20px; border-radius: 30px;
          background: rgba(133,230,192,0.15); color: #6bb39b;
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 16px;
        }

        /* Floating WhatsApp Button */
        .whatsapp-float {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          width: 60px; height: 60px; border-radius: 50%;
          background: #25d366; color: #fff; display: flex;
          align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(37,211,102,0.4);
          cursor: pointer; transition: all 0.3s ease;
          animation: pulse-glow 2.5s infinite; border: none;
        }
        .whatsapp-float:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 32px rgba(37,211,102,0.5);
        }

        /* Mobile menu overlay */
        .mobile-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(11,11,13,0.5); z-index: 998;
          backdrop-filter: blur(4px);
        }

        /* Decorative elements */
        .deco-circle {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(133,230,192,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .stat-number { font-size: 2.4rem; }
          .service-card { padding: 28px 24px; }
        }
      `}</style>

      {/* ═══ NAVIGATION ═══ */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: navSolid ? "12px 0" : "20px 0",
          background: navSolid ? "rgba(247,244,232,0.95)" : "transparent",
          backdropFilter: navSolid ? "blur(16px)" : "none",
          borderBottom: navSolid ? "1px solid rgba(107,179,155,0.12)" : "none",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <div style={{
              width: 40, height: 40, borderRadius: "12px",
              background: "linear-gradient(135deg, #85e6c0, #6bb39b)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 900, fontSize: "1.2rem",
            }}>
              JR
            </div>
            <span style={{ fontWeight: 900, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
              Jessica<span style={{ color: "#6bb39b" }}>Rose</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {navLinks.map((link) => (
              <button key={link.id} className="nav-link" onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            ))}
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.9rem" }} onClick={() => scrollTo("contact")}>
              Solicitar Orçamento
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#0b0b0d" }}
            className="mobile-toggle"
          >
            {menuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0, width: "280px",
            background: "#f7f4e8", zIndex: 999, padding: "80px 32px 32px",
            display: "flex", flexDirection: "column", gap: 24,
            animation: "slide-in-right 0.3s ease",
            boxShadow: "-8px 0 32px rgba(0,0,0,0.1)",
          }}>
            {navLinks.map((link) => (
              <button key={link.id} className="nav-link" onClick={() => scrollTo(link.id)} style={{ fontSize: "1.1rem" }}>
                {link.label}
              </button>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ marginTop: 16, justifyContent: "center" }}>
              Solicitar Orçamento
            </button>
          </div>
        </>
      )}

      {/* ═══ HERO SECTION ═══ */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center",
          background: `linear-gradient(160deg, #f7f4e8 0%, #daf3ea 40%, #f7f4e8 100%)`,
          position: "relative", overflow: "hidden",
          padding: "120px 24px 80px",
        }}
      >
        {/* Decorative shapes */}
        <div className="deco-circle" style={{ width: 500, height: 500, top: "-10%", right: "-8%", background: "radial-gradient(circle, rgba(133,230,192,0.18) 0%, transparent 70%)" }} />
        <div className="deco-circle" style={{ width: 300, height: 300, bottom: "5%", left: "-5%", background: "radial-gradient(circle, rgba(218,243,234,0.5) 0%, transparent 70%)" }} />

        {/* Animated geometric shapes */}
        <div style={{ position: "absolute", top: "15%", right: "18%", width: 60, height: 60, borderRadius: "16px", border: "2px solid rgba(133,230,192,0.3)", animation: "float 6s ease-in-out infinite", transform: "rotate(45deg)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "12%", width: 30, height: 30, borderRadius: "50%", background: "rgba(133,230,192,0.2)", animation: "float 4s ease-in-out infinite 1s" }} />
        <div style={{ position: "absolute", top: "35%", left: "8%", width: 20, height: 20, borderRadius: "50%", background: "rgba(107,179,155,0.15)", animation: "float 5s ease-in-out infinite 0.5s" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 520px", minWidth: 300 }}>
            <div style={{ animation: "hero-text-reveal 0.8s ease forwards" }}>
              <span className="section-label" style={{ marginBottom: 24 }}>
                Segurança do Trabalho
              </span>
            </div>
            <h1 style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900,
              lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24,
              animation: "hero-text-reveal 0.8s ease 0.15s forwards", opacity: 0,
            }}>
              Proteja sua empresa.{" "}
              <span style={{
                background: "linear-gradient(135deg, #6bb39b, #85e6c0)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Valorize sua equipe.
              </span>
            </h1>
            <p style={{
              fontSize: "1.2rem", lineHeight: 1.7, color: "#555", maxWidth: 520,
              marginBottom: 40,
              animation: "hero-text-reveal 0.8s ease 0.3s forwards", opacity: 0,
            }}>
              Consultoria especializada em SST com atendimento personalizado.
              PGR, PCMSO, laudos e treinamentos com a qualidade e agilidade que sua empresa merece.
            </p>
            <div style={{
              display: "flex", gap: 16, flexWrap: "wrap",
              animation: "hero-text-reveal 0.8s ease 0.45s forwards", opacity: 0,
            }}>
              <button className="btn-whatsapp" onClick={() => scrollTo("contact")}>
                <Icons.WhatsApp />
                Fale pelo WhatsApp
              </button>
              <button className="btn-outline" onClick={() => scrollTo("services")}>
                Nossos Serviços
                <Icons.ArrowRight />
              </button>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{
            flex: "1 1 380px", display: "flex", justifyContent: "center", alignItems: "center",
            minWidth: 300, position: "relative",
          }}>
            <div style={{
              width: 360, height: 360, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(133,230,192,0.25), rgba(218,243,234,0.4))",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              animation: "float 8s ease-in-out infinite",
            }}>
              <div style={{
                width: 280, height: 280, borderRadius: "50%",
                background: "linear-gradient(160deg, #85e6c0, #6bb39b)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 32px 80px rgba(107,179,155,0.3)",
              }}>
                <div style={{ textAlign: "center", color: "#fff" }}>
                  <div style={{ fontSize: "5rem", lineHeight: 1 }}>🛡️</div>
                  <div style={{ fontWeight: 900, fontSize: "1.1rem", marginTop: 12, letterSpacing: "0.05em" }}>SST</div>
                  <div style={{ fontWeight: 300, fontSize: "0.85rem", marginTop: 4 }}>ESPECIALISTA</div>
                </div>
              </div>

              {/* Floating badges */}
              <div style={{
                position: "absolute", top: "5%", right: "-5%",
                background: "#fff", borderRadius: "16px", padding: "14px 18px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                animation: "float 5s ease-in-out infinite 0.5s",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(133,230,192,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6bb39b" }}>
                  <Icons.FileText />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>PGR</div>
                  <div style={{ fontSize: "0.75rem", color: "#888" }}>Atualizado</div>
                </div>
              </div>

              <div style={{
                position: "absolute", bottom: "8%", left: "-10%",
                background: "#fff", borderRadius: "16px", padding: "14px 18px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                animation: "float 6s ease-in-out infinite 1s",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(37,211,102,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#25d366" }}>
                  <Icons.CheckCircle />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>Conforme</div>
                  <div style={{ fontSize: "0.75rem", color: "#888" }}>NR-01</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0.5, animation: "float 3s ease-in-out infinite",
        }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Explorar</div>
          <Icons.ChevronDown />
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{
        background: "#0b0b0d", padding: "52px 24px",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40,
        }}>
          {[
            { num: 500, suffix: "+", label: "Empresas Atendidas" },
            { num: 8, suffix: "+", label: "Anos de Experiência" },
            { num: 2000, suffix: "+", label: "Documentos Elaborados" },
            { num: 100, suffix: "%", label: "Conformidade Legal" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1} className="stat-item">
              <div className="stat-number">
                <Counter target={stat.num} suffix={stat.suffix} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 8, fontSize: "0.95rem", fontWeight: 400 }}>
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT SECTION ═══ */}
      <section id="about" style={{ padding: "100px 24px", background: "#f7f4e8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
          <Reveal style={{ flex: "1 1 400px", minWidth: 280 }}>
            <div style={{
              position: "relative", borderRadius: "24px", overflow: "hidden",
              background: "linear-gradient(160deg, #daf3ea, #85e6c0)",
              aspectRatio: "4/5", maxWidth: 420,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: "85%", height: "85%", borderRadius: "20px",
                background: "linear-gradient(160deg, rgba(255,255,255,0.3), rgba(107,179,155,0.2))",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{ fontSize: "4.5rem", marginBottom: 16 }}>👩‍💼</div>
                <div style={{ fontWeight: 900, fontSize: "1.5rem", color: "#0b0b0d" }}>Jessica Rose</div>
                <div style={{ fontWeight: 400, color: "#555", marginTop: 4, fontSize: "0.95rem" }}>Técnica em Segurança do Trabalho</div>
                <div style={{
                  marginTop: 16, display: "flex", gap: 12,
                }}>
                  <div style={{ padding: "6px 14px", background: "rgba(107,179,155,0.2)", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, color: "#4a8a72" }}>CREA Ativo</div>
                  <div style={{ padding: "6px 14px", background: "rgba(107,179,155,0.2)", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, color: "#4a8a72" }}>NR Certified</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div style={{ flex: "1 1 460px", minWidth: 300 }}>
            <Reveal>
              <span className="section-label">Sobre</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
                Compromisso com a{" "}
                <span style={{ color: "#6bb39b" }}>segurança</span> e a{" "}
                <span style={{ color: "#6bb39b" }}>saúde</span> da sua equipe
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#555", marginBottom: 20 }}>
                Com mais de 8 anos de experiência em Segurança e Saúde do Trabalho, ofereço soluções completas e personalizadas para empresas que valorizam seus colaboradores e buscam conformidade com as Normas Regulamentadoras.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#555", marginBottom: 32 }}>
                Meu diferencial é o atendimento humanizado e técnico, com foco em prevenção de riscos, redução de custos com afastamentos e total adequação legal da sua empresa.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Atendimento personalizado para cada segmento",
                  "Documentação digital organizada e acessível",
                  "Suporte contínuo e acompanhamento pós-entrega",
                  "Agilidade na elaboração e entrega de documentos",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: "#6bb39b", flexShrink: 0 }}><Icons.CheckCircle /></span>
                    <span style={{ fontSize: "1rem", color: "#333" }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES SECTION ═══ */}
      <section id="services" style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #fff 0%, #daf3ea 100%)",
        position: "relative",
      }}>
        <div className="deco-circle" style={{ width: 400, height: 400, top: "-10%", left: "-10%" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
            <Reveal>
              <span className="section-label">Serviços</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 16 }}>
                Soluções completas em{" "}
                <span style={{ color: "#6bb39b" }}>SST</span>
              </h2>
              <p style={{ color: "#666", fontSize: "1.05rem", lineHeight: 1.7 }}>
                Todos os documentos e serviços que sua empresa precisa para operar com segurança e em conformidade com a legislação.
              </p>
            </Reveal>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 28,
          }}>
            {services.map((svc, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="service-card">
                  <div style={{
                    width: 56, height: 56, borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(133,230,192,0.15), rgba(218,243,234,0.3))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#6bb39b", marginBottom: 20,
                  }}>
                    <svc.icon />
                  </div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: 4 }}>{svc.title}</h3>
                  <div style={{ color: "#6bb39b", fontSize: "0.85rem", fontWeight: 600, marginBottom: 12, letterSpacing: "0.02em" }}>
                    {svc.subtitle}
                  </div>
                  <p style={{ color: "#666", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {svc.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS SECTION ═══ */}
      <section id="testimonials" style={{
        padding: "100px 24px",
        background: "#0b0b0d", color: "#fff",
        position: "relative", overflow: "hidden",
      }}>
        <div className="deco-circle" style={{ width: 500, height: 500, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(107,179,155,0.08) 0%, transparent 70%)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <span className="section-label">Depoimentos</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 56 }}>
              O que dizem nossos{" "}
              <span style={{ color: "#85e6c0" }}>clientes</span>
            </h2>
          </Reveal>

          <div style={{ position: "relative", minHeight: 220 }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{
                  position: i === activeTestimonial ? "relative" : "absolute",
                  top: 0, left: 0, right: 0,
                  opacity: i === activeTestimonial ? 1 : 0,
                  transform: i === activeTestimonial ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  pointerEvents: i === activeTestimonial ? "auto" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 24 }}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: "#85e6c0" }}><Icons.Star /></span>
                  ))}
                </div>
                <blockquote style={{
                  fontSize: "1.2rem", lineHeight: 1.8, color: "rgba(255,255,255,0.85)",
                  fontStyle: "italic", marginBottom: 32, fontWeight: 300,
                  maxWidth: 640, margin: "0 auto 32px",
                }}>
                  "{t.text}"
                </blockquote>
                <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{t.name}</div>
                <div style={{ color: "#85e6c0", fontSize: "0.9rem", marginTop: 4 }}>{t.role}</div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 40 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? 32 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: i === activeTestimonial ? "#85e6c0" : "rgba(255,255,255,0.2)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section id="faq" style={{
        padding: "100px 24px", background: "#f7f4e8",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Reveal>
              <span className="section-label">Dúvidas Frequentes</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                Perguntas{" "}
                <span style={{ color: "#6bb39b" }}>frequentes</span>
              </h2>
            </Reveal>
          </div>

          <Reveal>
            <div style={{ borderTop: "1px solid rgba(107,179,155,0.2)" }}>
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

      {/* ═══ CTA / CONTACT SECTION ═══ */}
      <section id="contact" style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #daf3ea 0%, #f7f4e8 50%, #daf3ea 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div className="deco-circle" style={{ width: 400, height: 400, bottom: "-15%", right: "-10%" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <span className="section-label">Contato</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Pronta para cuidar da{" "}
              <span style={{ color: "#6bb39b" }}>segurança</span>{" "}
              da sua empresa
            </h2>
            <p style={{ color: "#555", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px" }}>
              Entre em contato para um diagnóstico gratuito. Vamos avaliar as necessidades da sua empresa e encontrar a melhor solução.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24, marginBottom: 48,
            }}>
              {[
                { icon: Icons.Phone, label: "(27) 99999-0000", sub: "WhatsApp" },
                { icon: Icons.Mail, label: "contato@jessicarose.com", sub: "E-mail" },
                { icon: Icons.MapPin, label: "Vitória — ES", sub: "Atendimento presencial e remoto" },
              ].map((info, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
                  borderRadius: "20px", padding: "28px 24px",
                  border: "1px solid rgba(107,179,155,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}>
                  <div style={{ color: "#6bb39b", marginBottom: 12, display: "flex", justifyContent: "center" }}>
                    <info.icon />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{info.label}</div>
                  <div style={{ color: "#888", fontSize: "0.85rem" }}>{info.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <button className="btn-whatsapp" style={{ fontSize: "1.15rem", padding: "20px 48px" }}>
              <Icons.WhatsApp />
              Solicitar Orçamento Gratuito
            </button>
          </Reveal>

          <Reveal delay={0.35}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
              <button style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(107,179,155,0.1)", border: "1px solid rgba(107,179,155,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#6bb39b", cursor: "pointer",
                transition: "all 0.3s ease",
              }}>
                <Icons.Instagram />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        background: "#0b0b0d", color: "rgba(255,255,255,0.5)",
        padding: "40px 24px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(135deg, #85e6c0, #6bb39b)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 900, fontSize: "0.85rem",
            }}>
              JR
            </div>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.7)" }}>
              Jessica Rose — Segurança do Trabalho
            </span>
          </div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
            © 2026 Jessica Rose. Todos os direitos reservados.
          </p>
          <p style={{ fontSize: "0.8rem", marginTop: 8 }}>
            Segurança e Saúde do Trabalho — PGR • PCMSO • LTCAT • PPP • Treinamentos NR
          </p>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <button className="whatsapp-float" style={{
        opacity: scrollY > 300 ? 1 : 0,
        transform: scrollY > 300 ? "scale(1)" : "scale(0.5)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: scrollY > 300 ? "auto" : "none",
      }}>
        <Icons.WhatsApp />
      </button>

      {/* ═══ RESPONSIVE STYLES ═══ */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
