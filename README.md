# Jessica Rose — Segurança do Trabalho

Site institucional para consultoria especializada em Segurança e Saúde do Trabalho (SST), voltado para micro e pequenas empresas.

## Visão Geral

Landing page completa com seções de apresentação, serviços, depoimentos, FAQ e contato. Foco em conversão via WhatsApp e solicitação de orçamento.

### Seções

- **Hero** — Apresentação principal com animações flutuantes e CTAs
- **Stats** — Números e métricas de resultado
- **About** — Sobre a profissional, com foto e credenciais
- **Services** — Catálogo de serviços (PGR, PCMSO, laudos, treinamentos)
- **Testimonials** — Depoimentos de clientes com carrossel
- **FAQ** — Perguntas frequentes com accordion
- **Contact** — Informações de contato e redes sociais
- **Footer** — Rodapé institucional

## Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI:** React 19, CSS Modules, Lucide Icons
- **Tipografia:** Lato (via `next/font`)
- **Linguagem:** TypeScript

## Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#105372` | Navy — botões, CTAs, headings |
| `--color-primary-light` | `#44b4c0` | Teal — acentos, destaques |
| `--color-sage` | `#5a9e87` | Verde sálvia — badges de segurança |
| `--color-secondary` | `#5c80a0` | Azul aço — suporte |
| `--color-neutral` | `#c9c4bc` | Cinza quente — elementos neutros |
| `--color-cream` | `#f2efeb` | Background geral |

## Estrutura do Projeto

```
app/
├── globals.css          # Design tokens, animações, estilos globais
├── layout.tsx           # Layout raiz (font, metadata)
├── page.tsx             # Composição das seções
└── page.module.css

components/
├── sections/            # Seções da landing page
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   ├── Faq.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── WhatsAppFloat.tsx
└── ui/                  # Componentes reutilizáveis

data/                    # Dados estáticos (navegação, serviços, FAQ)
hooks/                   # Custom hooks
public/                  # Imagens e assets estáticos
```

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Servir build local
npm start
```

## Lint

```bash
npm run lint
```
