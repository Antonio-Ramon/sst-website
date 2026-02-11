export interface NavLink {
  label: string;
  id: string;
}

export interface Stat {
  num: number;
  suffix: string;
  label: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  sub: string;
}

export const navLinks: NavLink[] = [
  { label: "Início", id: "hero" },
  { label: "Sobre", id: "about" },
  { label: "Serviços", id: "services" },
  { label: "Depoimentos", id: "testimonials" },
  { label: "FAQ", id: "faq" },
  { label: "Contato", id: "contact" },
];

export const stats: Stat[] = [
  { num: 500, suffix: "+", label: "Empresas Atendidas" },
  { num: 8, suffix: "+", label: "Anos de Experiência" },
  { num: 2000, suffix: "+", label: "Documentos Elaborados" },
  { num: 100, suffix: "%", label: "Conformidade Legal" },
];

export const contactInfo: ContactInfo[] = [
  { icon: "Phone", label: "(27) 99999-0000", sub: "WhatsApp" },
  { icon: "Mail", label: "contato@jessicarose.com", sub: "E-mail" },
  { icon: "MapPin", label: "Vitória — ES", sub: "Atendimento presencial e remoto" },
];

export const aboutFeatures: string[] = [
  "Atendimento personalizado para cada segmento",
  "Documentação digital organizada e acessível",
  "Suporte contínuo e acompanhamento pós-entrega",
  "Agilidade na elaboração e entrega de documentos",
];
