import { createFileRoute } from "@tanstack/react-router";
import { Award, BrainCircuit, HeartHandshake, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { NewsCarousel } from "@/components/site/NewsCarousel";
import { ContactFooter } from "@/components/site/ContactFooter";
import { useHomeViewModel } from "@/viewmodels/home.viewmodel";
import { ScrollReveal } from "@/components/ui/ScrollReveal"; // Wait, filename was ScrollReveal.tsx. Let's check imports.
import auraLogo from "@/assets/aura-logo.jpg";
import centelhaLogo from "@/assets/centelha-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NextiBR — Inovação e Tecnologia | Projeto AURA" },
      {
        name: "description",
        content:
          "NextiBR é uma startup de tecnologia do Piauí, selecionada no Programa Centelha PI com o AURA, plataforma de IA para análise de emoções em textos em português.",
      },
      { property: "og:title", content: "NextiBR — Inovação e Tecnologia | Projeto AURA" },
      {
        property: "og:description",
        content:
          "Startup piauiense de inteligência artificial. Conheça o AURA, plataforma de compreensão e análise emocional de textos em português.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: Rocket,
    title: "Inovação",
    text: "Pesquisa aplicada e desenvolvimento de produtos digitais que resolvem problemas reais com tecnologia de ponta.",
  },
  {
    icon: BrainCircuit,
    title: "Tecnologia",
    text: "Modelos de inteligência artificial e processamento de linguagem natural adaptados ao português brasileiro.",
  },
  {
    icon: HeartHandshake,
    title: "Impacto Social",
    text: "Soluções que ampliam acesso, cuidado e qualidade no atendimento a pessoas em saúde, educação e serviços.",
  },
];

function Index() {
  const { aboutTitle, aboutText } = useHomeViewModel();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div
          aria-hidden
          className="gradient-brand pointer-events-none absolute -right-32 -top-40 size-[520px] rounded-full opacity-20 blur-3xl"
        />
        <div
          aria-hidden
          className="gradient-brand pointer-events-none absolute -bottom-48 -left-40 size-[420px] rounded-full opacity-10 blur-3xl"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <ScrollReveal delayMs={100}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-green">
                <Sparkles className="size-3.5 text-brand-yellow" />
                Inovação e Tecnologia
              </span>
            </ScrollReveal>
            
            <ScrollReveal delayMs={200}>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
                Inteligência artificial que <span className="text-gradient-brand">entende emoções</span> em
                português
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={350}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                A NextiBR é uma startup de tecnologia do Piauí que desenvolve o AURA, plataforma de
                compreensão e análise afetiva de textos — transformando linguagem em insights que
                aproximam pessoas e organizações.
              </p>
            </ScrollReveal>

            <ScrollReveal delayMs={500}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="gradient-brand rounded-full px-7 font-semibold shadow-card">
                  <a href="#aura">Conheça o AURA</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-navy/20 px-7 font-semibold text-navy">
                  <a href="#contato">Fale com a gente</a>
                </Button>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delayMs={300} className="relative">
            <div className="gradient-brand absolute inset-0 -rotate-3 rounded-[2.5rem] opacity-90" />
            <div className="relative rounded-[2.25rem] bg-background p-8 shadow-elevated">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Análise afetiva</p>
              <p className="mt-4 rounded-2xl bg-secondary p-4 text-sm text-navy">
                “O atendimento demorou, mas a equipe foi muito atenciosa comigo.”
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Gratidão", value: 72, color: "var(--brand-green)" },
                  { label: "Frustração", value: 38, color: "var(--brand-yellow)" },
                  { label: "Confiança", value: 61, color: "var(--navy)" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs font-semibold text-navy">
                      <span>{row.label}</span>
                      <span>{row.value}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${row.value}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Centelha */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <ScrollReveal delayMs={100}>
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-brand-green/20 bg-secondary/60 p-8 shadow-card sm:flex-row sm:items-center">
            <div className="gradient-brand flex size-14 shrink-0 items-center justify-center rounded-2xl">
              <Award className="size-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-navy sm:text-2xl">
                Selecionada no Programa Centelha PI
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                A NextiBR foi aprovada no Centelha PI, programa de estímulo à criação e aceleração de
                startups inovadoras no Piauí, com o projeto AURA.
              </p>
            </div>
            <div className="flex h-20 w-48 shrink-0 items-center justify-center rounded-2xl bg-background p-3 shadow-card border border-navy/5">
              <img src={centelhaLogo} alt="Logo Centelha PI" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Sobre</span>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
              {aboutTitle}
            </h2>
            <p className="mt-4 whitespace-pre-line text-lg text-muted-foreground">
              {aboutText}
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p, index) => (
            <ScrollReveal key={p.title} delayMs={index * 150} className="h-full">
              <div className="rounded-2xl bg-card p-7 shadow-card h-full flex flex-col">
                <div className="gradient-brand mb-5 flex size-12 items-center justify-center rounded-xl">
                  <p.icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.text}</p>
                <div className="gradient-brand mt-5 h-1 w-12 rounded-full" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* AURA */}
      <section id="aura" className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 rounded-3xl bg-card p-8 shadow-elevated sm:p-12 lg:grid-cols-[320px_1fr]">
            <ScrollReveal direction="right" className="mx-auto w-full max-w-[280px] rounded-2xl bg-background p-6 shadow-card">
              <img src={auraLogo} alt="Logo do projeto AURA" className="w-full rounded-xl" />
            </ScrollReveal>
            <div>
              <ScrollReveal direction="left">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                  Projeto aprovado no Centelha PI
                </span>
                <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
                  AURA — Affective Understanding &amp; Response Analysis
                </h2>
                <p className="mt-4 text-muted-foreground">
                  O AURA é a plataforma de inteligência artificial da NextiBR para compreensão e análise
                  de emoções em textos em português. A partir de mensagens, avaliações e conversas, o
                  AURA identifica sentimentos, intensidade e nuances afetivas, entregando leituras
                  claras sobre como as pessoas realmente se sentem.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Classificação emocional de textos em português",
                    "Análise de tom, intensidade e nuance",
                    "Painéis de insights para times e gestores",
                    "Integração via API com sistemas existentes",
                  ].map((item, index) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-navy">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-yellow" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <NewsCarousel />
      <ContactFooter />
    </div>
  );
}
