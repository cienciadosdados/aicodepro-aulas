# 🔴 CAUSA RAIZ DO PROBLEMA DE TRACKING

## O que Aconteceu

### Cronologia
1. **Antes de 06/09/2025**: Tracking funcionando normalmente
2. **06/09/2025 16:08:27**: Última visualização registrada
3. **Após 06/09/2025**: ZERO registros por 53 dias
4. **30/10/2025**: Problema identificado e corrigido

### Causa Raiz Identificada

**Alguém executou SQL que criou triggers INCORRETOS nas tabelas de tracking.**

#### O que foi feito (ERRADO):
```sql
-- Arquivo: datascience/create_unified_leads_table.sql
-- Criou função global:
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();  -- ❌ PROBLEMA AQUI
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Depois alguém aplicou triggers em TODAS as tabelas:
CREATE TRIGGER update_aula_views_timestamp 
ON aula_views  -- ❌ Esta tabela NÃO TEM coluna updated_at!
EXECUTE FUNCTION update_updated_at_column();
```

#### Por que Quebrou:
1. A função tenta acessar `NEW.updated_at`
2. As tabelas de tracking (`aula_views`, `script_downloads`, etc.) **NÃO TÊM** a coluna `updated_at`
3. Quando o trigger executava, dava erro: `"trigger functions can only be called as triggers"`
4. Esse erro bloqueava TODOS os inserts

#### Prova:
```
Estrutura das tabelas de tracking:
✅ aula_views: id, email, phone, session_id, aula_number, utm_*, timestamp
❌ NÃO TEM: updated_at

✅ script_downloads: id, email, phone, session_id, aula_number, utm_*, timestamp  
❌ NÃO TEM: updated_at

✅ aula_navigations: id, email, phone, session_id, from_aula, to_aula, utm_*, timestamp
❌ NÃO TEM: updated_at

✅ social_actions: id, email, phone, session_id, platform, aula_number, utm_*, timestamp
❌ NÃO TEM: updated_at
```

## Como Foi Corrigido

### Solução Imediata (Temporária)
```sql
-- Desabilitou TODOS os triggers
ALTER TABLE public.aula_views DISABLE TRIGGER ALL;
ALTER TABLE public.script_downloads DISABLE TRIGGER ALL;
ALTER TABLE public.aula_navigations DISABLE TRIGGER ALL;
ALTER TABLE public.social_actions DISABLE TRIGGER ALL;
```

### Solução Permanente
Execute o arquivo: `FIX-PERMANENTE-TRIGGERS.sql`

Ele:
1. Remove a função problemática antiga
2. Cria função SEGURA que verifica se coluna existe
3. Aplica trigger APENAS em `unified_leads` (que TEM updated_at)
4. Remove triggers das tabelas de tracking
5. Testa para garantir que funciona

## Como Prevenir

### ⚠️ REGRAS DE OURO:

1. **NUNCA aplique triggers globalmente sem verificar estrutura das tabelas**
   
2. **SEMPRE verifique se a coluna existe antes de criar trigger:**
   ```sql
   -- ✅ CORRETO:
   CREATE OR REPLACE FUNCTION safe_update_timestamp()
   RETURNS TRIGGER AS $$
   BEGIN
       IF EXISTS (
           SELECT 1 FROM information_schema.columns 
           WHERE table_name = TG_TABLE_NAME 
           AND column_name = 'updated_at'
       ) THEN
           NEW.updated_at = NOW();
       END IF;
       RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   ```

3. **Triggers de timestamp só fazem sentido em tabelas que TÊM updated_at**
   - `unified_leads` ✅ TEM updated_at → Pode ter trigger
   - `aula_views` ❌ NÃO TEM updated_at → NÃO pode ter trigger

4. **Sempre teste após criar triggers:**
   ```sql
   -- Teste insert
   INSERT INTO tabela (...) VALUES (...);
   -- Se der erro, o trigger está errado
   ```

5. **Documente quando criar triggers:**
   ```sql
   COMMENT ON TRIGGER nome_trigger ON tabela IS 
   'Criado em DD/MM/YYYY - Atualiza updated_at automaticamente';
   ```

## Checklist Antes de Criar Triggers

- [ ] A tabela TEM a coluna que o trigger vai modificar?
- [ ] Testei o trigger com um INSERT de teste?
- [ ] Documentei por que o trigger é necessário?
- [ ] Verifiquei se não vai quebrar inserts existentes?
- [ ] Tenho backup para reverter se der problema?

## Arquivos de Diagnóstico Criados

1. `investigate-trigger-source.js` - Verifica estrutura das tabelas
2. `check-supabase-triggers.js` - Testa inserts em todas as tabelas
3. `FIX-PERMANENTE-TRIGGERS.sql` - Solução definitiva
4. `EXECUTE-AGORA-NO-SUPABASE.sql` - Fix emergencial

## Impacto do Problema

- ❌ 53 dias sem tracking (06/09 a 30/10/2025)
- ❌ Perda de dados de ~1.600 visualizações estimadas
- ❌ Impossível saber quem clicou em "Interesse Registrado"
- ❌ Métricas de engajamento perdidas

## Lições Aprendidas

1. **Triggers são perigosos** - Podem quebrar silenciosamente
2. **Sempre teste em staging primeiro** - Nunca direto em produção
3. **Monitore tabelas críticas** - Alertar se parar de receber dados
4. **Logs são essenciais** - Sem logs, levou 53 dias para descobrir
5. **Verificações no código ajudam** - Mas não previnem problemas de banco

## Monitoramento Futuro

Execute periodicamente:
```bash
node test-tracking-live.js
```

Se ver:
```
⚠️ ATENÇÃO: Nenhuma visualização nas últimas 24 horas!
```

**AÇÃO IMEDIATA:** Verificar triggers no Supabase!
