// Sistema de backup para leads
(function() {
  // Verificar se estamos no navegador
  if (typeof window === 'undefined') return;
  
  // Função para salvar lead localmente
  function saveLeadLocally(leadData) {
    try {
      // Adicionar timestamp
      const leadWithTimestamp = {
        ...leadData,
        timestamp: new Date().toISOString(),
        savedLocally: true
      };
      
      // Recuperar leads salvos anteriormente
      const savedLeadsJSON = localStorage.getItem('aicodepro_backup_leads') || '[]';
      const savedLeads = JSON.parse(savedLeadsJSON);
      
      // Adicionar novo lead
      savedLeads.push(leadWithTimestamp);
      
      // Salvar no localStorage
      localStorage.setItem('aicodepro_backup_leads', JSON.stringify(savedLeads));
      
      console.log('✅ Lead salvo localmente com sucesso:', leadWithTimestamp);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar lead localmente:', error);
      return false;
    }
  }
  
  // Função para enviar lead para serviços de backup
  async function sendToBackupServices(leadData) {
    // 1. Tentar enviar para webhook.site (serviço público de teste)
    try {
      fetch('https://webhook.site/d8a7b3e5-9b3a-4f1d-9a5e-8f7c6d5e4c3b', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
          keepalive: true
        }).catch(e => console.error('Erro webhook.site:', e));
    } catch (error) {
      console.error('Erro ao enviar para webhook.site:', error);
    }
    
    // 2. Tentar enviar para RequestBin
    try {
      fetch('https://eo9v8lqq6jtc8.x.pipedream.net/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
        keepalive: true
      }).catch(e => console.error('Erro RequestBin:', e));
    } catch (error) {
      console.error('Erro ao enviar para RequestBin:', error);
    }
  }
  
  // Interceptar envios de formulário
  document.addEventListener('DOMContentLoaded', function() {
    // Aguardar o carregamento do DOM
    setTimeout(() => {
      // Procurar o formulário do Hotmart
      const form = document.querySelector('form[klicksend-form-id="4puEQny"]');
      if (!form) {
        console.log('Formulário não encontrado ainda, tentando novamente...');
        return;
      }
      
      console.log('Formulário encontrado, configurando interceptação...');
      
      // Interceptar o envio do formulário
      const originalSubmit = form.onsubmit;
      form.addEventListener('submit', function(e) {
        // Capturar dados do formulário
        const emailInput = form.querySelector('input[name="email"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const isProgrammerInput = document.getElementById('isProgrammerField');
        
        if (emailInput && phoneInput) {
          const email = emailInput.value;
          const phone = phoneInput.value;
          let isProgrammer = false;
          
          // Tentar obter o valor de isProgrammer
          if (isProgrammerInput) {
            isProgrammer = isProgrammerInput.value === 'true';
          } else {
            // Tentar obter do localStorage como fallback
            try {
              isProgrammer = localStorage.getItem('aicodepro_isProgrammer') === 'true';
            } catch (e) {}
          }
          
          // Obter UTMs
          const urlParams = new URLSearchParams(window.location.search);
          const utmSource = urlParams.get('utm_source') || 'direct';
          const utmMedium = urlParams.get('utm_medium') || 'none';
          const utmCampaign = urlParams.get('utm_campaign') || 'none';
          
          // Dados do lead
          const leadData = {
            email,
            phone,
            isProgrammer,
            utmSource,
            utmMedium,
            utmCampaign,
            timestamp: new Date().toISOString(),
            source: 'form_intercept'
          };
          
          // Salvar localmente
          saveLeadLocally(leadData);
          
          // Enviar para serviços de backup
          sendToBackupServices(leadData);
          
          // Tentar enviar para a API interna usando sendBeacon
          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(leadData)], {type: 'application/json'});
            navigator.sendBeacon('/api/webhook-lead', blob);
          }
          
          console.log('Lead capturado e salvo em sistemas de backup!');
        }
        
        // Continuar com o envio normal
        if (originalSubmit) {
          return originalSubmit.call(form, e);
        }
        return true;
      });
      
      console.log('Interceptação configurada com sucesso!');
    }, 1000); // Aguardar 1 segundo para garantir que o formulário foi carregado
  });
  
  // Adicionar botão de acesso ao backup na página
  setTimeout(() => {
    try {
      const backupButton = document.createElement('div');
      backupButton.style.position = 'fixed';
      backupButton.style.bottom = '10px';
      backupButton.style.right = '10px';
      backupButton.style.backgroundColor = 'rgba(0,0,0,0.7)';
      backupButton.style.color = 'white';
      backupButton.style.padding = '5px 10px';
      backupButton.style.borderRadius = '5px';
      backupButton.style.fontSize = '12px';
      backupButton.style.cursor = 'pointer';
      backupButton.style.zIndex = '9999';
      backupButton.innerHTML = '📋 Backup';
      backupButton.title = 'Acessar sistema de backup de leads';
      
      backupButton.addEventListener('click', function() {
        window.open('/backup.html', '_blank');
      });
      
      document.body.appendChild(backupButton);
    } catch (e) {
      console.error('Erro ao adicionar botão de backup:', e);
    }
  }, 2000);
})();
