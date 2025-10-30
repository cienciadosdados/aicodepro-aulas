-- ========================================
-- COPIE E COLE NO SQL EDITOR DO SUPABASE
-- ========================================
-- Link: https://supabase.com/dashboard/project/nmweydircrhrsyhiuhbv/sql-editor
-- ========================================

-- Desabilitar TODOS os triggers nas tabelas de tracking
ALTER TABLE public.aula_views DISABLE TRIGGER ALL;
ALTER TABLE public.script_downloads DISABLE TRIGGER ALL;
ALTER TABLE public.aula_navigations DISABLE TRIGGER ALL;
ALTER TABLE public.social_actions DISABLE TRIGGER ALL;

-- Testar se funcionou
INSERT INTO public.aula_views (
    aula_number, 
    session_id, 
    email, 
    timestamp
) VALUES (
    999,
    'test_final',
    'test@test.com',
    NOW()
) RETURNING id;

-- Se funcionou, deletar o teste
DELETE FROM public.aula_views WHERE aula_number = 999 AND session_id = 'test_final';

-- Mensagem de sucesso
SELECT 'Triggers desabilitados com sucesso! Agora o tracking vai funcionar.' as status;
