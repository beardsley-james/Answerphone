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
  this.callVolume = (difficulty * 5) + Math.floor(Math.random() * 50);
  this.opLevel = determineOpLevel(difficulty);
  this.svcQual = Math.floor(Math.random() * 10) + 1
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

var callGen = function(company){
  this.name = generateFullName();
  this.client = company.name;
  this.type = company.type;
  this.message = messages[company.type][Math.floor(Math.random()*messages[company.type].length)];
}

var randomPercent = function(){
  return Math.floor(Math.random() * 100) + 1
}
