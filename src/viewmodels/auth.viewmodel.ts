import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthModel } from "@/models/auth.model";

export function useAuthViewModel() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AuthModel.getSession().then((session) => {
      if (session) {
        navigate({ to: "/admin", replace: true });
      }
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        await AuthModel.signInWithPassword(email, password);
        toast.success("Login efetuado com sucesso!");
        navigate({ to: "/admin", replace: true });
      } else {
        const data = await AuthModel.signUp(email, password);
        if (data.session) {
          toast.success("Conta criada e login efetuado!");
          navigate({ to: "/admin", replace: true });
        } else {
          toast.success("Conta criada! Confirme seu e-mail para acessar o painel.");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (mode === "signin") {
        toast.error("E-mail ou senha inválidos.");
      } else {
        toast.error(error.message || "Erro ao realizar o cadastro.");
      }
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
  }

  return {
    mode,
    email,
    password,
    loading,
    setEmail,
    setPassword,
    toggleMode,
    handleSubmit,
  };
}
