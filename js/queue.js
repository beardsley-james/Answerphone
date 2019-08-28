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
  completed: [],
  lost: []
}

for (i = 0; i < 15; i++){
  clients.push(new clientGenerator(3))
}

for (i = 0; i < 15; i++){
  ops.push(new opGenerator())
}
