var generateFullName = function(){
  return generateFirstName() + " " + generateLastName()
}

var generateFirstName = function(){
  return names.first[Math.floor(Math.random()*names.first.length)]
}

var generateLastName = function(){
  return names.last[Math.floor(Math.random()*names.last.length)]
}

var clientGenerator = function(difficulty){
  let type = businessTypes[Math.floor(Math.random()*businessTypes.length)];
  this.type = type;
  this.name = generateBusinessName(type);
  this.frequency = returnNumberInRange(callFreqRanges[type][0], callFreqRanges[type][1]);
  this.opLevel = determineOpLevel(difficulty);
  this.svcQual = Math.floor(Math.random() * 5) + 1;
  this.callRate = Math.floor(Math.random() * (100-50)) + 50;
  this.callTime = 0;
  this.id = clientId;
  clientId++
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
  this.message = messages[company.type][Math.floor(Math.random()*messages[company.type].length) - 1];
  this.difficulty = company.opLevel + Math.floor(company.svcQual/2);
  this.timeRinging = 0;
  this.timeOnHold = 0;
  this.callTime = 0;
  this.dispatchTime = 0;
  this.custSatisfaction = 0;
  this.callNumber = callNumber;
  this.rate = company.callRate;
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
  this.call = [];
  this.callsCompleted = 0
}

var initialsGenerator = function(){
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let initials = "";
  while (initials.length < 3) {
    initials += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  if (initialsChecker(initials)){
    return initials
  } else { return initialsGenerator() }
}

var initialsChecker = function(initials){
  let same = 0;
  ops.forEach(function(op){
    if (op.name == initials){
      same = 1
    }
  })
  possibleOps.forEach(function(op){
    if (op.name == initials){
      same = 1
    }
  })
  if (same == 0){
    return true
  } else { return false }
}

var generateBusinessName = function(type){
  let nameTemplate = businessNames[type][Math.floor(Math.random()*businessNames[type].length)];
  let name = "";
  if (nameTemplate.nameType == "full"){
    name = generateFullName()
  } else if (nameTemplate.nameType == "last"){
    name = generateLastName()
  } else if (nameTemplate.nameType == "first"){
    name = generateFirstName()
  }
  let busName = nameTemplate.pre + name + nameTemplate.suf;
  if (businessNameChecker(busName)){
    return busName
  } else { return generateBusinessName(type) }
}

var businessNameChecker = function(name){
  let same = 0
  clients.forEach(function(client){
    if (client.name == name){
      same = 1
    }
  })
  possibleClients.forEach(function(client){
    if (client.name == name){
      same = 1
    }
  })
  if (same == 0){
    return true
  } else { return false }
}

var campaignGenerator = function(campaignType){
  let campaign = advertisingCampaigns[campaignType];
  this.name = campaign.name;
  this.duration = campaign.duration;
  this.type = campaign.type;
  this.frequency = campaign.frequency;
  this.cost = campaign.cost;
  this.id = "advertisement" + (campaignId);
  this.code = campaign.code;
  campaignId++
}
