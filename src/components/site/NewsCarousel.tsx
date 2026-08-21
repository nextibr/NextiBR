import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useHomeViewModel } from "@/viewmodels/home.viewmodel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function formatDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function NewsCarousel() {
  const { news, loadingNews: isLoading } = useHomeViewModel();
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api || paused || news.length < 2) return;
    const id = setInterval(() => api.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [api, paused, news.length]);

  return (
    <section id="noticias" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Notícias</span>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">Acompanhe a NextiBR</h2>
            <p className="mt-3 text-muted-foreground">
              Novidades sobre o AURA, o Programa Centelha PI e o ecossistema de inovação do Piauí.
            </p>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-background shadow-card" />
            ))}
          </div>
        ) : news.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma notícia publicada ainda.</p>
        ) : (
          <ScrollReveal delayMs={200}>
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: true }}
              className="w-full"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <CarouselContent className="-ml-4">
                {news.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-background shadow-card transition-shadow hover:shadow-elevated">
                      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            loading="lazy"
                            className="size-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <time className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                          {formatDate(item.published_at)}
                        </time>
                        <h3 className="text-lg font-bold leading-snug text-navy">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.summary}</p>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
