var crisafulli = {
  name: "Crisafulli Brothers Plumbing & Heating",
  type: "hvac",
  dispType: "ersOnly",
  svcQual: 7,
  frequency: 4
}

let Answerphone = {
  clients: []
}

for (i = 0; i < 3; i++){
  Answerphone.clients.push(new clientGenerator(3))
}
