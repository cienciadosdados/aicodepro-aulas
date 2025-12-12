// TRIPLE ACTION: Instagram recente + Comprometidos + 3 ações (IG + YT + Download)
// 170 leads NOVOS (excluindo os 161 já enviados hoje)
const leads = [
  {email:"andrejagan@gmail.com",phone:"11940147165",profissao:"engenheiro de dados",salario:"acima-15000"},
  {email:"coniglio@dr.com",phone:"+5521994454436",profissao:"Empresário",salario:"acima-15000"},
  {email:"daniel.wendorf@gmail.com",phone:"47992180376",profissao:"empreendedor",salario:"acima-15000"},
  {email:"daniloresende@yahoo.com",phone:"44998177890",profissao:"Desenvolvedor",salario:"acima-15000"},
  {email:"denilson@rapelli.com.br",phone:"+551198354229",profissao:"Consiltor tecnologia",salario:"acima-15000"},
  {email:"dev.soniabatista@gmail.com",phone:"11940108618",profissao:"Desenvolvedora blockchain",salario:"acima-15000"},
  {email:"edwillie@gmail.com",phone:"12996179111",profissao:"Eng dados",salario:"acima-15000"},
  {email:"ffurlani0@gmail.com",phone:"+5511947645244",profissao:"Especialista em banco de dados",salario:"acima-15000"},
  {email:"fillipemartins.alves@gmail.com",phone:"34991003006",profissao:"Desenvolvedor",salario:"acima-15000"},
  {email:"flavio@azoup.com.br",phone:"19993055103",profissao:"Dev",salario:"acima-15000"},
  {email:"fnegrini@gmail.com",phone:"+554199284938",profissao:"Gerente de Produto",salario:"acima-15000"},
  {email:"gabrielocbarros@gmail.com",phone:"11991036363",profissao:"Empreendedor",salario:"acima-15000"},
  {email:"guedes@afubra.com.br",phone:"51998325369",profissao:"Gerente de TI",salario:"acima-15000"},
  {email:"ismailybf@yahoo.com.br",phone:"+5588997132492",profissao:"Professor",salario:"acima-15000"},
  {email:"julianocesarferreira1@gmail.com",phone:"34992764870",profissao:"Gerente de desenvolvimento",salario:"acima-15000"},
  {email:"leandro.gioppo@gmail.com",phone:"119702970707",profissao:"Arquiteto de soluções de TI",salario:"acima-15000"},
  {email:"marciaspira@hotmail.com",phone:"33660811331",profissao:"Empresária",salario:"acima-15000"},
  {email:"marcoacm.ctba@gmail.com",phone:"41991622590",profissao:"Desenvolvedor",salario:"acima-15000"},
  {email:"melocarlos@gmail.com",phone:"11982559948",profissao:"desenvolvedor",salario:"acima-15000"},
  {email:"nicolas.lavinia@gmail.com",phone:"11991640130",profissao:"Desenvolvedor",salario:"acima-15000"},
  {email:"pearthunder@gmail.com",phone:"+5511987552225",profissao:"Gerente de QA",salario:"acima-15000"},
  {email:"querobass@yahoo.com.br",phone:"+5511996106989",profissao:"Frontend Engineer",salario:"acima-15000"},
  {email:"rafaeelbonfiolli@gmail.com",phone:"11943118352",profissao:"Analista",salario:"acima-15000"},
  {email:"rafael.kohler@gmail.com",phone:"+5541999449784",profissao:"Lider técnico",salario:"acima-15000"},
  {email:"raphatecnico@gmail.com",phone:"+5521988991343",profissao:"Arquiteto de Solução",salario:"acima-15000"},
  {email:"rmiqui@gmail.com",phone:"48 99179-5252",profissao:"Desenvolvedor",salario:"acima-15000"},
  {email:"robson.presalindo@gmail.com",phone:"51997172251",profissao:"Desenvolvimento",salario:"acima-15000"},
  {email:"souldion@gmail.com",phone:"11982832488",profissao:"Support engineer",salario:"acima-15000"},
  {email:"vaniojr@gmail.com",phone:"48999817217",profissao:"Analista",salario:"acima-15000"},
  {email:"wagfreitas@hotmail.com",phone:"11989630454",profissao:"Gerente de Desenvolvimento",salario:"acima-15000"},
  {email:"wolf.junior@gmail.com",phone:"51984130300",profissao:"Engenheiro e empresario",salario:"acima-15000"}
];

function sanitizePhone(phone) {
  const cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.startsWith('55') && cleaned.length >= 12) {
    return cleaned;
  }
  return '55' + cleaned;
}

console.log('\n=== TRIPLE ACTION - HIGH TICKET (31 leads +R$ 11k) ===\n');

leads.forEach((lead, index) => {
  const sanitized = sanitizePhone(lead.phone);
  console.log(`${index + 1}. ${sanitized} - ${lead.email}`);
  console.log(`   Profissao: ${lead.profissao}`);
  console.log(`   https://wa.me/${sanitized}`);
  console.log('');
});

console.log(`\n=== TOTAL: ${leads.length} leads HIGH-TICKET ===`);
console.log('Todos ganham acima de R$ 11.000/mes');
console.log('Todos fizeram 3 acoes: Instagram + YouTube + Download\n');
