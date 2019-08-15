var crisafulli = {
  name: "Crisafulli Brothers Plumbing & Heating",
  type: "hvac",
  dispType: "ersOnly",
  svcQual: 7,
  frequency: 4
}

var messages = {
  "hvac": [
    "No AC",
    "No Heat",
    "Out of freon",
    "Leaky hot water heater",
    "Toilet clogged",
    "Leaky pipe"
  ]
}

var dailyFreq = {
  monday: {
    "0": 2,
    "360": 3,
    "420": 5,
    "511": 3,
    "720": 7,
    "780": 3,
    "1080": 8,
    "1200": 5,
    "1300": 3,
  }
}

let Answerphone = {
  clients: [crisafulli]
}

var callGen = function(company){
  this.name = generateFullName();
  this.client = generateBusinessName("hvac");
  this.type = company.type;
  this.message = messages[company.type][Math.floor(Math.random()*messages[company.type].length)];
}
