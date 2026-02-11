export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
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
