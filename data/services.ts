export interface Service {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
}

export const services: Service[] = [
  {
    icon: "FileText",
    title: "PGR",
    subtitle: "Programa de Gerenciamento de Riscos",
    desc: "Elaboração completa do PGR conforme NR-01, com inventário de riscos e plano de ação personalizado para sua empresa.",
  },
  {
    icon: "ClipboardCheck",
    title: "PCMSO",
    subtitle: "Programa de Controle Médico",
    desc: "Desenvolvimento do programa de saúde ocupacional integrado ao PGR, garantindo a saúde dos seus colaboradores.",
  },
  {
    icon: "Shield",
    title: "LTCAT",
    subtitle: "Laudo Técnico das Condições Ambientais",
    desc: "Laudos técnicos para fins previdenciários, com avaliações quantitativas e qualitativas dos agentes de risco.",
  },
  {
    icon: "HardHat",
    title: "PPP",
    subtitle: "Perfil Profissiográfico Previdenciário",
    desc: "Elaboração do PPP para todos os colaboradores, documento essencial para aposentadoria especial.",
  },
  {
    icon: "Users",
    title: "Treinamentos NR",
    subtitle: "Capacitação e Reciclagem",
    desc: "Treinamentos obrigatórios em NRs, CIPA, combate a incêndio, trabalho em altura e espaço confinado.",
  },
  {
    icon: "Award",
    title: "Laudos e Perícias",
    subtitle: "Documentação Especializada",
    desc: "Laudos de insalubridade, periculosidade e ergonômicos. Assistência técnica em perícias trabalhistas.",
  },
];
