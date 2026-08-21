import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Nome, e-mail e mensagem são obrigatórios." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY não configurada nas variáveis de ambiente do Supabase.");
      // Se não houver chave do Resend configurada, falhamos silenciosamente ou retornamos erro específico
      return new Response(
        JSON.stringify({ error: "Envio de e-mail desativado. Por favor, configure a chave RESEND_API_KEY no painel do Supabase." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NextBR Landing Page <onboarding@resend.dev>",
        to: "nextibr.tech@gmail.com",
        subject: `Novo Contato do Site — ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 8px;">
            <h2 style="color: #002A4E; border-bottom: 2px solid #15954A; padding-bottom: 10px;">Novo contato recebido pelo site</h2>
            <p style="margin-top: 20px;"><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Mensagem:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-style: italic;">
              ${message}
            </div>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
            <p style="font-size: 11px; color: #888; text-align: center;">Este e-mail foi gerado automaticamente pela plataforma da NextBR.</p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Falha ao enviar e-mail via Resend.");
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Erro na Edge Function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
