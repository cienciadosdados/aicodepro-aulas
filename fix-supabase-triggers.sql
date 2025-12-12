-- Script para corrigir triggers problemáticos no Supabase
-- Execute este SQL no SQL Editor do Supabase

-- 1. Listar todos os triggers nas tabelas de tracking
SELECT 
    schemaname,
    tablename,
    triggername,
    tgtype
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE tablename IN ('aula_views', 'script_downloads', 'aula_navigations', 'social_actions')
AND schemaname = 'public'
ORDER BY tablename, triggername;

-- 2. REMOVER triggers problemáticos (se existirem)
-- Descomente as linhas abaixo após verificar quais triggers existem

-- DROP TRIGGER IF EXISTS handle_updated_at ON public.aula_views;
-- DROP TRIGGER IF EXISTS handle_updated_at ON public.script_downloads;
-- DROP TRIGGER IF EXISTS handle_updated_at ON public.aula_navigations;
-- DROP TRIGGER IF EXISTS handle_updated_at ON public.social_actions;

-- 3. Verificar se há funções problemáticas
SELECT 
    n.nspname as schema,
    p.proname as function_name,
    pg_get_function_identity_arguments(p.oid) as arguments
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname LIKE '%trigger%'
OR p.proname LIKE '%handle%'
ORDER BY function_name;

-- 4. Verificar policies (RLS)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('aula_views', 'script_downloads', 'aula_navigations', 'social_actions')
ORDER BY tablename, policyname;
