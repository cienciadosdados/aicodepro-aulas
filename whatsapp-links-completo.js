// TODOS OS LEADS - Aula Views + Script Downloads + Social Actions
const leads = [
  { email: "antoniocarlos.roque@gmail.com", phone: "(98) 98705-8414", aula: 2, source: "aula_view" },
  { email: "binato@gmail.com", phone: "11971554507", aula: 4, source: "script_download" },
  { email: "christianb.menezes@gmail.com", phone: "92999136530", aula: 1, source: "aula_view" },
  { email: "daniellamogliacanal@gmail.com", phone: "35984486366", aula: 2, source: "aula_view" },
  { email: "edsoolbj@gmail.com", phone: "051992253335", aula: 1, source: "aula_view" },
  { email: "edu.machado@gmail.com", phone: "(11) 99669-9762", aula: 1, source: "social_action" },
  { email: "hferreiralh@gmail.com", phone: "(19) 9 8189-9107", aula: 2, source: "aula_view" },
  { email: "jave@cienciadosdados.com", phone: "+5561999722142", aula: 1, source: "script_download" },
  { email: "leonardoluisdossantos@gmail.com", phone: "31992487235", aula: 1, source: "aula_view" },
  { email: "leoneto@gmail.com", phone: "(85) 99969-0089", aula: 3, source: "script_download" },
  { email: "lfn0606@hotmail.com", phone: "11941499851", aula: 1, source: "aula_view" },
  { email: "mario.soares@gmail.com", phone: "81994014338", aula: 1, source: "aula_view" },
  { email: "mateusfonsecafs@gmail.com", phone: "(81) 97328-0026", aula: 4, source: "script_download" },
  { email: "menezessluciana@gmail.com", phone: "19999681706", aula: 1, source: "aula_view" },
  { email: "odair_lcorrea@hotmail.com", phone: "(19) 98140-8532", aula: 1, source: "aula_view" },
  { email: "plinio.borges@gmail.com", phone: "(11) 99113-3662", aula: 1, source: "aula_view" },
  { email: "Rafael.ti.net@gmail.com", phone: "(14) 99151-6925", aula: 1, source: "aula_view" },
  { email: "rbegale@yahoo.com.br", phone: "21991040357", aula: 0, source: "aula_view" },
  { email: "ricardo.francini@gmail.com", phone: "+5547999984181", aula: 4, source: "aula_view" },
  { email: "roishibr@gmail.com", phone: "(12)991561230", aula: 1, source: "aula_view" },
  { email: "samuel.dutra@hotmail.com", phone: "(41) 99998-9791", aula: 1, source: "aula_view" }
];

function sanitizePhone(phone) {
  const cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.startsWith('55') && cleaned.length >= 12) {
    return cleaned;
  }
  return '55' + cleaned;
}

console.log('\n=== TODOS OS LEADS - WHATSAPP SANEADO ===\n');
console.log('Email\tWhatsApp\tAula\tLink');
console.log('---\t---\t---\t---');

leads.forEach((lead) => {
  const sanitized = sanitizePhone(lead.phone);
  const msg = encodeURIComponent(`Ola! Vi que voce assistiu a Aula ${lead.aula} do AI Code Pro. Como esta sendo a experiencia? 🚀`);
  const link = `https://wa.me/${sanitized}?text=${msg}`;
  
  console.log(`${lead.email}\t${sanitized}\t${lead.aula}\t${link}`);
});

console.log(`\n=== TOTAL: ${leads.length} leads ===\n`);
