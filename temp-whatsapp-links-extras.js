// Leads EXTRAS de script_downloads e social_actions (ultimos dias)
const leadsScriptDownloads = [
  { email: "binato@gmail.com", phone: "11971554507", aula: 4, timestamp: "2025-11-17 21:27", action: "Download Script" },
  { email: "mateusfonsecafs@gmail.com", phone: "(81) 97328-0026", aula: 4, timestamp: "2025-11-17 22:49", action: "Download Script" },
  { email: "leoneto@gmail.com", phone: "(85) 99969-0089", aula: 3, timestamp: "2025-11-17 17:16", action: "Download Script" }
];

const leadsSocialActions = [
  { email: "edu.machado@gmail.com", phone: "(11) 99669-9762", aula: 1, timestamp: "2025-11-12 22:08", action: "Seguiu YouTube" },
  { email: "fapmbr@yahoo.com.br", phone: "99999990000", aula: 1, timestamp: "2025-11-13 20:19", action: "Seguiu YouTube" }
];

function sanitizePhone(phone) {
  // Remove tudo exceto numeros
  const cleaned = phone.toString().replace(/\D/g, '');
  
  // Se ja tem codigo do pais (55), retorna
  if (cleaned.startsWith('55') && cleaned.length >= 12) {
    return cleaned;
  }
  
  // Adiciona codigo do pais (55)
  return '55' + cleaned;
}

console.log('\n=== LINKS DE WHATSAPP - LEADS EXTRAS (Script Downloads + Social Actions) ===\n');

console.log('--- SCRIPT DOWNLOADS (Ultimos 2 dias) ---\n');
leadsScriptDownloads.forEach((lead, index) => {
  const sanitized = sanitizePhone(lead.phone);
  const mensagem = encodeURIComponent(`Ola! Vi que voce baixou o script da Aula ${lead.aula}. Conseguiu rodar o projeto? Precisa de ajuda? 🚀`);
  const link = `https://wa.me/${sanitized}?text=${mensagem}`;
  
  console.log(`${index + 1}. ${lead.email} (Aula ${lead.aula} - ${lead.action})`);
  console.log(`   ${link}`);
  console.log('');
});

console.log('\n--- SOCIAL ACTIONS (Ultima semana) ---\n');
leadsSocialActions.forEach((lead, index) => {
  const sanitized = sanitizePhone(lead.phone);
  const mensagem = encodeURIComponent(`Ola! Vi que voce se inscreveu no canal. Como esta sendo a experiencia com o AI Code Pro? 🚀`);
  const link = `https://wa.me/${sanitized}?text=${mensagem}`;
  
  console.log(`${index + 1}. ${lead.email} (Aula ${lead.aula} - ${lead.action})`);
  console.log(`   ${link}`);
  console.log('');
});

console.log(`\n=== TOTAL: ${leadsScriptDownloads.length + leadsSocialActions.length} leads extras ===\n`);
