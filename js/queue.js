var crisafulli = {
  name: "Crisafulli Brothers Plumbing & Heating",
  type: "hvac",
  dispType: "ersOnly",
  svcQual: 7,
  frequency: 4
}

let clients = [];
let ops = [];
let callQueue = {
  live: [],
  holding: [],
  completed: []
}

for (i = 0; i < 3; i++){
  clients.push(new clientGenerator(3))
}

for (i = 0; i < 3; i++){
  ops.push(new opGenerator())
}
