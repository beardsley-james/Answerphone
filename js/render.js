var callRender = function(call){
  let callTicket = document.createElement("div");
  callTicket.setAttribute("id", ("call" + call.callNumber))
  callTicket.setAttribute("class", "call");
  callTicket.setAttribute("onclick", "manualAnswer(event)")
  let name = document.createElement("b");
  name.innerHTML = call.name;
  let message = document.createElement("span");
  message.innerHTML = call.message;
  let business = document.createElement("i");
  business.innerHTML = call.client;
  let times = document.createElement("span");
  times.setAttribute("id", "call" + call.callNumber + "stats");
  times.innerHTML = "Live:" + call.timeRinging + " Hold:" + call.timeOnHold + " Answer:" + call.callTime + " #:" + call.callNumber;
  callTicket.appendChild(name);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(message);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(business);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(times);
  return callTicket
}

var callRefresh = function(call){
  let callStats = document.getElementById("call" + call.callNumber + "stats");
  callStats.innerHTML = "Live:" + call.timeRinging + " Hold:" + call.timeOnHold + " Answer:" + call.callTime + " #:" + call.callNumber;
}

var callStatBoxRefresh = function(){
  let numHolding = document.getElementById("numHolding");
  let numLive = document.getElementById("numLive");
  let numCompleted = document.getElementById("numCompleted");
  let numLost = document.getElementById("numLost");
  numHolding.innerHTML = callQueue.holding.length;
  numLive.innerHTML = callQueue.live.length;
  numCompleted.innerHTML = callQueue.completed.length;
  numLost.innerHTML = callQueue.lost.length
}

var lineBreak = function(){
  let br = document.createElement("br");
  return br
}

var removeCall = function(call){
  let callId = "call" + call.callNumber;
  let callTicket = document.getElementById(callId);
  callTicket.parentNode.removeChild(callTicket)
}

var opUpdater = function(op){
  let status = document.getElementById("status" + op.name);
  let opCard = document.getElementById("op" + op.name);
  if (op.call.length > 0) {
    status.innerHTML = op.call[0].name + ", " + op.call[0].client;
    opCard.setAttribute("class", "op active")
  } else {
    status.innerHTML = "Standby";
    opCard.setAttribute("class", "op inactive")
  }
}

var opStartup = function(ops){
  let opCool = document.getElementById("opPool");
  ops.forEach(function(op){
    let opCard = document.createElement("div");
    opCard.setAttribute("class", "op");
    opCard.setAttribute("id", "op" + op.name);
    let name = document.createElement("b");
    name.innerHTML = op.level + " " + op.name;
    let status = document.createElement("span");
    status.setAttribute("id", "status" + op.name);
    opCard.appendChild(name);
    opCard.appendChild(lineBreak());
    opCard.appendChild(status);
    opPool.appendChild(opCard)
  })
}

var updateCurrentMinute = function(){
  let minuteDisplay = document.getElementById("currentMinute");
  minuteDisplay.innerHTML = minToStandardTime(currentMinute)
}

var renderEndOfDay = function(report){
  delete document.getElementsByClassName("call");
  document.getElementById("tableCallsCompleted").innerHTML = report.completedCalls;
  document.getElementById("tableCallsLost").innerHTML = report.lostCalls;
  document.getElementById("tableTotalTimeRinging").innerHTML = report.totalTimeRinging;
  document.getElementById("tableTotalHoldTime").innerHTML = report.totalTimeOnHold;
  document.getElementById("tableTotalCallTime").innerHTML = report.totalCallTime;
  document.getElementById("tableAmountEarned").innerHTML = report.amountEarned;
  report.ops.forEach(function(op){
    let opReport = document.createElement("div");
    opReport.setAttribute("class", "opReport");
    let name = document.createElement("span");
    name.innerHTML = "Name: " + op.name;
    let callsCompleted = document.createElement("span")
    callsCompleted.innerHTML = "Calls Completed: " + op.callsCompleted;
    let idleTime = document.createElement("span")
    idleTime.innerHTML = "Standby Time: " + op.idleTime;
    opReport.appendChild(name);
    opReport.appendChild(lineBreak());
    opReport.appendChild(callsCompleted);
    opReport.appendChild(lineBreak());
    opReport.appendChild(idleTime);
    document.getElementById("operatorReport").appendChild(opReport)
  })
  report.clients.forEach(function(client){
    let clientReport = document.createElement("div");
    clientReport.setAttribute("class", "clientReport");
    let name = document.createElement("span");
    name.innerHTML = "Name: " + client.name;
    let type = document.createElement("span");
    type.innerHTML = "Type: " + client.type;
    let level = document.createElement("span");
    level.innerHTML = "Level " + client.opLevel + " Account";
    let callRate = document.createElement("span");
    callRate.innerHTML = "Rate Per Minute: $0." + client.callRate;
    let callTime = document.createElement("span");
    callTime.innerHTML = "Total Call Time: " + client.callTime;
    clientReport.appendChild(name);
    clientReport.appendChild(lineBreak());
    clientReport.appendChild(type);
    clientReport.appendChild(lineBreak());
    clientReport.appendChild(level);
    clientReport.appendChild(lineBreak());
    clientReport.appendChild(callRate);
    clientReport.appendChild(lineBreak());
    clientReport.appendChild(callTime);
    document.getElementById("clientReport").appendChild(clientReport)
  })
  revealPanel("endOfDayReport")
}

var revealPanel = function(panelId){
  let panels = document.getElementsByClassName("panel");
  for (i = 0; i < panels.length; i++){
    panels[i].style.display = "none";
  }
  if (panelId){
    document.getElementById(panelId).style.display = "block"
  }
}
