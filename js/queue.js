let clients = [];
let ops = [];
let callQueue = {
  live: [],
  holding: [],
  completed: [],
  lost: []
}

for (i = 0; i < 5; i++){
  clients.push(new clientGenerator(3))
}

for (i = 0; i < 3; i++){
  ops.push(new opGenerator())
}
