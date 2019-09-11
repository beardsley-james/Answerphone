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
  let bigMoney = document.getElementById("bigMoney");
  numHolding.innerHTML = callQueue.holding.length;
  numLive.innerHTML = callQueue.live.length;
  numCompleted.innerHTML = callQueue.completed.length;
  numLost.innerHTML = callQueue.lost.length;
  bigMoney.innerHTML = moneyDisplay(money)
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
  let opPool = document.getElementById("opPool");
  ops.forEach(function(op){
    let opCard = renderOp(op);
    opPool.appendChild(opCard)
  })
}

var clientStartup = function(clients){
  let clientList = document.getElementById("clients");
  clients.forEach(function(client){
    let clientCard = renderClientCard(client);
    clientList.appendChild(clientCard)
  })
}

var renderOp = function(op){
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
  return opCard
}

var updateCurrentMinute = function(){
  let minuteDisplay = document.getElementById("currentMinute");
  minuteDisplay.innerHTML = minToStandardTime(currentMinute)
}

var updateAdvertisementCard = function(advertisement){
  let advertisementCard = document.getElementById(advertisement.id);
  let advertisementCardDuration = document.getElementById("duration" + advertisement.id);
  if (advertisement.duration == 0){
    advertisementCard.parentNode.removeChild(advertisementCard)
  } else { advertisementCardDuration.innerHTML = advertisement.duration }
}

var renderEndOfDay = function(report){
  delete document.getElementsByClassName("call");
  document.getElementById("tableCallsCompleted").innerHTML = report.completedCalls;
  document.getElementById("tableCallsLost").innerHTML = report.lostCalls;
  document.getElementById("tableTotalTimeRinging").innerHTML = report.totalTimeRinging;
  document.getElementById("tableTotalHoldTime").innerHTML = report.totalTimeOnHold;
  document.getElementById("tableTotalCallTime").innerHTML = report.totalCallTime;
  document.getElementById("tableAmountEarned").innerHTML = moneyDisplay(report.amountEarned);
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

var moneyDisplay = function(num){
  let dollars = num / 100
  return dollars.toLocaleString("en-us", {style: "currency", currency: "USD"})
}

var campaignCard = function(campaign){
  let card = document.createElement("li");
  card.setAttribute("id", campaign.id);
  card.setAttribute("class", "campaignCard");
  let name = document.createElement("span");
  name.innerHTML = campaign.name;
  let duration = document.createElement("span");
  duration.innerHTML = "Time left: ";
  let durationTimer = document.createElement("span");
  durationTimer.setAttribute("id", "duration" + campaign.id);
  durationTimer.innerHTML = campaign.duration;
  duration.appendChild(durationTimer);
  card.appendChild(name);
  card.appendChild(lineBreak());
  card.appendChild(duration);
  return card
}

var renderEmploymentApp = function(op){
  let app = document.createElement("div");
  app.setAttribute("id", op.name + "application");
  app.setAttribute("class", "employmentApp");
  let name = document.createElement("b");
  name.innerHTML = op.name;
  let level = document.createElement("span");
  level.innerHTML = op.level;
  let stats = document.createElement("span");
  stats.innerHTML = "Focus: " + op.focus + ", Personability: " + op.personability;
  let hireButton = document.createElement("button");
  hireButton.innerHTML = "Hire";
  hireButton.setAttribute("onclick", "hireOp('" + op.name + "')");
  let declineButton = document.createElement("button");
  declineButton.innerHTML = "Decline";
  declineButton.setAttribute("onclick", "declineOp('" + op.name + "')");
  app.appendChild(name);
  app.appendChild(lineBreak());
  app.appendChild(stats);
  app.appendChild(lineBreak());
  app.appendChild(hireButton);
  app.appendChild(declineButton);
  return app
}

var renderSalesLead = function(client){
  let lead = document.createElement("div");
  app.setAttribute("id", "lead" + client.id);
  app.setAttribute("class", "salesLead");
  let name = document.createElement("b");
  name.innerHTML = client.name;
  let level = document.createElement("span");
  level.innerHTML = "Op Level: " + client.opLevel;
  let rate = document.createElement("span");
  rate.innerHTML = "Per minute rate: " + moneyDisplay(client.callRate);
  let acceptButton = document.createElement("button");
  acceptButton.innerHTML = "Accept Contract";
  acceptButton.setAttribute("onclick", "acceptContract('" + client.id + "')");
  let declineButton = document.createElement("button");
  declineButton.innerHTML = "Decline Contract";
  declineButton.setAttribute("onclick", "declineContract('" + client.id + "')");
  app.appendChild(name);
  app.appendChild(lineBreak());
  app.appendChild(rate);
  app.appendChild(lineBreak());
  app.appendChild(acceptButton);
  app.appendChild(declineButton);
  return lead
}

var renderCampaignButton = function(campaign){
    let listItem = document.createElement("li");
    listItem.setAttribute("id", campaign.code + "Ad");
    let button = document.createElement("button");
    button.setAttribute("class", "expenditure dol" + campaign.cost);
    button.setAttribute("onclick", "startCampaign('" + campaign.code + "')");
    button.innerHTML = campaign.name + moneyDisplay(campaign.cost);
    listItem.appendChild(button);
    return listItem
}

var renderClientCard = function(client){
  let clientCard = document.createElement("div");
  clientCard.setAttribute("id", "client" + client.id);
  clientCard.setAttribute("class", "clientCard");
  let name = document.createElement("b");
  name.innerHTML = client.name;
  let type = document.createElement("span");
  type.innerHTML = client.type;
  let level = document.createElement("span");
  level.innerHTML = "Level " + client.opLevel;
  let callsPerDay = document.createElement("span");
  callsPerDay.innerHTML = "Calls per day: ";
  let callsPerDayValue = document.createElement("span");
  callsPerDayValue.innerHTML = "0";
  callsPerDayValue.setAttribute("id", "callsPerDay" + client.id);
  callsPerDay.appendChild(callsPerDayValue);
  let rate = document.createElement("span");
  rate.innerHTML = "Per Minute Rate: ";
  let rateValue = document.createElement("span");
  rateValue.setAttribute("id", "rate" + client.id);
  rateValue.innerHTML = moneyDisplay(client.callRate);
  rate.appendChild(rateValue);
  let terminateButton = document.createElement("button");
  terminateButton.setAttribute("onclick", "terminateClient('" + client.id + "')");
  terminateButton.innerHTML = "Terminate Contract";
  let raiseRatesButton = document.createElement("button");
  raiseRatesButton.setAttribute("onclick", "raiseRates('" + client.id + "')");
  raiseRatesButton.innerHTML = "Raise Rates";
  clientCard.appendChild(name);
  clientCard.appendChild(lineBreak());
  clientCard.appendChild(type);
  clientCard.appendChild(lineBreak());
  clientCard.appendChild(level);
  clientCard.appendChild(lineBreak());
  clientCard.appendChild(callsPerDay);
  clientCard.appendChild(lineBreak());
  clientCard.appendChild(rate);
  clientCard.appendChild(lineBreak());
  clientCard.appendChild(terminateButton);
  clientCard.appendChild(raiseRatesButton);
  return clientCard
}
