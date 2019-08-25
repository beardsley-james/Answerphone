let msPerMin = 5000,
callFreq = 0,
minutesInDay = 1440,
currentMinute = 1080,
day = "monday";

opStartup(ops);

window.setInterval(function(){
  console.log("Tick " + currentMinute);
  if (dailyFreq[day].hasOwnProperty(currentMinute)){
    callFreq = dailyFreq[day][currentMinute];
    console.log("Change Frequency to " + callFreq + " at " + currentMinute)
  }
  clients.forEach(phoneRinger);
  ops.forEach(callChecker);
  callQueueAdvance();
  currentMinute++;
  if (currentMinute == minutesInDay){
    currentMinute = 0;
    callFreq = 0
  }
}, msPerMin)

var phoneRinger = function(client){
  if (client.frequency <= callFreq && client.callVolume >= randomPercent()) {
    let call = new callGen(client);
    callQueue.live.push(call);
    console.log(new callGen(client) + " " + currentMinute);
    document.getElementById("liveCalls").prepend(callRender(call))
  }
}

var callChecker = function(op){
  if (op.call.length > 0){
    if (op.call[0].timeOnHold == 0 && op.call[0].callTime == 0 && callQueue.live.length > 0){
      callGrabber(op.call, callQueue.holding);
      console.log(op.name + " put a caller on hold");
      callGrabber(callQueue.live, op.call);
      console.log(op.name + " picked up a live call")
    } else if (op.call[0].timeToComplete > 0){
      console.log(op.name + " is working on a message, TTC " + op.call[0].timeToComplete);
      op.call[0].timeToComplete--;
      console.log("Time left:" + op.call[0].timeToComplete)
    } else if (op.call[0].timeToComplete == 0) {
      delete op.call[0].timeToComplete;
      callGrabber(op.call, callQueue.completed);
      console.log(op.name + " has completed a call")
    } else {
      op.call[0].callTime++;
      checkIfCallCompleted(op, op.call[0])
      console.log(op.name + " is speaking with a caller")
    }
  } else {
    if (callQueue.live.length > 0){
      callGrabber(callQueue.live, op.call);
      console.log(op.name + " answered a live call")
    } else if (callQueue.holding.length > 0){
      callGrabber(callQueue.holding, op.call);
      console.log(op.name + " answered a holding call")
    } else {
      op.idleTime++;
      console.log(op.name + " is in standby")
    }
  }
  opUpdater(op)
}

var callGrabber = function(target, destination){
  let call = target.pop();
  destination.push(call);
  if (target == callQueue.live || target == callQueue.holding){
    if (document.getElementById("call" + call.callNumber)){
      removeCall(call)
    }
  }
  if (destination == callQueue.holding){
    let holdingQueue = document.getElementById("holdingCalls");
    holdingQueue.prepend(callRender(call))
  }
  if (destination == callQueue.lost){
    if (document.getElementById("call" + call.callNumber)){
      removeCall(call)
    }
  }
}

var checkIfCallCompleted = function(op, call){
  let skill = op.level + Math.floor(Math.random() * 5);
  let difficulty = call.difficulty;
  console.log("Skill test, " + skill + " vs " + difficulty)
  if (skill >= difficulty){
    console.log("Test successful")
    call.timeToComplete = Math.floor(Math.random() * 3)
    console.log("Time to complete: " + call.timeToComplete)
  }
}

var callQueueAdvance = function(){
  callQueue.holding.forEach(function(call){
    call.timeOnHold++;
    if (call.timeOnHold++ > 5) {
      callGrabber(callQueue.holding, callQueue.lost);
      console.log("Caller disconnected while on hold")
    }
  })
  callQueue.live.forEach(function(call){
    call.timeRinging++;
    if (call.timeRinging > 3) {
      callGrabber(callQueue.live, callQueue.lost);
      console.log("Call rang out")
    }
  })
}

var extractCallNumber = function(elementId){
  let callRegEx = /call(\d+)/;
  let callNum = callRegEx.exec(elementId);
  return callNum[1]
}
