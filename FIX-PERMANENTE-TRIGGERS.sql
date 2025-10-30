-- ========================================
-- FIX PERMANENTE: Prevenir Triggers Problemáticos
-- ========================================
-- EXECUTAR NO SQL EDITOR DO SUPABASE
-- ========================================

-- PASSO 1: Remover função problemática antiga
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- PASSO 2: Criar função SEGURA que verifica se coluna existe
CREATE OR REPLACE FUNCTION safe_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se a coluna updated_at existe antes de tentar atualizar
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = TG_TABLE_SCHEMA 
        AND table_name = TG_TABLE_NAME 
        AND column_name = 'updated_at'
    ) THEN
        NEW.updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- PASSO 3: Aplicar trigger APENAS na tabela unified_leads (que TEM updated_at)
DROP TRIGGER IF EXISTS update_unified_leads_timestamp ON unified_leads;
CREATE TRIGGER update_unified_leads_timestamp
BEFORE UPDATE ON unified_leads
FOR EACH ROW
EXECUTE FUNCTION safe_update_timestamp();

-- PASSO 4: Garantir que triggers NÃO existam nas tabelas de tracking
DROP TRIGGER IF EXISTS update_aula_views_timestamp ON aula_views;
DROP TRIGGER IF EXISTS update_script_downloads_timestamp ON script_downloads;
DROP TRIGGER IF EXISTS update_aula_navigations_timestamp ON aula_navigations;
DROP TRIGGER IF EXISTS update_social_actions_timestamp ON social_actions;

-- PASSO 5: Verificação final
SELECT 
    'Fix permanente aplicado!' as status,
    (SELECT COUNT(*) 
     FROM pg_trigger t
     JOIN pg_class c ON t.tgrelid = c.oid
     WHERE c.relname IN ('aula_views', 'script_downloads', 'aula_navigations', 'social_actions')
     AND tgname NOT LIKE 'RI_%') as triggers_nas_tabelas_tracking,
    (SELECT COUNT(*) 
     FROM pg_trigger t
     JOIN pg_class c ON t.tgrelid = c.oid
     WHERE c.relname = 'unified_leads'
     AND tgname NOT LIKE 'RI_%') as triggers_na_unified_leads;

-- PASSO 6: Testar insert
INSERT INTO aula_views (
    aula_number, 
    session_id, 
    email, 
    timestamp
) VALUES (
    999,
    'test_permanente',
    'test@permanente.com',
    NOW()
) RETURNING id;

-- Deletar teste
DELETE FROM aula_views WHERE aula_number = 999 AND session_id = 'test_permanente';

SELECT 'Tudo funcionando! ✅' as resultado;
