var crisafulli = {
  name: "Crisafulli Brothers Plumbing & Heating",
  type: "hvac",
  dispType: "ersOnly",
  svcQual: 7,
  callFreq: 4
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

var callGen = function(company){
  this.name = names[Math.floor(Math.random()*names.length)];
  this.client = company.name;
  this.type = company.type;
  this.message = messages[company.type][Math.floor(Math.random()*messages[company.type].length)];
}

var buildFreqMap = function(freqChart){
  let freqMap = [];
  let minute = 0;
  for (let stamp in freqChart){
    while (minute < stamp+1){
      console.log(stamp.value);
      freqMap.push(stamp.value)
    }
  }
  return freqMap
}

call1 = new callGen(crisafulli);

console.log(call1)

console.log(buildFreqMap(dailyFreq.monday))
