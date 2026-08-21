import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContactViewModel } from "@/viewmodels/contact.viewmodel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import logo from "@/assets/nextibr-lockup.png";

export function ContactFooter() {
  const { form, sending, handleFieldChange, handleSubmit } = useContactViewModel();

  return (
    <footer id="contato" className="bg-navy text-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal direction="right" className="w-full">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">Contato</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Vamos conversar</h2>
              <p className="mt-3 max-w-md text-background/70">
                Quer conhecer o AURA, propor uma parceria ou saber mais sobre a NextiBR? Envie sua
                mensagem — respondemos rápido.
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-brand-yellow" />
                  <a href="mailto:nextibr.tech@gmail.com" className="hover:underline">
                    nextibr.tech@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="size-5 text-brand-yellow" />
                  <span>Teresina, Piauí — Brasil</span>
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram da NextiBR"
                  className="rounded-full border border-background/20 p-3 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                >
                  <Instagram className="size-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn da NextiBR"
                  className="rounded-full border border-background/20 p-3 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                >
                  <Linkedin className="size-5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="w-full">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-background p-6 text-foreground shadow-elevated sm:p-8"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={form.name}
                    maxLength={100}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    maxLength={255}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    placeholder="voce@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    maxLength={2000}
                    value={form.message}
                    onChange={(e) => handleFieldChange("message", e.target.value)}
                    placeholder="Como podemos ajudar?"
                  />
                </div>
                <Button type="submit" disabled={sending} className="gradient-brand w-full rounded-full font-semibold">
                  {sending ? "Enviando..." : "Enviar mensagem"}
                </Button>
              </div>
            </form>
          </ScrollReveal>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-background/15 pt-8 sm:flex-row sm:justify-between">
          <img src={logo} alt="Logo NextiBR" className="h-9 w-auto brightness-0 invert" />
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} NextiBR — Inovação e Tecnologia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
