let msPerMin = 100,
callFreq = 0,
minutesInDay = 1440,
currentMinute = 420,
day = "monday";

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
  if (op.onCall) {
    if (op.call.length > 0 && callQueue.live.length > 0 && op.call[0].timeOnHold == 0){
      callGrabber(op.call, callQueue.holding);
      op.onCall = 0
      console.log("Call was put on hold")
    } else {
      op.call[0].callTime++;
      checkIfCallCompleted(op, op.call[0])
      console.log("Call is in progress")
    }
  } else if (op.call.length > 0 && op.call[0].timeToComplete > 0) {
    op.call[0].timeToComplete--
    console.log("Op is working on a call")
  } else if (op.call.length > 0 && op.call[0].timeToComplete == 0) {
    delete op.call[0].timeToComplete;
    callGrabber(op.call, callQueue.completed);
    op.onCall = 0
    console.log("Op has completed a call")
  } else if (callQueue.live.length > 0) {
    callGrabber(callQueue.live, op.call);
    op.onCall = 1
    console.log("Op answered a live call")
  } else if (callQueue.holding.length > 0) {
    callGrabber(callQueue.holding, op.call);
    op.onCall = 1
    console.log("Op answered a holding call")
  } else {op.idleTime++
    console.log("Op is idle")
  }
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
}

var checkIfCallCompleted = function(op, call){
  let skill = op.level + Math.floor(Math.random() * 5);
  let difficulty = call.difficulty;
  if (skill >= difficulty){
    call.timeToComplete = Math.floor(Math.random() * 3)
  }
}

var callQueueAdvance = function(){
  callQueue.holding.forEach(function(call){
    call.timeOnHold++
  })
  callQueue.live.forEach(function(call){
    call.timeRinging++
  })
}

var extractCallNumber = function(elementId){
  let callRegEx = /call(\d+)/;
  let callNum = callRegEx.exec(elementId);
  return callNum[1]
}
