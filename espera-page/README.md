# Página de Espera - AI Code Pro

## 📋 Descrição
Página intermediária para redirecionar usuários após o fim do evento AI Code Pro para a formação completa.

## 🎯 Objetivo
- Informar que o AI Code Pro terminou
- Direcionar para a formação completa (lp.cienciadosdados.com)
- Manter experiência profissional durante a transição

## 🚀 Como Implementar no HostGator

### 1. Upload dos Arquivos
1. Acesse o cPanel do HostGator
2. Vá em "Gerenciador de Arquivos"
3. Navegue até a pasta do subdomínio `espera.cienciadosdados.com`
4. Faça upload do arquivo `index.html`

### 2. Configurar Subdomínio
1. No cPanel, vá em "Subdomínios"
2. Crie o subdomínio: `espera.cienciadosdados.com`
3. Aponte para a pasta onde está o `index.html`

### 3. Configurar Redirecionamento
No cPanel do domínio principal:
1. Vá em "Redirecionamentos"
2. Configure:
   - **De:** `aicodepro.cienciadosdados.com`
   - **Para:** `https://espera.cienciadosdados.com`
   - **Tipo:** Redirecionamento Permanente (301)

### 4. Alternativa com .htaccess
Se preferir usar .htaccess na raiz do `aicodepro.cienciadosdados.com`:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^aicodepro\.cienciadosdados\.com$ [NC]
RewriteRule ^(.*)$ https://espera.cienciadosdados.com/$1 [R=301,L]
```

## 🎨 Características da Página

### Design
- ✅ Responsiva (mobile-first)
- ✅ Gradiente moderno
- ✅ Animações suaves
- ✅ Efeito glassmorphism
- ✅ Partículas flutuantes

### Conteúdo
- ✅ Mensagem clara sobre fim do evento
- ✅ CTA destacado para formação
- ✅ Features da formação
- ✅ Branding consistente

### Funcionalidades
- ✅ Tracking de cliques
- ✅ Google Analytics ready
- ✅ SEO otimizado
- ✅ Performance otimizada

## 📊 Tracking
A página inclui tracking de cliques no botão CTA:
- Console log para debug
- Google Analytics (se configurado)
- Fácil integração com outros sistemas

## 🔧 Personalização
Para personalizar a página:
1. Edite o texto no HTML
2. Modifique cores no CSS (variáveis no topo)
3. Ajuste o link de destino (atualmente: lp.cienciadosdados.com)

## ✅ Checklist de Deploy
- [ ] Upload do index.html
- [ ] Configuração do subdomínio espera.cienciadosdados.com
- [ ] Redirecionamento aicodepro → espera
- [ ] Teste em diferentes dispositivos
- [ ] Verificação do tracking
- [ ] Teste do link para lp.cienciadosdados.com

## 🎯 Fluxo do Usuário
```
Usuário acessa aicodepro.cienciadosdados.com
    ↓ (redirecionamento automático 301)
espera.cienciadosdados.com
    ↓ (clique no CTA)
lp.cienciadosdados.com (formação completa)
```

## 📱 Compatibilidade
- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Chrome Mobile
- ✅ Tablets e desktops
- ✅ Conexões lentas (otimizado)
