-- Script para adicionar campo is_programmer na tabela pesquisa_ai_code_pro
-- Execute este comando no Supabase SQL Editor se quiser incluir o campo no futuro

ALTER TABLE pesquisa_ai_code_pro 
ADD COLUMN is_programmer BOOLEAN;

-- Criar índice para o novo campo
CREATE INDEX IF NOT EXISTS idx_pesquisa_ai_code_pro_is_programmer 
ON pesquisa_ai_code_pro(is_programmer);

-- Comentário para documentação
COMMENT ON COLUMN pesquisa_ai_code_pro.is_programmer IS 'Indica se o usuário é programador (true/false)';
