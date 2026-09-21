-- Criar a tabela keep_alive
CREATE TABLE IF NOT EXISTS public.keep_alive (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'ping'
);

-- Habilitar RLS
ALTER TABLE public.keep_alive ENABLE ROW LEVEL SECURITY;

-- Política pública para permitir inserção externa via chave anon (para o GitHub Actions)
CREATE POLICY "Permitir inserção pública na keep_alive"
ON public.keep_alive
FOR INSERT
WITH CHECK (true);

-- Política pública para permitir exclusão externa via chave anon (para o GitHub Actions)
CREATE POLICY "Permitir exclusão pública na keep_alive"
ON public.keep_alive
FOR DELETE
USING (true);
