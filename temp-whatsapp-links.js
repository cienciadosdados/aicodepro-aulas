// Leads que visualizaram aulas ontem e hoje
const leads = [
  { email: "edsoolbj@gmail.com", phone: "051992253335", aula: 1, timestamp: "2025-11-18 17:54" },
  { email: "lfn0606@hotmail.com", phone: "11941499851", aula: 1, timestamp: "2025-11-18 21:31" },
  { email: "plinio.borges@gmail.com", phone: "(11) 99113-3662", aula: 1, timestamp: "2025-11-18 14:13" },
  { email: "roishibr@gmail.com", phone: "(12)991561230", aula: 1, timestamp: "2025-11-19 13:41" },
  { email: "Rafael.ti.net@gmail.com", phone: "(14) 99151-6925", aula: 1, timestamp: "2025-11-19 18:55" },
  { email: "admin@admin.com", phone: "1-(555)-555-5555", aula: 1, timestamp: "2025-11-18 23:21" }, // FAKE
  { email: "odair_lcorrea@hotmail.com", phone: "(19) 98140-8532", aula: 1, timestamp: "2025-11-19 11:59" },
  { email: "hferreiralh@gmail.com", phone: "(19) 9 8189-9107", aula: 2, timestamp: "2025-11-18 17:11" },
  { email: "menezessluciana@gmail.com", phone: "19999681706", aula: 1, timestamp: "2025-11-19 17:03" },
  { email: "rbegale@yahoo.com.br", phone: "21991040357", aula: 0, timestamp: "2025-11-19 14:14" },
  { email: "leonardoluisdossantos@gmail.com", phone: "31992487235", aula: 1, timestamp: "2025-11-18 14:39" },
  { email: "daniellamogliacanal@gmail.com", phone: "35984486366", aula: 2, timestamp: "2025-11-19 19:24" },
  { email: "samuel.dutra@hotmail.com", phone: "(41) 99998-9791", aula: 1, timestamp: "2025-11-18 22:40" },
  { email: "ricardo.francini@gmail.com", phone: "+5547999984181", aula: 4, timestamp: "2025-11-18 12:36" },
  { email: "jave@cienciadosdados.com", phone: "+5561999722142", aula: 1, timestamp: "2025-11-19 18:18" },
  { email: "mario.soares@gmail.com", phone: "81994014338", aula: 1, timestamp: "2025-11-18 13:51" },
  { email: "christianb.menezes@gmail.com", phone: "92999136530", aula: 1, timestamp: "2025-11-19 12:50" },
  { email: "antoniocarlos.roque@gmail.com", phone: "(98) 98705-8414", aula: 2, timestamp: "2025-11-19 19:58" }
];

function sanitizePhone(phone) {
  // Remove tudo exceto números
  const cleaned = phone.toString().replace(/\D/g, '');
  
  // Se já tem código do país (55), retorna
  if (cleaned.startsWith('55') && cleaned.length >= 12) {
    return cleaned;
  }
  
  // Adiciona código do país (55)
  return '55' + cleaned;
}

console.log('\n=== LINKS DE WHATSAPP - LEADS ONTEM E HOJE ===\n');

leads.forEach((lead, index) => {
  const sanitized = sanitizePhone(lead.phone);
  const nome = lead.email.split('@')[0];
  const mensagem = encodeURIComponent(`Olá! Vi que você assistiu a Aula ${lead.aula} do AI Code Pro. Como está sendo a experiência? 🚀`);
  const link = `https://wa.me/${sanitized}?text=${mensagem}`;
  
  console.log(`${index + 1}. ${lead.email} (Aula ${lead.aula})`);
  console.log(`   ${link}`);
  console.log('');
});

console.log(`\n=== TOTAL: ${leads.length} leads ===\n`);
