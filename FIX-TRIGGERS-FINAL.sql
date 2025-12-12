-- ========================================
-- FIX PARA TRIGGERS PROBLEMÁTICOS
-- ========================================
-- EXECUTAR NO SQL EDITOR DO SUPABASE
-- Link: https://supabase.com/dashboard/project/nmweydircrhrsyhiuhbv/sql-editor
-- ========================================

-- PASSO 1: Verificar triggers existentes
SELECT 
    schemaname,
    tablename,
    triggername,
    tgtype,
    tgenabled
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE tablename IN ('aula_views', 'script_downloads', 'aula_navigations', 'social_actions')
AND schemaname = 'public'
AND tgname NOT LIKE 'RI_%'  -- Excluir triggers internos
ORDER BY tablename, triggername;

-- PASSO 2: Desabilitar temporariamente os triggers problemáticos
-- (NÃO deletar, apenas desabilitar para não perder a configuração)

ALTER TABLE public.aula_views DISABLE TRIGGER ALL;
ALTER TABLE public.script_downloads DISABLE TRIGGER ALL;
ALTER TABLE public.aula_navigations DISABLE TRIGGER ALL;
ALTER TABLE public.social_actions DISABLE TRIGGER ALL;

-- PASSO 3: Testar insert em cada tabela
-- Se funcionar, os triggers eram o problema

-- Teste aula_views
INSERT INTO public.aula_views (
    aula_number, 
    session_id, 
    email, 
    phone,
    utm_source,
    utm_medium,
    utm_campaign,
    timestamp
) VALUES (
    999,
    'test_session_fix',
    'test@fix.com',
    NULL,
    NULL,
    NULL,
    NULL,
    NOW()
) RETURNING id;

-- Se o insert acima funcionou, deletar o registro de teste
DELETE FROM public.aula_views WHERE aula_number = 999 AND session_id = 'test_session_fix';

-- PASSO 4: Recriar triggers corretamente (se necessário)
-- Apenas se você quiser manter a funcionalidade de updated_at

-- Função correta para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recriar triggers apenas se as tabelas tiverem coluna updated_at
-- Verificar primeiro se a coluna existe:

DO $$
BEGIN
    -- Para aula_views
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'aula_views' 
        AND column_name = 'updated_at'
    ) THEN
        DROP TRIGGER IF EXISTS update_aula_views_timestamp ON public.aula_views;
        CREATE TRIGGER update_aula_views_timestamp
        BEFORE UPDATE ON public.aula_views
        FOR EACH ROW
        EXECUTE FUNCTION public.update_timestamp();
    END IF;

    -- Para script_downloads
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'script_downloads' 
        AND column_name = 'updated_at'
    ) THEN
        DROP TRIGGER IF EXISTS update_script_downloads_timestamp ON public.script_downloads;
        CREATE TRIGGER update_script_downloads_timestamp
        BEFORE UPDATE ON public.script_downloads
        FOR EACH ROW
        EXECUTE FUNCTION public.update_timestamp();
    END IF;

    -- Para aula_navigations
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'aula_navigations' 
        AND column_name = 'updated_at'
    ) THEN
        DROP TRIGGER IF EXISTS update_aula_navigations_timestamp ON public.aula_navigations;
        CREATE TRIGGER update_aula_navigations_timestamp
        BEFORE UPDATE ON public.aula_navigations
        FOR EACH ROW
        EXECUTE FUNCTION public.update_timestamp();
    END IF;

    -- Para social_actions
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'social_actions' 
        AND column_name = 'updated_at'
    ) THEN
        DROP TRIGGER IF EXISTS update_social_actions_timestamp ON public.social_actions;
        CREATE TRIGGER update_social_actions_timestamp
        BEFORE UPDATE ON public.social_actions
        FOR EACH ROW
        EXECUTE FUNCTION public.update_timestamp();
    END IF;
END $$;

-- PASSO 5: Verificar se tudo está funcionando
SELECT 
    'Fix aplicado com sucesso!' as status,
    (SELECT COUNT(*) FROM pg_trigger t
     JOIN pg_class c ON t.tgrelid = c.oid
     WHERE c.relname IN ('aula_views', 'script_downloads', 'aula_navigations', 'social_actions')
     AND tgname NOT LIKE 'RI_%') as total_triggers;
