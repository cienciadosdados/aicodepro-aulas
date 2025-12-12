// Qualified Leads apos 05/11 (42 leads)
const leads = [
  {email:"marcusarosteguy@hotmail.com",phone:"+5555219729171",prog:true},
  {email:"programerpg@gmail.com",phone:"42999260475",prog:true},
  {email:"luciolopesrs@gmail.com",phone:"+5554999265913",prog:false},
  {email:"galeno.sgpf@hotmail.com",phone:"86999034447",prog:true},
  {email:"cleidyfumanca2021@gmail.com",phone:"244948356416",prog:true},
  {email:"daniel.vieira378@gmail.com",phone:"81996743995",prog:true},
  {email:"pr-cunha@outlook.com",phone:"+5521970634576",prog:false},
  {email:"eurafaeltussini@gmail.com",phone:"21990155623",prog:true},
  {email:"costakaua09@outlook.com",phone:"19983071034",prog:true},
  {email:"joaorodrigoff@gmail.com",phone:"+5511999896330",prog:true},
  {email:"dantondelima.contato@gmail.com",phone:"13991678274",prog:true},
  {email:"yougobrazil@gmail.com",phone:"+5585998153275",prog:false},
  {email:"nati.ozawa@gmail.com",phone:"11972390189",prog:true},
  {email:"ts.technology.jo@gmail.com",phone:"11988325820",prog:true},
  {email:"andreluiskg@hotmail.com",phone:"21988970338",prog:true},
  {email:"nandomacielsc@gmail.com",phone:"+5548999112785",prog:false},
  {email:"panegassi@gmail.com",phone:"+5511983775659",prog:true},
  {email:"chatpcd@gmail.com",phone:"11998664939",prog:true},
  {email:"gabrielnunesimoveis@gmail.com",phone:"+5571997307727",prog:false},
  {email:"nickolas.faria@provafacilnaweb.com.br",phone:"11987654321",prog:false},
  {email:"italo.pspereira@gmail.com",phone:"551199290 5421",prog:true},
  {email:"jeanlouzeiro.dev@gmail.com",phone:"98984156998",prog:true},
  {email:"rodrigozanelsp@gmail.com",phone:"11980428701",prog:true},
  {email:"jonatanlsm@gmail.com",phone:"54999381959",prog:false},
  {email:"ericklppinho@gmail.com",phone:"24981891119",prog:true},
  {email:"daphiny7776252@gmail.com",phone:"19998662788",prog:false},
  {email:"p.henriqueazeredo@gmail.com",phone:"+5521996352787",prog:true},
  {email:"patittaoliver@gmail.com",phone:"+5551992395668",prog:false},
  {email:"erk.silveira@gmail.com",phone:"11918459686",prog:false},
  {email:"edsaba@gmail.com",phone:"16993175075",prog:true},
  {email:"neimardeveloper@gmail.com",phone:"71987483141",prog:true},
  {email:"danielcoutobrito@hotmail.com",phone:"44984553024",prog:true},
  {email:"talessilvacostta@gmail.com",phone:"64993063638",prog:true},
  {email:"hrezermosquer75@gmail.com",phone:"+5555996415366",prog:true},
  {email:"patriciauemura53@gmail.com",phone:"+5511974887803",prog:true},
  {email:"carlos.eduardo.arcieri@gmail.com",phone:"+5571986240785",prog:true},
  {email:"luizpcam@gmaill.com",phone:"119991399943",prog:true},
  {email:"thfantini@hotmail.com",phone:"+5531994931105",prog:true},
  {email:"wesleyjanlacerda@gmail.com",phone:"+5562995343232",prog:true},
  {email:"cursoapenas@gmail.com",phone:"11919150182",prog:false},
  {email:"jceleste1@gmail.com",phone:"+5511982483175",prog:true},
  {email:"everborges0@gmail.com",phone:"31988772043",prog:true}
];

function sanitizePhone(phone) {
  const cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.startsWith('55') && cleaned.length >= 12) {
    return cleaned;
  }
  return '55' + cleaned;
}

console.log('\n=== QUALIFIED LEADS POS 05/NOV - 42 CONTATOS ===\n');

leads.forEach((lead, index) => {
  const sanitized = sanitizePhone(lead.phone);
  const tipo = lead.prog ? 'Programador' : 'Nao-programador';
  console.log(`${index + 1}. ${sanitized} - ${lead.email} (${tipo})`);
  console.log(`   https://wa.me/${sanitized}`);
  console.log('');
});

console.log(`\n=== TOTAL: ${leads.length} leads ===`);
console.log(`Programadores: ${leads.filter(l => l.prog).length}`);
console.log(`Nao-programadores: ${leads.filter(l => !l.prog).length}\n`);
