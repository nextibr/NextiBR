import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ContactModel } from "@/models/contact.model";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome (mínimo de 2 caracteres)").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  message: z.string().trim().min(10, "Escreva uma mensagem com pelo menos 10 caracteres").max(2000),
});

export function useContactViewModel() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os campos obrigatórios.");
      return;
    }

    setSending(true);
    try {
      await ContactModel.submitMessage(parsed.data);
      toast.success("Mensagem enviada! Entraremos em contato em breve.");
      setForm({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Contact submit error:", error);
      toast.error("Não foi possível enviar sua mensagem. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  function handleFieldChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return {
    form,
    sending,
    handleFieldChange,
    handleSubmit,
  };
}
