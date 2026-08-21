import { supabase } from "@/integrations/supabase/client";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export class ContactModel {
  static async submitMessage(message: ContactMessage): Promise<void> {
    // 1. Save to the database
    const { error: dbError } = await supabase.from("contact_messages").insert(message);
    if (dbError) throw dbError;

    // 2. Send email via FormSubmit (free browser-to-email service, no server config required)
    try {
      const response = await fetch("https://formsubmit.co/ajax/nextibr.tech@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Nome: message.name,
          Email: message.email,
          Mensagem: message.message,
          _subject: `Novo Contato do Site — ${message.name}`,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("FormSubmit response error:", errData);
      }
    } catch (e) {
      console.error("Error sending email via FormSubmit:", e);
    }
  }
}
