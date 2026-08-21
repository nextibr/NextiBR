import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthViewModel } from "@/viewmodels/auth.viewmodel";
import logo from "@/assets/nextibr-lockup.png";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acesso administrativo — NextiBR" },
      { name: "description", content: "Área de login do painel administrativo da NextiBR." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acesso administrativo — NextiBR" },
      { property: "og:description", content: "Área de login do painel administrativo da NextiBR." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const {
    mode,
    email,
    password,
    loading,
    setEmail,
    setPassword,
    toggleMode,
    handleSubmit,
  } = useAuthViewModel();

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-elevated">
        <img src={logo} alt="Logo NextiBR" className="mx-auto h-10 w-auto" />
        <h1 className="mt-6 text-center text-2xl font-bold text-navy">Painel administrativo</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "Entre com seu e-mail e senha." : "Crie sua conta de acesso."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@dominio.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>
          <Button type="submit" disabled={loading} className="gradient-brand w-full rounded-full font-semibold">
            {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <button
          className="mt-6 w-full text-center text-sm font-semibold text-brand-green hover:underline"
          onClick={toggleMode}
        >
          {mode === "signin" ? "Não tenho conta — criar acesso" : "Já tenho conta — entrar"}
        </button>
      </div>
    </div>
  );
}
