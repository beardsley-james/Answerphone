// Call functions

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

var callStartup = function(){
  callQueue.live.forEach(function(call){
    document.getElementById("liveCalls").appendChild(callRender(call))
  })
  callQueue.holding.forEach(function(call){
    document.getElementById("holdingCalls").appendChild(callRender(call))
  })
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

var removeCall = function(call){
  // this should be replaced with "remove element" function and switched out wherever it shows up
  let callId = "call" + call.callNumber;
  let callTicket = document.getElementById(callId);
  callTicket.parentNode.removeChild(callTicket)
}

// operator functions

var opUpdater = function(op){
  // need to add other conditions in here so that you can tell what else the op is doing
  let status = document.getElementById("status" + op.name);
  let opCard = document.getElementById("queue" + op.name);
  if (op.call.length > 0) {
    if (op.call[0].timeToComplete > -1) {
      status.innerHTML = op.call[0].name + ", " + op.call[0].client;
      opCard.setAttribute("class", "op completingCall")
    } else {
      status.innerHTML = op.call[0].name + ", " + op.call[0].client;
      opCard.setAttribute("class", "op active")
    }
  } else {
    status.innerHTML = "Standby";
    opCard.setAttribute("class", "op inactive")
  }
  document.getElementById(op.name + "Satisfaction").innerHTML = op.satisfaction
}

var opStartup = function(){
  // this needs to be wrapped in a new file called save.js that loads whatever into the DOM
  let opPool = document.getElementById("opPool");
  let operators = document.getElementById("operators");
  ops.forEach(function(op){
    let queueCard = renderOpStatus(op);
    let opCard = renderOpCard(op);
    opPool.appendChild(queueCard);
    operators.appendChild(opCard)
  })
}

var renderOpStatus = function(op){
  let opCard = document.createElement("div");
  opCard.setAttribute("class", "op");
  opCard.setAttribute("id", "queue" + op.name);
  let name = document.createElement("b");
  name.setAttribute("id", "queue" + op.name + "name")
  name.innerHTML = op.level + " " + op.name;
  let status = document.createElement("span");
  status.setAttribute("id", "status" + op.name);
  opCard.appendChild(name);
  opCard.appendChild(lineBreak());
  opCard.appendChild(status);
  opPool.appendChild(opCard)
  return opCard
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

var renderOpCard = function(op){
  let opCard = document.createElement("div");
  opCard.setAttribute("id", "op" + op.name);
  opCard.setAttribute("class", "opCard");
  let name = document.createElement("b");
  name.innerHTML = op.name;
  let level = document.createElement("span");
  let levelValue = document.createElement("span");
  levelValue.innerHTML = op.level;
  levelValue.setAttribute("id", op.name + "level");
  level.innerHTML = "Level ";
  level.appendChild(levelValue);
  let wage = document.createElement("span");
  wage.innerHTML = "Hourly wage: ";
  let wageValue = document.createElement("span");
  wageValue.setAttribute("id", op.name + "wage");
  //wageValue.innerHTML = moneyDisplay(op.wage);
  wageValue.innerHTML = moneyDisplay(op.payRate);
  wage.appendChild(wageValue);
  let averageCallTime = document.createElement("span");
  averageCallTime.innerHTML = "Average call time: ";
  let averageCallTimeValue = document.createElement("span");
  averageCallTime.setAttribute("id", op.name + "calltime");
  averageCallTime.appendChild(averageCallTimeValue);
  let satisfaction = document.createElement("span");
  satisfaction.innerHTML = "Satisfaction: ";
  let satisfactionValue = document.createElement("span");
  satisfactionValue.innerHTML = op.satisfaction;
  satisfactionValue.setAttribute("id", op.name + "Satisfaction");
  satisfaction.appendChild(satisfactionValue);
  let focus = document.createElement("span");
  focus.innerHTML = "Focus: ";
  let focusValue = document.createElement("span");
  focusValue.setAttribute("id", op.name + "focus");
  focusValue.innerHTML = op.focus;
  focus.appendChild(focusValue)
  let personability = document.createElement("span");
  personability.innerHTML = " Personability: "
  let personabilityValue = document.createElement("span");
  personabilityValue.setAttribute("id", op.name + personability);
  personabilityValue.innerHTML = op.personability;
  personability.appendChild(personabilityValue);
  let fireButton = document.createElement("button");
  fireButton.setAttribute("onclick", "fireOp('" + op.name + "')");
  fireButton.innerHTML = "Fire";
  let promoteButton = document.createElement("button");
  promoteButton.setAttribute("onclick", "promoteOp('" + op.name + "')");
  promoteButton.innerHTML = "Promote";
  opCard.appendChild(name);
  opCard.appendChild(lineBreak())
  opCard.appendChild(level);
  opCard.appendChild(lineBreak())
  opCard.appendChild(wage);
  opCard.appendChild(lineBreak())
  opCard.appendChild(averageCallTime);
  opCard.appendChild(lineBreak());
  opCard.appendChild(satisfaction);
  opCard.appendChild(lineBreak());
  opCard.appendChild(focus);
  opCard.appendChild(personability);
  opCard.appendChild(lineBreak())
  opCard.appendChild(fireButton);
  opCard.appendChild(promoteButton);
  return opCard
}

// client functions

var clientStartup = function(){
  // candidate for save.js
  let clientList = document.getElementById("clients");
  clients.forEach(function(client){
    let clientCard = renderClientCard(client);
    clientList.appendChild(clientCard)
  })
}

var renderSalesLead = function(client){
  let lead = document.createElement("div");
  lead.setAttribute("id", "lead" + client.id);
  lead.setAttribute("class", "salesLead");
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
  lead.appendChild(name);
  lead.appendChild(lineBreak());
  lead.appendChild(rate);
  lead.appendChild(lineBreak());
  lead.appendChild(acceptButton);
  lead.appendChild(declineButton);
  return lead
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
  let satisfaction = document.createElement("span");
  satisfaction.innerHTML = "Satisfaction: ";
  let satisfactionValue = document.createElement("span");
  satisfactionValue.innerHTML = client.satisfaction;
  satisfactionValue.setAttribute("id", "satisfaction" + client.id);
  satisfaction.appendChild(satisfactionValue);
  let terminateButton = document.createElement("button");
  terminateButton.setAttribute("onclick", "terminateClient('" + client.id + "')");
  terminateButton.innerHTML = "Terminate Contract";
  let raiseRatesButton = document.createElement("button");
  raiseRatesButton.setAttribute("onclick", "raiseRates('" + client.id + "')");
  raiseRatesButton.innerHTML = "Raise Rates";
  if (purchasedUpgrades.indexOf("raiseRates")){
    raiseRatesButton.classList.add("upgrade")
  }
  raiseRatesButton.classList.add("raiseRates");
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
  clientCard.appendChild(satisfaction);
  clientCard.appendChild(lineBreak());
  clientCard.appendChild(terminateButton);
  clientCard.appendChild(raiseRatesButton);
  return clientCard
}

var clientUpdater = function(client){
  document.getElementById("satisfaction" + client.id).innerHTML = client.satisfaction
}

// advertisement functions

var updateAdvertisementCard = function(advertisement){
  // add additional information based on unlocked upgrades
  let advertisementCard = document.getElementById(advertisement.id);
  let advertisementCardDuration = document.getElementById("duration" + advertisement.id);
  if (advertisement.duration == 0){
    advertisementCard.parentNode.removeChild(advertisementCard)
  } else { advertisementCardDuration.innerHTML = advertisement.duration }
}

var renderCampaignCard = function(campaign){
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

var renderCampaignButton = function(campaign){
  let listItem = document.createElement("li");
  listItem.setAttribute("id", campaign.code + "Ad");
  let button = document.createElement("button");
  button.setAttribute("class", "expenditure dol" + campaign.cost);
  button.setAttribute("onclick", "startCampaign('" + campaign.code + "')");
  button.innerHTML = campaign.name + " " + moneyDisplay(campaign.cost);
  listItem.appendChild(button);
  return listItem
}

var adStartup = function(){
  for (var key in advertisingCampaigns) {
    if (advertisingCampaigns[key].enabled){
      document.getElementById("advertisingCampaignsMenu").appendChild(renderCampaignButton(advertisingCampaigns[key]))
    }
  }
  possibleOps.forEach(function(op){
    document.getElementById("availableOps").appendChild(renderEmploymentApp(op))
  })
  possibleClients.forEach(function(client){
    document.getElementById("availableClients").appendChild(renderSalesLead(client))
  })
  campaigns.forEach(function(campaign){
    document.getElementById("activeCampaigns").appendChild(renderCampaignCard(campaign));
    document.getElementById(campaign.code + "Ad").style.display = "none"
  })
}

// save/load functions

var renderSaveGames = function(saveGame){
  for (i = 1; i < 4; i++){
    if (localStorage.getItem("save" + i)){
      let saveCard = document.getElementById("saveFile" + i);
      let saveFile = JSON.parse(localStorage.getItem("save" + i));
      let saveButton = document.createElement("button");
      saveButton.setAttribute("id", "saveFile" + i);
      saveButton.setAttribute("onclick", "load('save" + i + "')");
      saveButton.innerHTML = "Load Game";
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("onclick", "deleteSaveFile('save" + i + "')");
      deleteButton.innerHTML = "Delete Save";
      saveCard.appendChild(saveButton);
      saveCard.appendChild(deleteButton);
      saveCard.appendChild(lineBreak());
      let date = document.createElement("span");
      saveTime = new Date(saveFile.time);
      date.innerHTML = saveTime.toLocaleTimeString() + " " + saveTime.toDateString();
      saveCard.appendChild(date)
    } else {
      let saveCard = document.getElementById("saveFile" + i);
      let newGameButton = document.createElement("button");
      newGameButton.setAttribute("id", "saveFile" + i);
      newGameButton.setAttribute("onclick", "newGame('save" + i + "')");
      newGameButton.innerHTML = "New Game";
      saveCard.appendChild(newGameButton)
    }
  }
}

// utility functions

var lineBreak = function(){
  let br = document.createElement("br");
  return br
}

var updateCurrentMinute = function(){
  // add military time option
  let minuteDisplay = document.getElementById("currentMinute");
  minuteDisplay.innerHTML = minToStandardTime(currentMinute)
}

var renderEndOfDay = function(report){
  if (daysElapsed > 0){
    let opReports = Array.from(document.getElementsByClassName("opReport"));
    let clientReports = Array.from(document.getElementsByClassName("clientReport"));
    opReports.forEach(function(report){
      report.parentNode.removeChild(report)
    })
    clientReports.forEach(function(report){
      report.parentNode.removeChild(report)
    })
  }
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
  document.getElementById("panelSelector").style.display = "none";
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

var endOfDayResetButton = function(){
  // move to core.js
  revealPanel("callQueue");
  document.getElementById("panelSelector").style.display = "inline";
  timer();
  document.getElementById("currentDay").innerHTML = daysOfTheWeek[day]
}

// upgrade functions

var upgradesStartup = function(){
  purchasedUpgrades.forEach(function(upgradeCode){
    let i = upgrades.findIndex(function(upgrade){return upgrade.code == upgradeCode});
    upgrades[i].enabled = true
  })
  upgrades.forEach(function(upgrade){
    if (!upgrade.enabled){
      document.getElementById("upgrades").appendChild(renderUpgradeCard(upgrade))
    } else if (upgrade.type == "advertisement"){
      advertisingCampaigns[upgrade.code].enabled = true
    }
  })
}

var renderUpgradeCard = function(upgrade){
  let card = document.createElement("div");
  card.setAttribute("class", "upgradeCard");
  card.setAttribute("id", upgrade.code + "Card");
  let name = document.createElement("b");
  name.innerHTML = upgrade.name;
  let description = document.createElement("span");
  description.innerHTML = upgrade.description;
  let cost = document.createElement("span");
  cost.innerHTML = moneyDisplay(upgrade.cost);
  let button = document.createElement("button");
  button.setAttribute("class", "expenditure dol" + upgrade.cost);
  button.setAttribute("onclick", "purchaseUpgrade('" + upgrade.code + "')");
  button.innerHTML = "Purchase Upgrade";
  card.appendChild(name);
  card.appendChild(lineBreak());
  card.appendChild(description);
  card.appendChild(lineBreak());
  card.appendChild(cost);
  card.appendChild(lineBreak());
  card.appendChild(button);
  return card
}
