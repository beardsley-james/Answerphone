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

var names = ["Benny", "June", "Lawrence", "Tyler"]

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
  this.name = names[Math.floor(Math.random()*names.length)];
  this.client = company.name;
  this.type = company.type;
  this.message = messages[company.type][Math.floor(Math.random()*messages[company.type].length)];
}

let dayGen = function(day, ansSvc, holiday){
  let callFreq = 0;
  let minutesInDay = 1440;
  let currentMinute = 0;
  while (currentMinute < minutesInDay) {
    if (dailyFreq[day].hasOwnProperty(currentMinute)){
      callFreq = dailyFreq[day][currentMinute];
      console.log("Change Frequency to " + callFreq + " at " + currentMinute)
    }
    ansSvc.clients.forEach(function(client){
      if (client.frequency < callFreq) {
        console.log(new callGen(client) + " " + currentMinute)
      }
    })
    currentMinute++
  }
}
