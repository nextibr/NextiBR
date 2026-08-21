import { createFileRoute } from "@tanstack/react-router";
import { LogOut, Pencil, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminViewModel } from "@/viewmodels/admin.viewmodel";
import logo from "@/assets/nextibr-lockup.png";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — NextiBR" },
      { name: "description", content: "Gerencie as notícias e os textos institucionais da NextiBR." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel administrativo — NextiBR" },
      { property: "og:description", content: "Gerencie as notícias e os textos institucionais da NextiBR." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const {
    isAdmin,
    checkingRole,
    news,
    loadingNews,
    loadingContent,
    newsForm,
    aboutForm,
    setNewsForm,
    setAboutForm,
    saveNews,
    isSavingNews,
    removeNews,
    saveAbout,
    isSavingAbout,
    signOut,
    startEditNews,
    cancelEditNews,
  } = useAdminViewModel();

  if (checkingRole || loadingContent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40 text-navy font-semibold">
        Carregando informações do painel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <img src={logo} alt="Logo NextiBR" className="h-9 w-auto" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">Ver site</a>
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-1.5 size-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-navy">Painel administrativo</h1>

        {!isAdmin && (
          <div className="rounded-xl border border-brand-yellow/50 bg-brand-yellow/10 p-4 text-sm text-navy">
            Sua conta ainda não tem permissão de administrador. Peça a liberação do acesso para
            editar notícias e textos.
          </div>
        )}

        {isAdmin && (
          <>
            {/* Form Notícias */}
            <section className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold text-navy">
                {newsForm.id ? "Editar notícia" : "Nova notícia"}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    placeholder="Título da notícia"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="summary">Resumo</Label>
                  <Textarea
                    id="summary"
                    rows={3}
                    value={newsForm.summary}
                    onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                    placeholder="Breve descrição da notícia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL da imagem</Label>
                  <Input
                    id="image"
                    placeholder="https://images.unsplash.com/..."
                    value={newsForm.image_url ?? ""}
                    onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data de Publicação</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newsForm.published_at}
                    onChange={(e) => setNewsForm({ ...newsForm, published_at: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={saveNews}
                  disabled={isSavingNews}
                  className="gradient-brand rounded-full font-semibold"
                >
                  <Plus className="mr-1.5 size-4" />
                  {newsForm.id ? "Salvar alterações" : "Publicar notícia"}
                </Button>
                {newsForm.id && (
                  <Button variant="ghost" onClick={cancelEditNews}>
                    Cancelar
                  </Button>
                )}
              </div>
            </section>

            {/* Listagem de Notícias */}
            <section className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold text-navy">Notícias publicadas</h2>
              {loadingNews ? (
                <p className="mt-4 text-sm text-muted-foreground">Carregando notícias...</p>
              ) : (
                <ul className="mt-5 divide-y divide-border">
                  {news.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 py-4">
                      {item.image_url && (
                        <img src={item.image_url} alt="" className="hidden size-16 rounded-lg object-cover sm:block" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-navy">{item.title}</p>
                        <p className="truncate text-sm text-muted-foreground">{item.summary}</p>
                        <p className="mt-1 text-xs text-brand-green">{item.published_at}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEditNews(item)} aria-label="Editar">
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Excluir"
                          onClick={() => removeNews(item.id)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </li>
                  ))}
                  {news.length === 0 && <li className="py-4 text-sm text-muted-foreground">Nenhuma notícia publicada.</li>}
                </ul>
              )}
            </section>

            {/* Seção Sobre */}
            <section className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold text-navy">Textos da seção “Sobre”</h2>
              <div className="mt-5 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-title">Título</Label>
                  <Input
                    id="about-title"
                    value={aboutForm.about_title}
                    onChange={(e) => setAboutForm({ ...aboutForm, about_title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-text">Texto descritivo</Label>
                  <Textarea
                    id="about-text"
                    rows={6}
                    value={aboutForm.about_text}
                    onChange={(e) => setAboutForm({ ...aboutForm, about_text: e.target.value })}
                  />
                </div>
                <Button
                  onClick={saveAbout}
                  disabled={isSavingAbout}
                  className="gradient-brand rounded-full font-semibold"
                >
                  Salvar textos
                </Button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
