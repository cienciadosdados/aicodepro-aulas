# AI Code Pro - Sistema de Aulas e Rastreamento de Leads

## Visão Geral

Este projeto é uma plataforma de aulas online para o curso AI Code Pro, desenvolvido com Next.js e integrado ao Supabase para rastreamento de leads e análise de engajamento. A plataforma permite que os usuários assistam a vídeos de aulas, baixem scripts relacionados e sejam rastreados durante sua jornada de aprendizado para análise de marketing e engajamento.

## Funcionalidades Principais

### 1. Sistema de Aulas
- **Aulas em Vídeo**: 4 aulas com vídeos incorporados do YouTube
- **Downloads de Scripts**: Cada aula possui scripts disponíveis para download após seguir perfis sociais
- **Navegação entre Aulas**: Interface intuitiva para navegar entre as diferentes aulas

### 2. Sistema de Identificação de Leads
- **Modal de Identificação**: Solicita o email do usuário para identificá-lo
- **Associação com Banco de Dados**: Verifica se o email existe na base de leads do Supabase
- **Criação Automática de Leads**: Se o email não existir, cria automaticamente um novo lead

### 3. Sistema de Rastreamento Completo
- **Visualizações de Aulas**: Rastreia quando um usuário visualiza uma aula
- **Downloads de Scripts**: Rastreia quando um usuário baixa um script
- **Ações Sociais**: Rastreia quando um usuário segue perfis sociais (Instagram/YouTube)
- **Navegação entre Aulas**: Rastreia como os usuários navegam entre as aulas
- **Parâmetros UTM**: Captura e mantém parâmetros UTM em todas as ações para análise de campanhas

## Estrutura do Projeto

### Diretórios Principais

```
/app                  # Páginas da aplicação (estrutura Next.js App Router)
  /aula1              # Página da Aula 1
  /aula2              # Página da Aula 2
  /aula3              # Página da Aula 3
  /aula4              # Página da Aula 4
  /dashboard          # Dashboard administrativo (acesso restrito)
  /aula-layout.tsx    # Layout compartilhado entre as páginas de aulas
  /layout.tsx         # Layout principal da aplicação

/components           # Componentes reutilizáveis
  /AulaNavigation.tsx # Navegação entre aulas
  /ConditionalDownload.tsx # Componente de download condicional
  /Footer.tsx         # Rodapé do site
  /Header.tsx         # Cabeçalho do site
  /LeadIdentifier.tsx # Modal de identificação de leads
  /VideoPlayer.tsx    # Player de vídeo para as aulas
  /WhatsAppButton.tsx # Botão do WhatsApp (temporariamente desabilitado)

/lib                  # Bibliotecas e utilitários
  /tracking-service.js # Serviço de rastreamento de ações
  /supabase-client.js  # Cliente Supabase para conexão com o banco de dados

/public               # Arquivos estáticos
  /scripts            # Scripts para download das aulas
```

## Banco de Dados (Supabase)

### Tabelas Principais

1. **qualified_leads**
   - Armazena informações dos leads qualificados
   - Campos: id, email, phone, session_id, utm_source, utm_medium, utm_campaign, etc.

2. **aula_views**
   - Rastreia visualizações de aulas
   - Campos: id, email, phone, session_id, aula_number, utm_params, timestamp, etc.

3. **script_downloads**
   - Rastreia downloads de scripts
   - Campos: id, email, phone, session_id, aula_number, utm_params, timestamp, etc.

4. **social_actions**
   - Rastreia ações em redes sociais (seguir no Instagram/YouTube)
   - Campos: id, email, phone, session_id, platform, aula_number, utm_params, timestamp, etc.

5. **aula_navigations**
   - Rastreia navegação entre aulas
   - Campos: id, email, phone, session_id, from_aula, to_aula, utm_params, timestamp, etc.

6. **whatsapp_actions**
   - Rastreia interações com o botão do WhatsApp (atualmente desabilitado)
   - Campos: id, email, phone, session_id, action_type, aula_number, utm_params, timestamp, etc.

## Fluxo de Identificação de Leads

1. Quando um usuário acessa o site, um ID de sessão único é gerado e armazenado no localStorage
2. Após alguns segundos, o modal de identificação é exibido, solicitando o email do usuário
3. O sistema verifica se o email existe na tabela `qualified_leads` do Supabase
4. Se existir, associa o ID de sessão atual ao lead existente
5. Se não existir, cria automaticamente um novo lead com o email fornecido
6. Todas as ações subsequentes (visualizações, downloads, etc.) são associadas ao email identificado

## Rastreamento de UTM

O sistema captura e mantém parâmetros UTM em todas as ações para análise de campanhas:

1. Quando um usuário acessa o site via link com parâmetros UTM, esses parâmetros são capturados
2. Os parâmetros UTM são armazenados no localStorage para persistência
3. Todas as ações rastreadas incluem os parâmetros UTM associados
4. A navegação entre aulas preserva os parâmetros UTM originais e adiciona `utm_content` para indicar a navegação

## Requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase para o banco de dados

## Configuração

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente (crie um arquivo `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. Execute o script SQL no Supabase para criar as tabelas necessárias (disponível na raiz do projeto)

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador

## Deploy

Este projeto pode ser facilmente implantado na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente
3. Deploy!

## Acesso ao Dashboard

O dashboard administrativo está disponível em `/dashboard` e requer uma chave de acesso:

- Acesse qualquer página de aula com o parâmetro `?admin_key=cienciadosdados2025`
- Um link para o dashboard aparecerá na parte inferior da página

## Notas Importantes

- O botão do WhatsApp está temporariamente desabilitado
- O sistema sempre permite a identificação do usuário, mesmo que o email não exista na base de dados
- Todas as ações são rastreadas no Supabase para análise posterior
- Os parâmetros UTM são preservados em toda a jornada do usuário

## Próximos Passos

1. Resolver problemas com o botão do WhatsApp
2. Implementar análises mais avançadas no dashboard
3. Adicionar mais funcionalidades de engajamento
4. Melhorar a experiência de identificação de leads

---

Desenvolvido por Ciência dos Dados © 2025
