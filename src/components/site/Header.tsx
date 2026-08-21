import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/nextbr-lockup.png";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#noticias", label: "Notícias" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all ${
        scrolled
          ? "border-border/70 bg-background/90 shadow-card backdrop-blur"
          : "border-transparent bg-background/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center" aria-label="NextBR — Inovação e Tecnologia">
          <img src={logo} alt="Logo NextBR" className="h-12 w-auto sm:h-14" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-navy/80 transition-colors hover:text-brand-green"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="gradient-brand rounded-full px-5 font-semibold shadow-card">
            <a href="#contato">Fale conosco</a>
          </Button>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-3 text-sm font-semibold text-navy hover:bg-secondary"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="gradient-brand mt-2 w-full rounded-full font-semibold">
            <a href="#contato" onClick={() => setOpen(false)}>
              Fale conosco
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
