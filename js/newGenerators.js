var clientGenerator = function(config = {}){

  /* this function accepts a configuration object, all properties are optional
    config = {
      type = a string from businessTypes or an array of strings from businessTypes
      frequency = an integer 1-10
      opLevel = an integer 1-5
      difficulty = an integer 1-10
      svcQual = an integer 1-5
      callRate = an integer greater than 0, represents cents per operator minutes
    }
  */

  if (!config.type){
    this.type = businessTypes[Math.floor(Math.random()*businessTypes.length)]
  } else if (config.type.constructor === Array) {
    this.type = config.type[Math.floor(Math.random()*config.type.length)]
  } else {
    this.type = config.type
  }

  this.name = generateBusinessName(type);

  if (!config.frequency){
    this.frequency =  returnNumberInRange(callFreqRanges[type][0], callFreqRanges[type][1])
  } else {
    this.frequency = config.frequency
  }

  if (!config.opLevel && !config.difficulty){
    this.opLevel = 1
  } else if (config.opLevel){
    this.opLevel = config.opLevel
  } else if (config.difficulty){
    this.opLevel = determineOpLevel(difficulty)
  }

  if (!config.svcQual){
    this.svcQual = Math.floor(Math.random() * 5) + 1
  } else {
    this.svcQual = config.svcQual
  }

  if (!config.callRate){
    if (!config.difficulty){
      this.callRate = Math.floor(Math.random() * (50)) + (10 * this.opLevel)
    } else {
      this.callRate = Math.floor(Math.random() * (50)) + (10 * this.difficulty)
    }
  } else {
    this.callRate = config.callRate
  }

  this.callTime = 0;

  this.id = clientId;

  clientId++
}
