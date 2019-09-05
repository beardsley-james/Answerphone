let msPerMin = 1000,
callFreq = 0,
minutesInDay = 1440,
currentMinute = 0,
day = "monday",
money = 0;

opStartup(ops);

var phoneRinger = function(client){
  if (client.frequency <= callFreq && client.callVolume >= randomPercent()) {
    let call = new callGen(client);
    callQueue.live.push(call);
    console.log(new callGen(client) + " " + currentMinute);
    document.getElementById("liveCalls").append(callRender(call))
  }
}

var timer = function(){
  setTimeout(function(){
    console.log("Tick " + currentMinute);
    if (dailyFreq[day].hasOwnProperty(currentMinute)){
      callFreq = dailyFreq[day][currentMinute];
      console.log("Change Frequency to " + callFreq + " at " + currentMinute)
    }
    clients.forEach(phoneRinger);
    ops.forEach(callChecker);
    callQueueAdvance();
    callStatBoxRefresh();
    updateCurrentMinute();
    disableUnaffordableButtons();
    checkAdvertisements();
    currentMinute++;
    if (currentMinute == minutesInDay){
      let report = endOfDay();
      renderEndOfDay(report);
      clearDay()
    } else { timer() }
  }, msPerMin)
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
      clients.forEach(function(client){
        if (client.name == op.call[0].client){
          client.callTime += op.call[0].callTime
        }
      })
      money += (op.call[0].callTime * op.call[0].rate);
      document.getElementById("bigMoney").innerHTML = moneyDisplay(money);
      callGrabber(op.call, callQueue.completed);
      console.log(op.name + " has completed a call");
      op.callsCompleted++;
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
    holdingQueue.append(callRender(call))
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
    if (call.timeOnHold > 5) {
      var i = callQueue.holding.indexOf(call);
      callQueue.lost.push(callQueue.holding.splice(i, 1));
      removeCall(call);
      console.log("Caller disconnected while on hold")
    } else {callRefresh(call)}
  })
  callQueue.live.forEach(function(call){
    call.timeRinging++;
    if (call.timeRinging > 3) {
      var i = callQueue.live.indexOf(call);
      callQueue.lost.push(callQueue.live.splice(i, 1));
      removeCall(call);
      console.log("Call rang out")
    } else {callRefresh(call)}
  })
}

var extractCallNumber = function(elementId){
  let callRegEx = /call(\d+)/;
  let callNum = callRegEx.exec(elementId);
  return callNum[1]
}

var manualAnswer = function(event){
  let target = event.currentTarget;
  let callId = extractCallNumber(target.id);
  let category = target.parentNode.id;
  var callObj = {};
  if (category == "holdingCalls"){
    category = "holding"
  } else {category = "live"}
  callQueue[category].forEach(function(call, index){
    if (call.callNumber == callId) {
      callObj = call;
      callQueue[category].splice(index, 1)
    }
  })
  if (category == "holding"){
    callObj.callTime++;
    clients.forEach(function(client){
      if (client.name == callObj.client){
        client.callTime += callObj.callTime
      }
    })
    money += (callObj.callTime * callObj.rate);
    document.getElementById("bigMoney").innerHTML = moneyDisplay(money);
    callQueue.completed.push(callObj);
    removeCall(callObj)
  } else {
    callQueue.holding.push(callObj);
    removeCall(callObj);
    let holdingQueue = document.getElementById("holdingCalls");
    holdingQueue.append(callRender(callObj))
  }
  callStatBoxRefresh()
}

var endOfDay = function(){
  let report = {
    completedCalls: callQueue.completed.length,
    lostCalls: callQueue.lost.length,
    ops: [],
    clients: [],
    totalTimeOnHold: 0,
    totalTimeRinging: 0,
    totalCallTime: 0,
    amountEarned: 0
  }
  callQueue.completed.forEach(function(call){
    report.totalTimeOnHold += call.timeOnHold;
    report.totalTimeRinging += call.timeRinging;
    report.totalCallTime += call.callTime
  })
  ops.forEach(function(op){
    let opReport = {
      name: op.name,
      callsCompleted: op.callsCompleted,
      idleTime: op.idleTime
    };
    report.ops.push(op)
  })
  clients.forEach(function(client){
    report.amountEarned += (client.callRate * client.callTime);
    let clientReport = {
      name: client.name,
      type: client.type,
      opLevel: client.opLevel,
      callRate: client.callRate,
      callTime: client.callTime
    }
    report.clients.push(client)
  })
  return report
}

var clearDay = function(){
  currentMinute = 0;
  callFreq = 0;
  callQueue.live = [];
  callQueue.holding = [];
  callQueue.completed = [];
  callQueue.lost = [];
  ops.forEach(function(op){
    op.idleTime = 0;
    op.call = [];
    op.callsCompleted = 0
  })
  clients.forEach(function(client){
    client.callTime = 0
  })
}

var disableUnaffordableButtons = function(){
  let buttons = document.getElementsByClassName("expenditure");
  let buttonRegEx = /dol(\d+)/;
  let className = 0;
  for (i = 0; i < buttons.length; i++){
    className = buttons[i].className.split(" ")[1];
    if (parseInt(buttonRegEx.exec(className)[1]) > money){
      buttons[i].disabled = true
    } else { buttons[i].disabled = false }
  }
}

var startCampaign = function(campaignType){
  let campaign = new campaignGenerator(campaignType);
  campaigns.push(campaign);
  money -= campaign.cost;
  document.getElementById("activeCampaigns").append(campaignCard(campaign));
  document.getElementById(campaign.code + "Ad").style.display = "none"
}

var checkAdvertisements = function(){
  campaigns.forEach(function(campaign){
    if (campaign.duration == 0){
      console.log("removing " + campaign.id)
      let i = campaigns.indexOf(campaign);
      updateAdvertisementCard(campaign);
      campaigns.splice(i, 1);
      document.getElementById(campaign.code + "Ad").style.display = "block"
    } else {
      if ((Math.random() * 1000) <= campaign.frequency){
        if (campaign.type == "hr"){
          possibleOps.push(new opGenerator())
        } else if (campaign.type == "sales"){
          possibleClients.push(new clientGenerator(3))
        }
      }
      updateAdvertisementCard(campaign);
      campaign.duration --
    }
  })
}

timer()

revealPanel("callQueue")
