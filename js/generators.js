var generateFullName = function(){
  let firstName = names.first[Math.floor(Math.random()*names.first.length)],
  lastName = names.last[Math.floor(Math.random()*names.last.length)];
  return firstName + " " + lastName
}

var generateBusinessName = function(type){
  let pool = businessNames[type];
  let nameTemplate = pool[Math.floor(Math.random()*pool.length)];
  let name = names.last[Math.floor(Math.random()*names.last.length)];
  if (nameTemplate.fix == "suf"){
    return name + nameTemplate.text
  } else {
    return nameTemplate.text + name
  }
}

var clientGenerator = function(difficulty){
  let type = businessTypes[Math.floor(Math.random()*businessTypes.length)];
  this.type = type;
  this.name = generateBusinessName(type);
  this.frequency = returnNumberInRange(callFreqRanges[type][0], callFreqRanges[type][1]);
  this.callVolume = (difficulty * 5) + (Math.floor(Math.random() * 50));
  this.opLevel = determineOpLevel(difficulty);
  this.svcQual = Math.floor(Math.random() * 5) + 1
}

var returnNumberInRange = function(min, max){
  return Math.floor(Math.random() * (max - min) + min)
}

var determineOpLevel = function(difficulty){
  if (difficulty > 6) {return 3}
  else if (difficulty > 3) {return 2}
  else {return 1}
}

var callCheck = function(frequency){
  if (Math.floor(Math.random() * 100) > frequency){
    return false
  } else {
    return true
  }
}

var callNumber = 0;

var callGen = function(company){
  this.name = generateFullName();
  this.client = company.name;
  this.type = company.type;
  this.message = messages[company.type][Math.floor(Math.random()*messages[company.type].length)];
  this.difficulty = company.opLevel + Math.floor(company.svcQual/2);
  this.timeRinging = 0;
  this.timeOnHold = 0;
  this.callTime = 0;
  this.dispatchTime = 0;
  this.custSatisfaction = 0;
  this.callNumber = callNumber;
  callNumber++
}

var randomPercent = function(){
  return Math.floor(Math.random() * 100) + 1
}

var minToMilTime = function(minutes){
  return Math.floor(minutes/60) + "" + (minutes%60)
}

var minToStandardTime = function(minutes){
  let hours = Math.floor(minutes/60);
  let pm = 0;
  if (hours > 12){
    pm = 1;
    hours = hours - 12
  }
  let mins = (minutes%60);
  if (mins < 10) {
    mins = "0" + mins
  }
  let timeString = hours + ":" + mins;
  if (pm) {
    timeString += "pm"
  } else {
    timeString += "am"
  }
  return timeString
}

var opGenerator = function(){
  this.name = initialsGenerator();
  this.level = 1;
  this.idleTime = 0;
  this.focus = 5;
  this.personability = 5;
  this.call = []
}

var initialsGenerator = function(){
  return "AAA"
}
